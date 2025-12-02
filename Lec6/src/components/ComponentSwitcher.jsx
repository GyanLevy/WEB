import React, { useState } from 'react';
import OxygenTank from './OxygenTank.jsx';
import SurgicalArmControl from './SurgicalArmControl.jsx';
import GalaxyEmergencySystem from './GalaxyEmergencySystem.jsx';
import AlienSignalReceiver from './AlienSignalReceiver.jsx';
function ComponentSwitcher() {
    const [activeComponent, setActiveComponent] = useState('');
    const components_map = {
        'OxygenTank (useState)': <OxygenTank />,
        'SurgicalArmControl (useReducer)': <SurgicalArmControl />,
        'GalaxyEmergencySystem (useContext)': <GalaxyEmergencySystem />,
        'AlienSignalReceiver (useEffect)': <AlienSignalReceiver />,
    };
    const handleSwitchComponent = (componentName) => {
        setActiveComponent(componentName);
    };
    const componentToShow = components_map[activeComponent] ||
        <p className="text-black-500 italic">No component selected.</p>;
    const buttonStyles = "bg-blue-400 hover:bg-blue-600 text-black-500 font-bold py-2 px-4 rounded";
    return (
        <div className="flex flex-col items-center p-6 font-bold rounded-md shadow-md">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {Object.keys(components_map).map(key => (
                    <button key={key} className={buttonStyles} onClick={() => handleSwitchComponent(key)}>
                        {key}
                    </button>))}
            </div>
            <div className="border-white-500 bg-black-700 text-black-500 p-6 rounded-md w-4/5 max-w-xl text-center">{componentToShow} </div>
        </div>
    );
}
export default ComponentSwitcher;