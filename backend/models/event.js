import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  mode: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  author:{ type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
