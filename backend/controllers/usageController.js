import Usage from '../models/usage.js';

// Get campus energy usage data
export const getEnergyUsage = async (req, res) => {
  try {
    const energyUsageData = await Usage.find({ type: 'energy' }).sort({ date: -1 });
    res.status(200).json(energyUsageData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching energy usage data', error });
  }
};

// Get campus water usage data
export const getWaterUsage = async (req, res) => {
  try {
    const waterUsageData = await Usage.find({ type: 'water' }).sort({ date: -1 });
    res.status(200).json(waterUsageData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching water usage data', error });
  }
};

// Create a new usage entry
export const createUsageEntry = async (req, res) => {
  const { type, amount } = req.body;
  try {
    const newUsageEntry = new Usage({ type, amount });
    await newUsageEntry.save();
    res.status(201).json(newUsageEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error creating usage entry', error });
  }
};
