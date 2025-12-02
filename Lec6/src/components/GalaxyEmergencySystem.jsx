
import React, { createContext, useContext, useState } from 'react';
const AlertLevelContext = createContext('LOW');
function AlertLevelProvider({ children }) {
    const [alertLevel, setAlertLevel] = useState('LOW');
    const escalateAlert = () => setAlertLevel('HIGH');
    const deescalateAlert = () => setAlertLevel('LOW');
    const moderateAlert = () => setAlertLevel('MEDIUM');
    return (
        <AlertLevelContext.Provider value={{ alertLevel, escalateAlert, deescalateAlert, moderateAlert }}>
            {children}
        </AlertLevelContext.Provider>
    );
}
function Starship() {
    const { alertLevel } = useContext(AlertLevelContext);
    return (
        <div style={{ border: '1px solid green', padding: '15px', margin: '10px' }}>
            <h3>Starship Receiving Alert</h3>
            <p>Current Alert Level: <strong style={{ color: getAlertColor(alertLevel) }}>{alertLevel}</strong></p>
            {alertLevel === 'HIGH' &&
                (<div style={{ backgroundColor: 'darkorange', color: 'white', padding: '10px' }}>
                    *IMMEDIATE EVACUATION ORDER!*
                </div>)
            }
        </div>
    );
}
function getAlertColor(level) {
    switch (level) {
        case 'HIGH': return 'red';
        case 'MEDIUM': return 'orange';
        case 'LOW': return 'green';
        default: return 'black';
    }
}
function EmergencyControl() {
    const { escalateAlert, deescalateAlert, moderateAlert } = useContext(AlertLevelContext);
    return (
        <div>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={escalateAlert}>Escalate to HIGH Alert</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={deescalateAlert}>De-escalate to LOW Alert</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={moderateAlert}>Set to MEDIUM Alert</button>
        </div>
    );
}
function GalaxyEmergencySystem() {
    return (
        <div style={{ border: '1px solid blue', padding: '20px' }}>
            <AlertLevelProvider>
                <EmergencyControl />
                <Starship />
                <Starship />
                <Starship />
            </AlertLevelProvider>
        </div>
    );
}
export default GalaxyEmergencySystem;