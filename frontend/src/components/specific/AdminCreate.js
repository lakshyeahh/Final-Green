import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const CreateChallengeForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    points: '',
    steps: [{ stepNumber: 1, description: '', inputType: 'text' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const steps = [...formData.steps];
    steps[index] = { ...steps[index], [name]: value };
    setFormData({ ...formData, steps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { stepNumber: formData.steps.length + 1, description: '', inputType: 'text' }]
    });
  };

  const removeStep = (index) => {
    const steps = formData.steps.filter((_, i) => i !== index).map((step, i) => ({
      ...step,
      stepNumber: i + 1
    }));
    setFormData({ ...formData, steps });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/challenges`,{ 
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch challenges data');
        }

      
       toast.success("challenge created successfully")
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full px-5 md:pd-20 mx-auto">
        <ToastContainer/>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="category"
        id="category"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={formData.category}
        onChange={handleChange}
        required
      />
      <label htmlFor="category" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name="title"
        id="title"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label htmlFor="title" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <textarea
        name="description"
        id="description"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={formData.description}
        onChange={handleChange}
        required
      />
      <label htmlFor="description" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="date"
        name="startDate"
        id="startDate"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={formData.startDate}
        onChange={handleChange}
        required
      />
      <label htmlFor="startDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="date"
        name="endDate"
        id="endDate"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={formData.endDate}
        onChange={handleChange}
        required
      />
      <label htmlFor="endDate" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
    </div>
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="number"
        name="points"
        id="points"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        value={formData.points}
        onChange={handleChange}
        required
      />
      <label htmlFor="points" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">Points</label>
    </div>
    {formData.steps.map((step, index) => (
      <div key={index} className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="description"
          id={`description-${index}`}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={step.description}
          onChange={(e) => handleStepChange(index, e)}
          required
        />
        <label htmlFor={`description-${index}`} className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">Step {step.stepNumber} Description</label>
        <select
          name="inputType"
          value={step.inputType}
          onChange={(e) => handleStepChange(index, e)}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          required
        >
          <option value="text">Text</option>
          <option value="file">File</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          
        </select>
        <button
            type="button"
            onClick={() => removeStep(index)}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
          >
            Remove Step
          </button>
      </div>
    ))}
    <button type="button" onClick={addStep} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Step</button>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Create Challenge</button>
  </form>
  );
};

export default CreateChallengeForm;
