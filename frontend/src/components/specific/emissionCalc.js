// emissionsCalc

// Example emission factors (values are hypothetical and should be replaced with accurate data)
const EMISSION_FACTORS = {
    vehicle: {
      petrol: 2.3,
      diesel: 2.8,
      electric: 0.5,
      hybrid: 1.5
    },
    diet: {
      vegan: 2.5, // kg CO2 per day
      vegetarian: 3.5, // kg CO2 per day
      pescatarian: 4.0, // kg CO2 per day
      omnivore: 5.5 // kg CO2 per day
    },
    meatFrequency: {
      never: 0,
      rarely: 0.5, // kg CO2 per day
      sometimes: 1.0, // kg CO2 per day
      often: 2.0 // kg CO2 per day
    },
    locallySourced: {
      yes: 0.8, // 20% reduction in emissions
      no: 1.0 // no reduction
    },
    foodWaste: {
      low: 0.9, // 10% reduction in emissions
      medium: 1.0, // no reduction
      high: 1.2 // 20% increase in emissions
    },
    electricity: 0.233, // kg CO2 per kWh
    heatingCooling: {
      none: 0,
      low: 500, // kg CO2 per year
      medium: 1000, // kg CO2 per year
      high: 2000 // kg CO2 per year
    },
    renewableEnergy: {
      yes: 0.5, // 50% reduction in emissions
      no: 1.0 // no reduction
    },
    waterUsage: {
      low: 0.5, // kg CO2 per day
      medium: 1.0, // kg CO2 per day
      high: 2.0 // kg CO2 per day
    },
    recyclingPractices: {
      always: 0.5, // kg CO2 reduction per month
      sometimes: 0.3, // kg CO2 reduction per month
      never: 0.1 // kg CO2 reduction per month
    },
    reusableProducts: {
      always: 0.25, // kg CO2 reduction per month
      sometimes: 0.15, // kg CO2 reduction per month
      never: 0.05 // kg CO2 reduction per month
    },
    composting: {
      always: 0.4, // kg CO2 reduction per month
      sometimes: 0.25, // kg CO2 reduction per month
      never: 0.1 // kg CO2 reduction per month
    }
// kg CO2 reduction per month
    
  };
  
  const calculateEmissions =  (data) => {
    let emissions = {
        transportation: 0,
        diet: 0,
        energyUsage: 0,
        otherFactors: 0,
        total: 0 // Ensure total is calculated and returned as well
      };
    
  
    // Transportation emissions
    if (data.vehicleType && data.vehicleAverage && data.distanceHomeCollege && data.fuelType) {
      // Calculate emission factor based on fuel type
      console.log(data.fuelType);
      const fuelFactor = EMISSION_FACTORS.vehicle[data.fuelType] || 0;
  
      // Calculate total distance for a week (round trip distance * 7 days)
      const totalDistance = data.distanceHomeCollege * 2 * 7;
  
      // Calculate emissions based on fuel consumption
     
        emissions.transportation = fuelFactor * data.vehicleAverage * totalDistance;
      
    }
  
    // Diet emissions
    if (data.dietType && data.meatFrequency && data.locallySourced && data.foodWaste) {
      // Calculate base emission factor based on diet type
      const dietFactor = EMISSION_FACTORS.diet[data.dietType] || 0;
  
      // Calculate additional emission factor based on meat consumption frequency
      const meatFactor = EMISSION_FACTORS.meatFrequency[data.meatFrequency] || 0;
  
      // Calculate adjustment factor for locally sourced food
      const localFactor = EMISSION_FACTORS.locallySourced[data.locallySourced] || 1;
  
      // Calculate adjustment factor for food waste
      const wasteFactor = EMISSION_FACTORS.foodWaste[data.foodWaste] || 1;
  
      // Calculate annual diet emissions
      emissions.diet = (dietFactor + meatFactor) * 365 * localFactor * wasteFactor;
    }
  
    
    // Electricity emissions
    if (data.electricityConsumption && data.heatingCooling && data.renewableEnergy && data.waterUsage) {
      // Calculate base emission factor for electricity consumption
      const electricityFactor = EMISSION_FACTORS.electricity * data.electricityConsumption * 12; // monthly consumption to yearly
  
      // Calculate heating and cooling emissions
      const heatingCoolingFactor = EMISSION_FACTORS.heatingCooling[data.heatingCooling] || 0;
  
      // Calculate adjustment factor for renewable energy usage
      const renewableFactor = EMISSION_FACTORS.renewableEnergy[data.renewableEnergy] || 1;
  
      // Calculate water usage emissions
      const waterFactor = EMISSION_FACTORS.waterUsage[data.waterUsage] * 365; // daily to yearly
  
      // Calculate total energy usage emissions
      emissions.energyUsage = (electricityFactor + heatingCoolingFactor + waterFactor) * renewableFactor;
    }
  
    // Heating emissions
    if (data.recyclingPractices && data.reusableProducts && data.composting) {
      // Calculate emission reduction factors
      const recyclingFactor = EMISSION_FACTORS.recyclingPractices[data.recyclingPractices] || 0;
      const reusableProductsFactor = EMISSION_FACTORS.reusableProducts[data.reusableProducts] || 0;
      const compostingFactor = EMISSION_FACTORS.composting[data.composting] || 0;
      
  
      // Calculate total monthly reduction
      const totalMonthlyReduction = recyclingFactor * reusableProductsFactor * compostingFactor;
  
      // Calculate annual emissions reduction
      emissions.otherFactors = totalMonthlyReduction * 12;
    }
  

  
    // Calculate total emissions
    emissions.total = emissions.diet + emissions.transportation + emissions.energyUsage + emissions.otherFactors;
    
    console.log(emissions);
  

    const token = localStorage.getItem('accessToken');


        const sendCarbonData = async () => {
            if (token) {
                try {
                  const response = await fetch(`${process.env.REACT_APP_URL}/api/carbon-footprint`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                      transportation: emissions.transportation,
                      diet: emissions.diet,
                      energyUsage: emissions.energyUsage,
                      otherFactors: emissions.otherFactors,
                      total: emissions.total
                    })
                  });
            
                  if (!response.ok) {
                    throw new Error('Failed to create carbon footprint');
                  }
            
                  // Optionally handle success response
                  const result = await response.json();
                  console.log('Carbon footprint created successfully:', result);
            
                } catch (error) {
                  console.error('Error creating carbon footprint:', error);
                  // Optionally handle error
                }
              } else {
                console.error('No auth token found');
                // Optionally handle case where no auth token is found
              }

            };
  
            sendCarbonData();
  
      

  
    return emissions;
  };
  
  export default calculateEmissions;
  
  
