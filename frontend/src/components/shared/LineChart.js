import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function Linechart() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        // Replace with your actual API endpoint
        const response = await fetch(`${process.env.REACT_APP_URL}/api/carbon-footprint/historical`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Assuming data is an array of objects with 'date' and 'total' properties
        const labels = data.map(entry => new Date(entry.date).toLocaleDateString());
        const values = data.map(entry => entry.total);

        setChartData({ labels, values });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error fetching data
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer.current && chartData.labels.length > 0) {
      const ctx = chartContainer.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: [{
            label: 'Carbon Footprint',
            data: chartData.values,
            borderColor: '#5B5BD6',
            backgroundColor: '#70B8FF',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [chartData]);

  return <canvas style={{  padding: '20px', backgroundColor: 'white', 
    borderRadius: '20px', boxShadow: '0px 1px 1px black'
   }} ref={chartContainer} />;
}

export default Linechart;
