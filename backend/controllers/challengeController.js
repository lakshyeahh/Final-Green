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
export const createChallenge = async (req, res) => {
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
    if (!category || !title || !description || !startDate || !endDate || !points || !steps) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Create the challenge
    const newChallenge = new Challenge({
      category,
      title,
      description,
      startDate,
      endDate,

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
export const verifyStep = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { stepNumber, userId } = req.body;

    // Find the challenge by ID
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Find the participant in the challenge
    const participant = challenge.participants.find(participant => participant.userId.toString() === userId.toString());
    if (!participant) {
      return res.status(404).send('User is not a participant in this challenge');
    }

    // Find the step within the participant's details
    const step = participant.details.find(step => step.stepNumber === stepNumber);
    if (!step) {
      return res.status(404).send(`Step ${stepNumber} not found for the user`);
    }

    // Verify the step
    step.verified = true;

    // Check if this is the last step in the challenge
    
    if (stepNumber === 3) {
      // If this is the last step, add points to the user and move challenge to completedChallenges
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            activeChallenges: { challenge: challengeId }
          },
          $addToSet: {
            completedChallenges: challengeId
          },
          $inc: { points: challenge.points }
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).send('User not found');
      }
    }

    // Save changes to challenge and participant
    await challenge.save();

    // Remove user from participants if this is the last step
    if (stepNumber === 3) {
      await Challenge.findByIdAndUpdate(
        challengeId,
        {
          $pull: {
            participants: { userId: userId }
          }
        }
      );
    }

    // Return the updated challenge
    res.status(200).json(challenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying step', error });
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
    const isUserAlreadyParticipant = challenge.participants.some(participant => participant.userId.toString() === userId.toString());

    // Check if the challenge is already in the user's list of active challenges
    const isChallengeAlreadyInUser = user.activeChallenges.some(ac => ac.challenge.toString() === challengeId.toString());

    let message = '';

    // Check conditions and set appropriate messages
    if (isUserAlreadyParticipant) {
      message = 'You are already a participant in this challenge.';
    }


    if (!isUserAlreadyParticipant) {
      try {
        // Assuming challenge is already defined and fetched from somewhere
        challenge.participants.push({ userId: userId });
        message: 'Successfully joined the challenge';
        await challenge.save();


      } catch (error) {
        // Handle error saving the challenge or any other error
        console.error('Error adding participant:', error);
        // Optionally, you can throw the error or handle it based on your application's needs
        throw error;
      }
    }

    if (!isChallengeAlreadyInUser) {
      // Add challenge to user's activeChallenges with initial progress of 0%
      user.activeChallenges.push({ challenge: challengeId, progress: 0 });
      await user.save();
    }

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ message: 'Error joining challenge', error });
  }
};


export const getActiveChallengesForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Validate userId - Assuming user ID is valid if you're here

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Extract the active challenges
    const activeChallengesPromises = user.activeChallenges.map(async (ac) => {
      // Find the challenge by ID
      const challenge = await Challenge.findById(ac.challenge)
        .select('category title description startDate endDate steps points participants');

      if (!challenge) {
        return null; // If challenge not found, return null
      }

      // Find participant details for the user within the challenge
      const participant = challenge.participants.find(participant => participant.userId.toString() === userId.toString());

      if (!participant) {
        return null; // If user is not a participant, return null
      }

      // Calculate verified step count
      const verifiedCount = participant.details.filter(detail => detail.verified).length;

      return {
        challenge: {
          id: challenge._id,
          category: challenge.category,
          title: challenge.title,
          description: challenge.description,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
          steps: challenge.steps,
          points: challenge.points,
        },
        progress: verifiedCount, // Include progress (step number) information
        verifiedCount: verifiedCount // Include verified step count
      };
    });

    // Resolve all promises and filter out null results
    const activeChallenges = (await Promise.all(activeChallengesPromises)).filter(ac => ac !== null);

    res.send(activeChallenges);
  } catch (error) {
    console.error('Error fetching active challenges:', error);
    res.status(500).send('Internal server error');
  }
};

export const getCompletedChallenges = async (req, res) => {
  try {
    const userId = req.user._id;

    // Validate userId - Assuming user ID is valid if you're here

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Extract the active challenges
    const completeChallengesPromises = user.completedChallenges.map(async (ac) => {
      // Find the challenge by ID
      const challenge = await Challenge.findById(ac)
        .select('category title description startDate endDate  points participants');

      if (!challenge) {
        return null; // If challenge not found, return null
      }

      // Find participant details for the user within the challenge
     

      return {
     
          id: challenge._id,
          category: challenge.category,
          title: challenge.title,
          description: challenge.description,
          startDate: challenge.startDate,
          endDate: challenge.endDate,
   
          points: challenge.points

      };
    });

    // Resolve all promises and filter out null results
    const activeChallenges = (await Promise.all(completeChallengesPromises)).filter(ac => ac !== null);

    res.send(activeChallenges);
  } catch (error) {
    console.error('Error fetching active challenges:', error);
    res.status(500).send('Internal server error');
  }
};



export const getChallengeDetailsForUser = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the challenge by ID
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).send('Challenge not found');
    }

    // Find participant details for the user within the challenge
    const participant = challenge.participants.find(participant => participant.userId.toString() === userId.toString());

    if (!participant) {
      return res.status(404).send('User is not a participant in this challenge');
    }

    const verifiedCount = participant.details.filter(detail => detail.verified).length;


    // Prepare the response object
    const challengeDetails = {
      _id: challenge._id,
      category: challenge.category,
      title: challenge.title,
      description: challenge.description,
      startDate: challenge.startDate,
      endDate: challenge.endDate,
      points: challenge.points,
      steps: challenge.steps,
      participantDetails: participant.details,
      verifiedCount
      // Include only participant details for the user
    };

    res.send(challengeDetails);
  } catch (error) {
    console.error('Error fetching challenge details:', error);
    res.status(500).send('Internal server error');
  }
};
export const submitChallengeInput = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { stepNumber, inputGiven } = req.body;

    // Validate incoming data
    if (!challengeId || !stepNumber || !inputGiven) {
      return res.status(400).send('Invalid input data');
    }

    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the challenge by ID
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).send('Challenge not found');
    }

    // Find or create participant details for the user within the challenge
    let participantDetails = challenge.participants.find(participant =>
      participant.userId.toString() === userId.toString()
    );

    if (!participantDetails) {
      // If participant details don't exist, create a new entry
      participantDetails = { userId: userId, details: [] };
      challenge.participants.push(participantDetails);
    }

    // Find or create details for the specified step number
    let stepDetails = participantDetails.details.find(detail =>
      detail.stepNumber === stepNumber
    );

    if (!stepDetails) {
      // If step details don't exist, create a new entry
      stepDetails = { stepNumber: stepNumber, inputGiven: inputGiven };
      participantDetails.details.push(stepDetails);
    } else {
      // Update existing step details
      stepDetails.inputGiven = inputGiven;
    }

    // Save the updated challenge document
    await challenge.save();

    res.send({
      message: 'Step submitted successfully',
      participantDetails: participantDetails
    });
  } catch (error) {
    console.error('Error submitting challenge input:', error);
    res.status(500).send('Internal server error');
  }
};



export const completeChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the user by ID and update activeChallenges and completedChallenges
    const user = await User.findByIdAndUpdate(userId,
      {
        $pull: {
          activeChallenges: { challenge: challengeId } // Remove challenge from activeChallenges
        },
        $addToSet: {
          completedChallenges: challengeId // Add challenge to completedChallenges (if not already there)
        },
        $inc: { points: 100 } // Example: Credit 100 points to user's total points
      },
      { new: true } // To return the updated document
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find the challenge by ID and remove user from participants
    const challenge = await Challenge.findByIdAndUpdate(challengeId,
      {
        $pull: {
          participants: { userId: userId } // Remove user from participants
        }
      }
    );

    if (!challenge) {
      return res.status(404).send('Challenge not found');
    }

    res.send('Challenge completed successfully');
  } catch (error) {
    console.error('Error completing challenge:', error);
    res.status(500).send('Internal server error');
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