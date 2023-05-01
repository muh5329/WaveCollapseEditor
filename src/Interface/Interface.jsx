import { useKeyboardControls } from "@react-three/drei"
import {  useRef } from "react"
export default function Interface(){

    const time = useRef();


    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    return < div className="interface">
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
                <div className={`key ${jump ? 'active': ''} large`}></div>
            </div>
        </div>
    </div>
}