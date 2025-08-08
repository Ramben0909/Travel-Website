import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const { auth0Id, name, email, picture, wishlist } = req.body;

  try {
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id, name, email, picture, wishlist });
      await user.save();
    }
    res.status(201).json(user);
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};
