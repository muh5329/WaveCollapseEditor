import { useKeyboardControls } from "@react-three/drei"
import {  useRef } from "react"
import useSpaceShip from '../Store/useSpaceShip';
export default function Interface(){

    const time = useRef();


    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const boost = useKeyboardControls((state) => state.boost)
    const cameraFollowShip = useSpaceShip((state) => state.cameraFollowShip)
    const toggleFollowShipCamera = useSpaceShip((state) => state.toggleFollowShipCamera)
    return < div className="interface">
        
         {/* Space Ship Controls */}
        <div className="spaceship">
            <div className="raw">
                <div className={`key ${cameraFollowShip ? 'active': ''} ` } onClick={toggleFollowShipCamera}>
                    <img  className="icon" src="./movie-camera.png" />
                </div>
            </div>   
        </div>
            
       
        {/* Controls */}
        
        <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? 'active': ''} `}></div>
            </div>
            <div className="raw">
                <div className={`key ${leftward ? 'active': ''}`}></div>
                <div className={`key ${backward ? 'active': ''}`}></div>
                <div className={`key ${rightward ? 'active': ''}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${boost ? 'active': ''} large`}></div>
            </div>
        </div>
    </div>
}