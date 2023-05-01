import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import { InstancedRigidBodies, CylinderCollider ,BallCollider, CuboidCollider, Debug, Physics, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'

export default function Earth(){
    const earthModel = useRef()
    const modelBody = useRef();
    useFrame((state, delta) =>
    {
        if (earthModel != undefined && earthModel.current != undefined){
            const rotation = new THREE.Quaternion()
            const time = state.clock.elapsedTime  * 0.3  ;
            rotation.setFromEuler( new THREE.Euler(0, time , 0))
            modelBody.current.setNextKinematicRotation(rotation);
        }
    })

    return <Suspense fallback={null}>
             <RigidBody ref={modelBody} type="kinematicPosition"  colliders="ball">
                <Model ref={earthModel} modelName="Earth" scale="0.2" position_y={-3.0} />
             </RigidBody>
        </Suspense>
}