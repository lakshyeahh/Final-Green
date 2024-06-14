import mongoose from 'mongoose';

const wasteManagementSchema = new mongoose.Schema({
  location: { type: String, required: true },
  description: { type: String },
  schedule: [{ day: { type: String }, time: { type: String } }],
});

const WasteManagement = mongoose.model('WasteManagement', wasteManagementSchema);
export default WasteManagement;
