import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Donut() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        const response = await fetch(`${process.env.REACT_APP_URL}/api/carbon-footprint/contribution`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (chartContainer.current) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
          const ctx = chartContainer.current.getContext('2d');
          chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Transportation', 'Energy Usage', 'Diet', 'Other Factors'],
              datasets: [{
                label: 'Carbon Footprint Breakdown',
                data: [
                  data.transportation,
                  data.energyUsage,
                  data.diet,
                  data.otherFactors
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 205, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 205, 86, 1)',
                  'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
               radius: '50%',
          
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem) {
                      return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                    }
                  }
                }
              }
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Clean up
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <canvas
      style={{
         // Adjust the height as needed
        margin: '120px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0px 1px 1px black'
      }}
      ref={chartContainer}
    />
  );
}

export default Donut;
