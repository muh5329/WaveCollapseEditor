import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import { InstancedRigidBodies, CylinderCollider ,BallCollider, CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export default function Moon(){
    const model = useRef()
    const modelBody = useRef();
    useFrame((state, delta) =>
    {
        if (model != undefined && model.current != undefined){
            const distanceToCenter = 25;
            const time = state.clock.elapsedTime  * 0.3  ;

            const positionX = Math.cos(  time )   * distanceToCenter; 
            const positionZ = Math.sin(  time )   * distanceToCenter; 
            modelBody.current.setNextKinematicTranslation({x:positionX , y: 0, z :positionZ })

           
            const rotation = new THREE.Quaternion()
            rotation.setFromEuler( new THREE.Euler(0, time , 0))
            modelBody.current.setNextKinematicRotation(rotation);
        }
        
    })

    return <Suspense fallback={null}>
        <RigidBody  ref={modelBody} type="kinematicPosition" colliders="ball"  position={[0, 1, 0]}>
             <Model ref={model} modelName="Moon" scale="0.05" position_y={1}  />
        </RigidBody>
           
        </Suspense>
}