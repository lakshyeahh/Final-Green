import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function Bar() {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');

                const response = await fetch(`${process.env.REACT_APP_URL}/api/carbon-footprint/compare`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartContainer.current && chartData) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Other Average', 'User Average'],
                    datasets: [{
                        label: 'Carbon Footprint Average',
                        data: [chartData.userAverage, chartData.othersAverage],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
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
                                label: function (tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2);
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [chartData]);

    return <canvas
    style={{
        // Adjust the height as needed
    
       padding: '20px',
       backgroundColor: 'white',
       borderRadius: '20px',
       boxShadow: '0px 1px 1px black'
     }} ref={chartContainer} />;
}

export default Bar;
