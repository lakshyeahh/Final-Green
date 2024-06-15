import mongoose from 'mongoose';

const CarbonFootprintSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transportation: { type: Number, required: true },
    energyUsage: { type: Number, required: true },
    diet: { type: Number, required: true },
    otherFactors: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const CarbonFootprint = mongoose.model('CarbonFootprint', CarbonFootprintSchema);

export default CarbonFootprint;
