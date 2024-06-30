import Resource from '../models/resource.js';

// List educational resources
export const listResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
};

// Add a new resource
export const addResource = async (req, res) => {
  const { title, description, url, type, category, authorName, authorPosition } = req.body;
  try {
    const newResource = new Resource({ title, description, url, type, category, authorName, authorPosition });
    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: 'Error adding resource', error });
  }
};

// Get details of a specific resource
export const getResource = async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resource', error });
  }
};
