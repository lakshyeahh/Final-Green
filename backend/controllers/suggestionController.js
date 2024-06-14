import Suggestion from '../models/suggestion.js';

// List user suggestions
export const listSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().populate('userId', 'name');
    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching suggestions', error });
  }
};

// Submit a new suggestion
export const submitSuggestion = async (req, res) => {
  try {
    const suggestion = new Suggestion(req.body);
    await suggestion.save();
    res.status(201).json({ message: 'Suggestion submitted successfully', suggestion });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting suggestion', error });
  }
};
