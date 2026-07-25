import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// Get Current User
router.get('/me', async (req: Request, res: Response) => {
  try {
    const userId = req.headers['x-user-id'] as string;
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get All Users (Admin Only)
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await userRepo.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update User Profile
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepo.findOneBy({ id });
    if (!user) return res.status(404).json({ error: 'User not found' });

    Object.assign(user, req.body);
    await userRepo.save(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
