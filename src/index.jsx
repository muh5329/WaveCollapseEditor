import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
import { StrictMode } from 'react'
import Interface from './Interface/Interface'
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <StrictMode>
        <KeyboardControls
            map={[
                { name: "forward", keys: ["KeyW"] },
                { name: "backward", keys: ["KeyS"] },
                { name: "leftward", keys: ["KeyA"] },
                { name: "rightward", keys: ["KeyD"] },
                { name: "boost", keys: ["Space"] },
            ]}
        >
            <Canvas
                    flat
                    camera={ {
                        fov: 45,
                        near: 0.1,
                        far: 2000,
                        position: [ -3, 1.5, 4 ]
                    } }
                >
                <Experience />
            </Canvas>
            <Interface />
        </KeyboardControls>
        

    </StrictMode>
    
)