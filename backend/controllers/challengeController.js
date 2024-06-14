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
        const { category, title, description, startDate, endDate, points } = req.body;
        const newChallenge = new Challenge({ category, title, description, startDate, endDate, points });
        await newChallenge.save();
        res.status(201).json(newChallenge);
    } catch (error) {
        res.status(500).json({ message: 'Error creating challenge', error });
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

        let challengeUpdated = false;
        let userUpdated = false;

        // Add user to challenge participants if not already present
        if (!challenge.participants.includes(userId)) {
            challenge.participants.push(userId);
            challengeUpdated = true;
        }

        // Add challenge to user's challenges if not already present
        if (!user.challenges.includes(challengeId)) {
            user.challenges.push(challengeId);
            userUpdated = true;
        }

        if (challengeUpdated) {
            await challenge.save();
        }

        if (userUpdated) {
            await user.save();
        }

        res.status(200).json({ message: 'Successfully joined the challenge' });
    } catch (error) {
        res.status(500).json({ message: 'Error joining challenge', error });
    }
};

// Get progress on a challenge
export const getChallengeProgress = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const userId = req.user._id;

        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        const userProgress = challenge.participants.find(participant => participant.userId.equals(userId));
        if (!userProgress) {
            return res.status(404).json({ message: 'User has not joined this challenge' });
        }

        res.status(200).json(userProgress);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenge progress', error });
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