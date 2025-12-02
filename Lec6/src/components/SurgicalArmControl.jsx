
import React, { useReducer } from 'react';
const ACTIONS = {
    MOVE: 'move',
    ROTATE: 'rotate',
    GRIP: 'grip',
};
const initialState = { x: 0, y: 0, z: 0, rotation: 0, gripStrength: 0 };
function roboticArmReducer(state, action) {
    switch (action.type) {
        case ACTIONS.MOVE:
            return { ...state, x: action.payload.x, y: action.payload.y, z: action.payload.z };
        case ACTIONS.ROTATE:
            // Add to the previous rotation
            return { ...state, rotation: (state.rotation + action.payload.angle) % 360 };
        case ACTIONS.GRIP:
            return { ...state, gripStrength: action.payload.strength };
        default:
            return state;
    }
}
function SurgicalArmControl() {
    const [state, dispatch] = useReducer(roboticArmReducer, initialState);
    const moveArm = (x, y, z) => {
        dispatch({ type: ACTIONS.MOVE, payload: { x, y, z } });
    };
    const rotateArm = (angle) => {
        dispatch({ type: ACTIONS.ROTATE, payload: { angle } });
    };
    const adjustGrip = (strength) => {
        dispatch({ type: ACTIONS.GRIP, payload: { strength } });
    };
    return (
        <div style={{ border: '1px solid blue', padding: '20px' }}>
            <h2>Surgical Robotic Arm Control</h2>
            <p>Current Position: X: {state.x}, Y: {state.y}, Z: {state.z}</p>
            <p>Rotation: {state.rotation} degrees</p>
            <p>Grip Strength: {state.gripStrength}%</p>

            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={() => moveArm(10, 5, 2)}>Move to Target Area</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={() => rotateArm(90)}>Rotate +90 Degrees</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={() => rotateArm(-30)}>Rotate -30 Degrees</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={() => adjustGrip(30)}>Apply Gentle Grip</button>
            <button className='bg-blue-400 py-2 px-4 rounded m-2' onClick={() => adjustGrip(80)}>Increase Grip Strength (Caution!)</button>
        </div>
    );
}
export default SurgicalArmControl;