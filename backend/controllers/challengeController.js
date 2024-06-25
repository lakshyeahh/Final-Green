import Challenge from '../models/challenge.js';
import User from '../models/user.js';

// List all challenges
export const listChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenges', error });
    }
};

// Create a new challenge
export const createChallenge =  async (req, res) => {
  try {
    const {
      category,
      title,
      description,
      startDate,
      endDate,
      steps,
      points
    } = req.body;

    // Validate request data
    if (!category || !title || !description || !startDate || !endDate || !points) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create the challenge
    const newChallenge = new Challenge({
      category,
      title,
      description,
      startDate,
      endDate,
      participants,
      steps,
      points
    });

    // Save the challenge to the database
    const savedChallenge = await newChallenge.save();

    res.status(201).json(savedChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get details of a specific challenge
export const getChallengeDetails = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenge details', error });
    }
};

// Join a challenge
export const joinChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user._id;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already a participant in the challenge
    const isUserAlreadyParticipant = challenge.participants.some(participantId => participantId.toString() === userId.toString());

    // Check if the challenge is already in the user's list of active challenges
    const isChallengeAlreadyInUser = user.activeChallenges.some(ac => ac.challenge.toString() === challengeId.toString());

    if (!isUserAlreadyParticipant) {
      challenge.participants.push(userId);
      await challenge.save();
    }

    if (!isChallengeAlreadyInUser) {
      // Add challenge to user's activeChallenges with initial progress of 0%
      user.activeChallenges.push({ challenge: challengeId, progress: 0 });
      await user.save();
    }

    res.status(200).json({ message: 'Successfully joined the challenge' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining challenge', error });
  }
};

// Get progress of a user for a specific challenge
export const getChallengeProgress = async (req, res) => {
    try {
      const { challengeId } = req.params;

      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).send();
      }
      const userId = req.user._id;
      const progress = challenge.progress.filter(p => p.userId.toString() === userId);
  
      // If no progress is found, send an empty array
      if (progress.length === 0) {
        return res.send([]);
      }
  
      res.send(progress);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  
  export const updateChallenge = async (req, res) => {
    try {
      const userId = req.user._id;
      const { stepNumber } = req.body;
      const { challengeId } = req.params;
  
      const challenge = await Challenge.findById(challengeId);
      if (!challenge) {
        return res.status(404).send();
      }
  
      // Update the step progress
      const stepProgress = challenge.progress.find(p => p.userId.toString() === userId && p.stepNumber === stepNumber);
      if (stepProgress) {
        stepProgress.completed = true;
      } else {
        challenge.progress.push({ userId, stepNumber, completed: true });
      }
  
      // Calculate completed steps count
      const completedStepsCount = challenge.progress.reduce((count, step) => {
        if (step.userId.toString() === userId && step.completed) {
          return count + 1;
        }
        return count;
      }, 0);
  
      // Update user's activeChallenges with progress percentage
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
 
      const activeChallenge = user.activeChallenges.find(ac => ac.challenge.toString() === challengeId.toString());
      if (activeChallenge) {
        activeChallenge.progress = stepNumber;  // Update progress to the current stepNumber
      }
      // if (activeChallengeIndex !== -1) {
        
      //   const progressPercentage = (completedStepsCount / 4) * 100;
      //   activeChallenge[activeChallengeIndex].progress = progressPercentage; // Assuming 2 decimal places for percentage
      // }

  
      // Check if all steps are completed
      const stepsCompleted = completedStepsCount === challenge.steps.length;
  
      if (stepsCompleted) {
        // Update user's points
        user.points += challenge.points;
  
        // Move challenge from activeChallenges to completedChallenges
        user.activeChallenges = user.activeChallenges.filter(id => id.toString() !== challengeId.toString());
        if (!user.completedChallenges.includes(challengeId)) {
          user.completedChallenges.push(challengeId);
        }
      }
  
      await user.save();
      await challenge.save();
  
      res.status(200).json(challenge);
    } catch (error) {
      console.error('Error updating challenge:', error);
      res.status(500).json({ message: 'Error updating challenge', error });
    }
  };

export const getUserChallenges = async (req, res) => {
    try {
        const userId = req.user._id;

        // Ensure userId is a string if it is an ObjectId
        const userObjectId = mongoose.Types.ObjectId(userId);


        // Fetch challenges where the user is a participant
        const userChallenges = await Challenge.find({ participants: userObjectId });

        if (userChallenges.length === 0) {
            return res.status(404).json({ message: 'No challenges found for this user' });
        }

        res.status(200).json(userChallenges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user challenges', error });
    }
};