// emissionsCalc

// Example emission factors (values are hypothetical and should be replaced with accurate data)
const EMISSION_FACTORS = {
    vehicle: {
      petrol: 2.31, // kg CO2 per mile
      diesel: 2.68,
      electric: 0.50,
      hybrid: 1.85
    },
    diet: {
      vegan: 2, // kg CO2 per day
      vegetarian: 3,
      pescatarian: 3.5,
      omnivore: 5
    },
    electricity: 0.92, // kg CO2 per kWh
    heating: {
      electric: 0.92,
      gas: 2.04,
      oil: 2.52,
      solar: 0
    },
    water: {
      low: 0.2, // kg CO2 per day
      medium: 0.5,
      high: 1
    }
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
    if (data.vehicleType && data.vehicleAverage && data.distanceHomeCollege) {
      const vehicleFactor = EMISSION_FACTORS.vehicle[data.vehicleType] || 0;
      emissions.transportation = vehicleFactor * data.vehicleAverage * data.distanceHomeCollege * 2 * 7 / (data.carpooling ? 2 : 1); // round trip for 7 days
    }
  
    // Diet emissions
    if (data.dietType) {
      const dietFactor = EMISSION_FACTORS.diet[data.dietType] || 0;
      emissions.diet = dietFactor * 365;
    }
  
    if (data.meatFrequency) {
      const meatFactor = (EMISSION_FACTORS.diet.omnivore - EMISSION_FACTORS.diet.vegan) * data.meatFrequency / 7;
      emissions.diet += meatFactor * 365;
    }
  
    // Electricity emissions
    if (data.electricityConsumption) {
      emissions.energyUsage = EMISSION_FACTORS.electricity * data.electricityConsumption * 12; // monthly consumption to yearly
    }
  
    // Heating emissions
    if (data.heatingCooling) {
      const heatingFactor = EMISSION_FACTORS.heating[data.heatingCooling] || 0;
      emissions.otherFactors += heatingFactor * 12; // assume a constant monthly rate
    }
  
    // Water usage emissions
    if (data.waterUsage) {
      const waterFactor = EMISSION_FACTORS.water[data.waterUsage] || 0;
      emissions.otherFactors += waterFactor * 365;
    }

  
    // Calculate total emissions
    emissions.total = emissions.diet + emissions.transportation + emissions.energyUsage + emissions.otherFactors;
  
    // Reduce emissions for sustainable practices
    if (data.recyclingPractices === 'always') {
      emissions.otherFactors *= 0.9;
    }
    if (data.reusableProducts === 'always') {
      emissions.otherFactors *= 0.95;
    }
    if (data.composting === 'always') {
      emissions.otherFactors *= 0.95;
    }
  
    // Additional sustainable practices
    if (data.sustainablePractices) {
      emissions.otherFactors *= 0.98;
    }

    const token = localStorage.getItem('accessToken');


        const sendCarbonData = async () => {
            if (token) {
                try {
                  const response = await fetch('/api/carbon-footprint', {
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
  
  
