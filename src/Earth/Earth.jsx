import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef , useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import useSpaceShip from '../Store/useSpaceShip';
export default function Earth(){
    const earthModel = useRef()
    const modelBody = useRef();
    const earth = useSpaceShip((state) => state.useSpaceShip)
    useFrame((state, delta) =>
    {
        if (earthModel != undefined && earthModel.current != undefined){
            const rotation = new THREE.Quaternion()
            const time = state.clock.elapsedTime  * 0.3  ;
            rotation.setFromEuler( new THREE.Euler(0, time , 0))
            modelBody.current.setNextKinematicRotation(rotation);
        }
    })

    const moveToEarth = () =>{

    }
    
    useEffect(()=>{

        const unsubscribeEarth = useSpaceShip.subscribe(
            (state)=> state.planet,
            (planet)=>{
               if (planet === "earth")
               moveToEarth();  
            }

        )   
        return ()=>{
           
            unsubscribeEarth();
        }

    }, [])

    return <Suspense fallback={null}>
             <RigidBody ref={modelBody} type="kinematicPosition"  colliders="ball">
                <Model ref={earthModel} modelName="Earth" scale="0.2" position_y={-3.0} />
             </RigidBody>
        </Suspense>
}