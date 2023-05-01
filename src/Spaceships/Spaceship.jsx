import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import { useRef, Suspense } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { InstancedRigidBodies, CylinderCollider ,BallCollider, CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export default function Spaceship(){
    const model = useRef()
    const modelBody = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls(); // see: https://github.com/pmndrs/drei#keyboardcontrols

   
    useFrame((state, delta) =>
    {
        if (modelBody.current){

            const time = state.clock.getElapsedTime()

            const { forward, backward, leftward, rightward } = getKeys();
           
            const impulse = { x: 0 , y :0 , z: 0}
            const torque = { x:0 , y :0 , z: 0}

            const impulseStrength =  10000 * delta
            const torqueStrength = 10000 * delta
            const dragForce = 1000;
            if (forward){
                impulse.z -=impulseStrength
                torque.x -= torqueStrength
            }
    
            if (rightward){
                impulse.x +=impulseStrength
                torque.z -= torqueStrength
            }
    
            if (backward){
                impulse.z +=impulseStrength
                torque.x += torqueStrength
            }
    
            if (leftward){
                impulse.x -=impulseStrength
                torque.z += torqueStrength
            }

            
            
            modelBody.current.applyImpulse(impulse)
            modelBody.current.applyTorqueImpulse(torque)
        }


    })

    return <Suspense fallback={null}>
        <RigidBody 
            colliders="ball"
            gravityScale={0} 
            ref={modelBody}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            restitution={0.2}
            position={[0, 20, 0]}
        >
            <Model ref={model} modelName="Spaceship" scale="1" />  
            
        </RigidBody>
           
    </Suspense>
}