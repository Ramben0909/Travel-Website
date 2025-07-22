import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  auth0Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default model('User', userSchema);
