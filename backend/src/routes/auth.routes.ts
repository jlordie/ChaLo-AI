import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User, UserRole } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.USER,
    });

    await userRepo.save(user);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({ user: { id: user.id, email, firstName, lastName }, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await userRepo.save(user);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.json({ user: { id: user.id, email, firstName: user.firstName, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify Token
router.post('/verify', (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

export default router;
