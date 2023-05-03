import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import { useEffect, useState, useRef, Suspense } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useRapier, RigidBody } from '@react-three/rapier'
import useSpaceShip from '../Store/useSpaceShip';
import * as THREE from 'three'

export default function Spaceship(){
    
    const model = useRef()
    const modelBody = useRef();
    const { rapier, world } = useRapier();
    const rapierWorld = world.raw();
    const cameraFollowShip = useSpaceShip((state) => state.cameraFollowShip)

    const [subscribeKeys, getKeys] = useKeyboardControls(); 

   
    // Camera constants
    const [smoothCameraPosition] = useState(()=> new THREE.Vector3( 10 ,10 , 10))
    const [smoothCameraTarget] = useState(()=> new THREE.Vector3())


    useFrame((state, delta) =>
    {
        if (modelBody.current){



            const time = state.clock.getElapsedTime()

            const { forward, backward, leftward, rightward, boost } = getKeys();
        

            /**
             * Ship movement
             */
            let impulse =  { x:0 , y :0 , z: 0} 
            const torque = { x:0 , y :0 , z: 0}

            const impulseStrength =  1 * delta
            const torqueStrength = 1 * delta

            const rotation = new THREE.Euler()
            rotation.setFromQuaternion( modelBody.current.rotation())
            const  impulseVector = new THREE.Vector3(0, 0, 1).applyEuler(rotation)
        
        
            if (forward){
                torque.x -= torqueStrength
            }
    
            if (rightward){
                torque.y -= torqueStrength
            }
    
            if (backward){
                torque.x += torqueStrength
            }
    
            if (leftward){
                torque.y += torqueStrength
            }
            
            if (boost){
                impulse = impulseVector
            }

            
            
            modelBody.current.applyImpulse(impulse)
            modelBody.current.applyTorqueImpulse(torque)


            /**
             * Camera Movement
             */
            const bodyPosition = modelBody.current.translation()
        
            const cameraPosition = new THREE.Vector3();
            cameraPosition.copy(bodyPosition);
            cameraPosition.z += 40
            cameraPosition.y += -0.65
    
            const cameraTarget =  new THREE.Vector3()
            cameraTarget.copy(bodyPosition);
            cameraTarget.y += 0.25
    
            smoothCameraPosition.lerp(cameraPosition , 5 * delta);
            smoothCameraTarget.lerp(cameraTarget ,5 * delta);
            
            if (cameraFollowShip){
                state.camera.position.copy(smoothCameraPosition);
                state.camera.lookAt(smoothCameraTarget);    
            }
            

        
        }


    })

    return <Suspense fallback={null}>
        <RigidBody 
            colliders="hull"
            gravityScale={0} 
            ref={modelBody}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
            restitution={0.2}
            position={[0, 20, 0]}
            
        >
            <Model ref={model} modelName="Spaceship" scale="0.3" />  
            
        </RigidBody>
           
    </Suspense>
}