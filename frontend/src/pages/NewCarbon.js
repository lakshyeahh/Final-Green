import React, { useState } from 'react'
import NavigationMenuDemo from '../components/shared/navbar'
import Footer from '../components/shared/Footer'
import { Link } from 'react-router-dom';
import calculateEmissions from '../components/specific/emissionCalc'
import glass from '../Media/glass.png'
import { useEffect, useRef } from 'react';
import Sidebar from '../components/shared/Sidebar';
import DownBar from '../components/shared/DownBar';
import logo from '../Media/logo.png'

function NewCarbon() {
  const [vehicleType, setVehicleType] = useState('car');
  const [vehicleAverage, setVehicleAverage] = useState('');
  const [distanceHomeCollege, setDistanceHomeCollege] = useState('');
  const [fuelType, setFuelType] = useState('petrol');
  const [dietType, setDietType] = useState('vegan');
  const [meatFrequency, setMeatFrequency] = useState('');
  const [locallySourced, setLocallySourced] = useState('');
  const [foodWaste, setFoodWaste] = useState('');
  const [electricityConsumption, setElectricityConsumption] = useState('');
  const [heatingCooling, setHeatingCooling] = useState('electric');
  const [renewableEnergy, setRenewableEnergy] = useState('');
  const [waterUsage, setWaterUsage] = useState('low');
  const [recyclingPractices, setRecyclingPractices] = useState('');
  const [reusableProducts, setReusableProducts] = useState('');
  const [composting, setComposting] = useState('');
  const [sustainablePractices, setSustainablePractices] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeData = async () => {
      try {

        if (!token) {
          alert("Login First!");
          throw new Error('Access token not found');
        }

        const response = await fetch(`${process.env.REACT_APP_URL}/api/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data.user);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);



  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data
    const formData = {
      vehicleType,
      vehicleAverage,
      distanceHomeCollege,
      fuelType,

      dietType,
      meatFrequency,
      locallySourced,
      foodWaste,
      electricityConsumption,
      heatingCooling,
      renewableEnergy,
      waterUsage,
      recyclingPractices,
      reusableProducts,
      composting,
      sustainablePractices,
    };

    console.log(formData);

    const emissions = calculateEmissions(formData);
    setCarbonFootprint(emissions.total);
    const { diet, energyUsage, otherFactors, transportation } = formData;
    

    // Calculate the maximum value using Math.max()
    const maxValue = Math.max(diet, energyUsage, otherFactors, transportation);

    console.log('Maximum value:', maxValue);

  };
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col">
        <img src={logo} className="h-16 mb-4" alt="Logo" />
        <span className="loading loading-dots loading-lg text-green-300 bg-green-300"></span>
      </div>
    );
  }



  return (
  
    <div className="flex flex-col min-h-screen">
    <header>
      <NavigationMenuDemo userData={userData} />
    </header>
    <div className="flex flex-1">
      <aside className="hidden lg:block w-1/8">
        <Sidebar userData={userData} />
      </aside>
      <section className="w-full px-3 md:px-10 py-2 md:py-10">
      <section class="text-gray-600 body-font overflow-hidden">
        <div class=" py-5 md:py-0 mb-10">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Calculate Your CF</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">By Answering 4 Simple Data Points</p>
            <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6">
              <h3 class="py-1 px-4 bg-indigo-500 text-white focus:outline-none" id="currentDateBtn">{new Date().toLocaleDateString()}</h3>


            </div>
          </div>
          <div class="flex flex-wrap bg-lime-200 p-8 -m-4" >


            <div class="flex flex-wrap bg-lime-200 p-8 -m-4">

              {/* <!-- Transportation Section --> */}

              <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                  <h2 className="text-lg tracking-widest text-center title-font mb-1 font-medium">Transportation</h2>
                  <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none"></h1>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Vehicle Type
                  </p>
                  <select
                    id="vehicle-type"
                    name="vehicle-type"
                    className="p-2 mb-4 border rounded-lg bg-white w-full"
                    value={vehicleType}
                    onChange={e => setVehicleType(e.target.value)}
                  >
                    <option value="car">Car</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="bicycle">Bicycle</option>
                    <option value="public-transport">Public Transport</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Vehicle Average (mpg)
                  </p>
                  <input
                    type="number"
                    id="vehicle-average"
                    name="vehicle-average"
                    placeholder="Enter vehicle average in km/l"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={vehicleAverage}
                    onChange={(e) => setVehicleAverage(e.target.value)}
                  />

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Distance from Home to College (km)
                  </p>
                  <input
                    type="number"
                    id="distance-home-college"
                    name="distance-home-college"
                    placeholder="Enter distance in km"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={distanceHomeCollege}
                    onChange={(e) => setDistanceHomeCollege(e.target.value)}
                  />

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Fuel Type
                  </p>
                  <select
                    id="fuel-type"
                    name="fuel-type"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>

                  <p className="text-xs text-gray-500 mt-3">Enter your total miles traveled per year and other transport details.</p>
                </div>
              </div>

              {/* <!-- Diet Section --> */}
              <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                  <h2 className="text-lg tracking-widest text-center title-font mb-1 font-medium">Diet</h2>
                  <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none"></h1>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Type of Diet
                  </p>
                  <select
                    id="diet-type"
                    name="diet-type"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                  >
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="omnivore">Omnivore</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Frequency of Meat Consumption (days per week)
                  </p>
                  <input
                    type="number"
                    id="meat-frequency"
                    name="meat-frequency"
                    placeholder="Enter frequency in days per week"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={meatFrequency}
                    onChange={(e) => setMeatFrequency(e.target.value)}
                  />

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Locally Sourced Food
                  </p>
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio bg-white"
                        name="locally-sourced"
                        value="yes"
                        checked={locallySourced === 'yes'}
                        onChange={(e) => setLocallySourced(e.target.value)}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio bg-white"
                        name="locally-sourced"
                        value="no"
                        checked={locallySourced === 'no'}
                        onChange={(e) => setLocallySourced(e.target.value)}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Food Waste
                  </p>
                  <div className="mb-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio bg-white"
                        name="food-waste"
                        value="minimal"
                        checked={foodWaste === 'minimal'}
                        onChange={(e) => setFoodWaste(e.target.value)}
                      />
                      <span className="ml-2">Minimal</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio bg-white"
                        name="food-waste"
                        value="moderate"
                        checked={foodWaste === 'moderate'}
                        onChange={(e) => setFoodWaste(e.target.value)}
                      />
                      <span className="ml-2">Moderate</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                      <input
                        type="radio"
                        className="form-radio bg-white"
                        name="food-waste"
                        value="significant"
                        checked={foodWaste === 'significant'}
                        onChange={(e) => setFoodWaste(e.target.value)}
                      />
                      <span className="ml-2">Significant</span>
                    </label>
                  </div>

                  <p className="text-xs text-gray-500 mt-3">Specify your diet type and meat consumption frequency.</p>
                </div>
              </div>

              {/* <!-- Energy Usage Section --> */}

              <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                  <h2 className="text-lg tracking-widest text-center title-font mb-1 font-medium">Energy Usage</h2>
                  <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none"></h1>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Electricity Consumption
                  </p>
                  <input
                    type="number"
                    id="electricity-consumption"
                    name="electricity-consumption"
                    placeholder="Enter monthly kWh used"
                    className="p-2 bg-white mb-4 border rounded-lg w-full"
                    value={electricityConsumption}
                    onChange={(e) => setElectricityConsumption(e.target.value)}
                  />

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Heating and Cooling
                  </p>
                  <select
                    id="heating-cooling"
                    name="heating-cooling"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={heatingCooling}
                    onChange={(e) => setHeatingCooling(e.target.value)}
                  >
                    <option value="electric">Electric</option>
                    <option value="gas">Gas</option>
                    <option value="oil">Oil</option>
                    <option value="solar">Solar</option>
                    <option value="none">None</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Renewable Energy
                  </p>
                  <select
                    id="renewable-energy"
                    name="renewable-energy"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={renewableEnergy}
                    onChange={(e) => setRenewableEnergy(e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Water Usage
                  </p>
                  <select
                    id="water-usage"
                    name="water-usage"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={waterUsage}
                    onChange={(e) => setWaterUsage(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <p className="text-xs text-gray-500 mt-3">Enter your energy usage details.</p>
                </div>
              </div>
              {/* <!-- Other Factors Section --> */}

              <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
                <div className="h-full p-6 rounded-lg border-2 border-indigo-500 flex flex-col relative overflow-hidden">
                  <h2 className="text-lg tracking-widest text-center title-font mb-1 font-medium">Other Factors</h2>
                  <h1 className="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none"></h1>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Recycling Practices
                  </p>
                  <select
                    id="recycling-practices"
                    name="recycling-practices"
                    className="p-2 mb-4 bg-white border rounded-lg w-full"
                    value={recyclingPractices}
                    onChange={(e) => setRecyclingPractices(e.target.value)}
                  >
                    <option value="always">Always</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="never">Never</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Reusable Products
                  </p>
                  <select
                    id="reusable-products"
                    name="reusable-products"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={reusableProducts}
                    onChange={(e) => setReusableProducts(e.target.value)}
                  >
                    <option value="always">Always</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="never">Never</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Composting
                  </p>
                  <select
                    id="composting"
                    name="composting"
                    className="p-2 mb-4 border bg-white rounded-lg w-full"
                    value={composting}
                    onChange={(e) => setComposting(e.target.value)}
                  >
                    <option value="always">Always</option>
                    <option value="sometimes">Sometimes</option>
                    <option value="never">Never</option>
                  </select>

                  <p className="text-gray-600 mb-2">
                    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </span>Other Sustainable Practices
                  </p>
                  <textarea
                    id="sustainable-practices"
                    name="sustainable-practices"
                    placeholder="Describe your other sustainable practices"
                    className="p-2 border bg-white rounded-lg w-full"
                    rows="4"
                    value={sustainablePractices}
                    onChange={(e) => setSustainablePractices(e.target.value)}
                  />

                  <p className="text-xs text-gray-500 mt-3">Provide details about your recycling, composting, and other sustainable practices.</p>
                </div>
              </div>

            </div>
            <div class="p-4 w-full flex justify-center items-center">
              <div class="h-full w-1/2 flex flex-col relative overflow-hidden text-center rounded-2xl">
                <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={handleSubmit}>Submit</button>
              </div>

            </div>
            <p class="text-xs text-gray-500 mt-3 text-center">*Disclaimer: Please note that the calculations provided are estimates and may not be entirely accurate.</p>
          </div>

        </div>
      </section>




      <section class="text-gray-600 body-font ">

        {carbonFootprint !== null && (
          <div class=" py-24 mx-auto ">

            <div class="flex flex-col items-center justify-center text-center w-full mb-20">
              <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">YOUR CARBON FOOTPRINT IS</h2>
              <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900"> {carbonFootprint.toFixed(2)} <br /> Kg of CO₂</h1>

              <button class="w-1/3 text-black bg-green-200 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 hover:text-white rounded text-lg mt-4">  <Link to='/carbon-footprint'>Check Analytics</Link></button>


            </div>

            <div class="flex flex-wrap   items-center">
              <div className="w-full md:w-1/3" style={{ height: '250px' }}>
                <div className={`flex rounded-l-lg h-full p-8 flex-col ${carbonFootprint < 2000 ? 'bg-green-200' : carbonFootprint <= 5000 ? 'bg-yellow-300' : 'bg-red-300'}`}>
                  <div className="flex items-center mb-3">
                    <div className={`bg-${carbonFootprint < 2000 ? 'green' : carbonFootprint <= 5000 ? 'yellow' : 'red'}-600 text-white w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0`}>
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">{carbonFootprint < 2000 ? 'Low Carbon Footprint' : carbonFootprint <= 5000 ? 'Moderate Carbon Footprint' : 'High Carbon Footprint'}</h3>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm">
                      {carbonFootprint < 2000
                        ? 'Aww, Your carbon footprint is under control. Keep up the good work! Your current carbon footprint is well below the benchmark, indicating good environmental practices.'
                        : carbonFootprint <= 5000
                          ? 'Your carbon footprint is moderate. Consider adopting more sustainable practices to further reduce it. Your current carbon footprint is within acceptable limits, but reducing it can still have a positive impact.'
                          : 'Your carbon footprint is high. Consider reducing it by adopting sustainable practices. Your current carbon footprint exceeds the benchmark. Taking steps to reduce it can help mitigate climate impact.'}
                    </p>

                    {/* Conditional rendering based on carbon footprint comparison */}
              
                  </div>
                </div>
              </div>

              <div className="md:w-1/3  " style={{ height: '250px' }}>
                <div className="flex  h-full bg-pink-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-pink-500 text-white flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <h2 className="text-pink-700 text-xl title-font font-medium">Reduce Energy Consumption</h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-sm ">
                      The dominant factors contributing to your carbon footprint are Transport and Energy Consumption. These areas have the most significant impact on your overall carbon emissions. <strong></strong>.
                    </p>
                  
                      {/* Insert any additional content here based on carbon footprint level */}
          
                  </div>
                </div>
              </div>
              <div class="md:w-1/3" style={{ height: '250px' }}>
                <div class="flex rounded-r-lg h-full bg-blue-100 p-8 flex-col">
                  <div class="flex items-center mb-3">
                    <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                      <img className='h-3' src={glass} />

                    </div>
                    <h2 class="text-gray-900 text-lg title-font font-medium">Check Out Resources</h2>
                  </div>
                  <div class="flex-grow">
                    <p class="leading-relaxed text-lg">Discover resources to deepen your understanding of sustainability, </p>
                    <a class="mt-3 text-indigo-500 inline-flex items-center z-20" href='/resources'>Learn More
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      </section>
    </div>
    <div className="md:hidden fixed bottom-0 w-full">
      <DownBar />
    </div>
  </div>
  
  )
}

export default NewCarbon