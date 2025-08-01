import { Router } from 'express';
import User from '../models/User.js';
const router = Router();

router.post('/register', async (req, res) => {
  const { auth0Id, name, email, picture } = req.body;

  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id, name, email, picture });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
