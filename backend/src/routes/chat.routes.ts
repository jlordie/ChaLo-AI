import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Chat } from '../entities/Chat';

const router = Router();
const chatRepo = AppDataSource.getRepository(Chat);

// Create Chat
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, title, message, model } = req.body;
    const chat = chatRepo.create({ userId, title, message, model, response: '' });
    await chatRepo.save(chat);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

// Get User Chats
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chats = await chatRepo.find({ where: { userId } });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Get Chat by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const chat = await chatRepo.findOneBy({ id });
    if (!chat) return res.status(404).json({ error: 'Chat not found' });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
});

export default router;
