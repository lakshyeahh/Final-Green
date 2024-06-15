import Event from '../models/event.js';

// List upcoming events and workshops
export const listEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const { mode, title, description, date, location, participants, author } = req.body;
  try {
    const newEvent = new Event({ mode, title, description, date, location, participants, author });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error });
  }
};


// Get details of a specific event
export const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).populate('participants');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Register for an event
export const registerEvent = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.participants.includes(userId)) {
      return res.status(400).json({ message: 'User already registered for this event' });
    }
    event.participants.push(userId);
    await event.save();
    res.status(200).json({ message: 'User registered for the event', event });
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error });
  }
};
