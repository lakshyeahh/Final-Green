import WasteManagement from '../models/wasteManagement.js';

// Get recycling and waste disposal locations
export const getWasteManagementLocations = async (req, res) => {
    try {
        const locations = await WasteManagement.find({}, 'location description');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching waste management locations', error });
    }
};

// Get waste collection schedules
export const getWasteManagementSchedule = async (req, res) => {
    try {
        const schedules = await WasteManagement.find({}, 'location schedule');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching waste management schedules', error });
    }
};
