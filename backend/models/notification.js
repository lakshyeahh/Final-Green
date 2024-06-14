import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
  type: { 
    type: String, 
    enum: ['pass', 'warning', 'reject'], 
    required: true 
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
