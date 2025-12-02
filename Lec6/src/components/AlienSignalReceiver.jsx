import React, { useState, useEffect } from 'react';
function AlienSignalReceiver() {
   const [signalData, setSignalData] = useState('');
   const MAX_DATA_LENGTH = 100;
   useEffect(() => {
      console.log("Establishing connection to alien signal...");
      let intervalId; // Variable to hold the interval ID
      if (signalData.length < MAX_DATA_LENGTH) { // Simulate receiving data from an alien signal every 2 seconds
         intervalId = setInterval(() => {
            const newData = Math.random().toString(36).substring(7);
            setSignalData(prevData => {
               const updatedData = prevData + newData + ' ';
               if (updatedData.length >= MAX_DATA_LENGTH) {
                  console.warn("Maximum signal data length reached. Disconnecting...");
                  clearInterval(intervalId);
               }
               return updatedData;
            });
            console.log("Receiving alien transmission:", newData);
         }, 2000);
      } else { console.log("Signal data already at maximum length."); }
      return () => {
         if (intervalId) {
            console.log("Disconnecting from alien signal...");
            clearInterval(intervalId);
         }
      };
   }, [signalData, MAX_DATA_LENGTH]);
   return (
      <div style={{ border: '1px solid blue', padding: '20px' }}>
         <h2>Alien Signal Receiver</h2>
         <p>Incoming Data: {signalData}</p>
         {signalData.length >= MAX_DATA_LENGTH &&
            (<p style={{ color: 'orange' }}>Signal reception halted at maximum length.</p>)}
      </div>
   );
}
export default AlienSignalReceiver