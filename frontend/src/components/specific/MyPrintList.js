import React, { useEffect, useState } from 'react';
import { DataList } from '@radix-ui/themes'; // Assuming this is the correct import for DataList component
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './footprint.css'

function MyPrintList({ authToken }) {
  const [carbonFootprints, setCarbonFootprints] = useState([]);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchCarbonPrint = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/api/carbon-footprint/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('');
        }

        const data = await response.json();
        setCarbonFootprints(data);

      } catch (error) {
        setError(error.message);
      }
    };

    fetchCarbonPrint();
  }, [authToken]);

  // Show only the two most recent entries if there are more than two
  const recentCarbonFootprints = carbonFootprints.length > 2 ? carbonFootprints.slice(0, 2) : carbonFootprints;

  // Prepare data for the graph
  const graphData = carbonFootprints.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    total: entry.total
  }));

  return (
    <div className="container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DataList.Root className="data-list-root" orientation={{ initial: 'vertical', sm: 'horizontal' }}>
        {/* Column Headers */}
        <DataList.Item style={{ textAlign: 'center', justifyContent: 'center', position: 'relative' }}className="data-list-header">
          <DataList.Label minWidth="88px"><strong>Date</strong></DataList.Label>
          <DataList.Value><strong>Carbon FP</strong></DataList.Value>
        </DataList.Item>
        
        {/* Data Entries */}
        {recentCarbonFootprints.length > 0 ? (
          recentCarbonFootprints.map((entry, index) => (
            <DataList.Item key={index} className="data-list-item">
              <DataList.Label minWidth="88px">{new Date(entry.date).toLocaleDateString()}</DataList.Label>
              <DataList.Value>{entry.total}</DataList.Value>
            </DataList.Item>
          ))
        ) : (
          <p>No carbon footprint data available</p>
        )}
      </DataList.Root>

      {/* Graph */}
      {carbonFootprints.length > 0 && (
        <ResponsiveContainer className="responsive-container" width="80%" height={350
        } style={{backgroundColor: 'white'}} >
          <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MyPrintList;
