import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../entities/User';

const router = Router();
const userRepo = AppDataSource.getRepository(User);

// Get Dashboard Stats
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const totalUsers = await userRepo.count();
    const activeUsers = await userRepo.countBy({ isActive: true });
    res.json({ totalUsers, activeUsers, timestamp: new Date() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Suspend User
router.patch('/users/:id/suspend', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepo.findOneBy({ id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isActive = false;
    await userRepo.save(user);
    res.json({ message: 'User suspended', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to suspend user' });
  }
});

// Reactivate User
router.patch('/users/:id/reactivate', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userRepo.findOneBy({ id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.isActive = true;
    await userRepo.save(user);
    res.json({ message: 'User reactivated', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reactivate user' });
  }
});

export default router;
