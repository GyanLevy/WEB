import React, { useState } from 'react';
function OxygenTank() {
    const [oxygenLevel, setOxygenLevel] = useState(100);
    const decreaseOxygen = () => {
        setOxygenLevel(prevLevel => Math.max(0, prevLevel - 10));
    };
    const increaseOxygen = () => {
        setOxygenLevel(prevLevel => Math.min(100, prevLevel + 15));
    };
    return (
        <div style={{ border: '1px solid blue', padding: '20px' }}>
            <h2>Oxygen Tank Status</h2>
            <p>Current Oxygen Level: {oxygenLevel}%</p>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={decreaseOxygen}>Emergency Vent (Simulate Leak)</button>
            <button className='bg-blue-400 py-2 px-4 rounded' onClick={increaseOxygen}>Initiate Refill</button>
            {oxygenLevel <= 10 && (
                <div style={{ backgroundColor: 'darkred', color: 'white', padding: '10px' }}>
                    *IMMINENT DANGER! OXYGEN CRITICAL!*
                </div>
            )}
        </div>
    );
}
export default OxygenTank;