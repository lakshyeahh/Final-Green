import CarbonFootprint from '../models/carbonFootprint.js';
import User from '../models/user.js';

// Calculate and store user's carbon footprint
export const calculateCarbonFootprint = async (req, res) => {
    try {
        const userId = req.user._id;
        const {  
            transportation,
            energyUsage,
            diet,
            otherFactors,
            total} = req.body;

        // Calculate carbon footprint (dummy calculation for example)
        

        const carbonFootprint = new CarbonFootprint({
            user: userId,
        
            transportation,
            energyUsage,
            diet,
            otherFactors,
            total,
            date: new Date()
        });

        await carbonFootprint.save();

        res.status(201).json({ message: 'Carbon footprint calculated and saved', carbonFootprint });
    } catch (error) {
        res.status(500).json({ message: 'Error calculating carbon footprint', error });
    }
};
// Controller function to fetch most recent carbon footprint data
export const getRecentCarbonFootprint = async (req, res) => {
    const userId = req.user._id; // Assuming userId is passed in the request parameters
  
    try {
      // Fetch most recent carbon footprint entry for the user
      const recentCarbonFootprint = await CarbonFootprint.findOne({ user: userId })
                                                               .sort({ date: -1 })
                                                               .exec();
  
      if (!recentCarbonFootprint) {
        return res.status(404).json({ error: 'Carbon footprint data not found' });
      }
  
      res.json(recentCarbonFootprint);
      console.log(recentCarbonFootprint);
    } catch (err) {
      console.error('Error fetching recent carbon footprint:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Controller function to fetch historical carbon footprint data
export const getHistoricalCarbonFootprints = async (req, res) => {
    const userId = req.user._id; // Assuming userId is passed in the request parameters
  
    try {
      // Fetch all carbon footprint entries for the user, sorted by date ascending
      const historicalCarbonFootprints = await CarbonFootprint.find({ user: userId })
                                                                  .sort({ date: 1 })
                                                                  .exec();
  
      if (!historicalCarbonFootprints.length) {
        return res.status(404).json({ error: 'No historical carbon footprint data found' });
      }
  
      res.json(historicalCarbonFootprints);
    } catch (err) {
      console.error('Error fetching historical carbon footprints:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Controller function to calculate contribution of each emission category
  export const getContributionData = async (req, res) => {
    const userId = req.user._id; // Assuming userId is passed in the request parameters
  
    try {
      // Fetch most recent carbon footprint entry for the user
      const recentCarbonFootprint = await CarbonFootprint.findOne({ user: userId })
                                                               .sort({ date: -1 })
                                                               .exec();
  
      if (!recentCarbonFootprint) {
        return res.status(404).json({ error: 'Carbon footprint data not found' });
      }
  
      const { transportation, energyUsage, diet, otherFactors } = recentCarbonFootprint;
      const total = transportation + energyUsage + diet + otherFactors;
  
      const contributionData = {
        transportation: (transportation / total) * 100,
        energyUsage: (energyUsage / total) * 100,
        diet: (diet / total) * 100,
        otherFactors: (otherFactors / total) * 100
      };
  
      res.json(contributionData);
    } catch (err) {
      console.error('Error calculating contribution data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Controller function to compare user's average carbon footprint with others
  export const compareWithOthers = async (req, res) => {
    const userId = req.user._id; // Assuming userId is passed in the request parameters
  
    try {
      // Fetch all carbon footprint entries for the user
      const userCarbonFootprints = await CarbonFootprint.find({ user: userId });
  
      // Calculate total and average carbon footprint for the current user
      const totalUserCF = userCarbonFootprints.reduce((sum, entry) => sum + entry.total, 0);
      const avgUserCF = totalUserCF / userCarbonFootprints.length;
  
      // Fetch averages of all other users
      const allUsersCarbonFootprints = await CarbonFootprint.find({ user: { $ne: userId } });
      const avgOtherUsersCF = calculateAverage(allUsersCarbonFootprints.map(entry => entry.total));
  
      // Return only the averages
      const comparisonData = {
        userAverage: avgUserCF,
        othersAverage: avgOtherUsersCF
      };
  
      res.json(comparisonData);
    } catch (err) {
      console.error('Error comparing with others:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Function to calculate average of an array of numbers
  const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  };
  
  
  
  
// Get user's carbon footprint history
export const getCarbonFootprintHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        const carbonFootprintHistory = await CarbonFootprint.find({ user: userId }).sort({ date: -1 });

        res.status(200).json(carbonFootprintHistory);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carbon footprint history', error });
    }
};
