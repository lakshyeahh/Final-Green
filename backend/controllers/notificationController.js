import Notification from '../models/notification.js';

// List notifications
export const listNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Create a new notification
export const createNotification = async (req, res) => {
  const { userId, message, type } = req.body;
  try {
    const newNotification = new Notification({ message, type, read: false });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
};
