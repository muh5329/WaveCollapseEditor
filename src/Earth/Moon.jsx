import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
export default function Moon(){
    const model = useRef()

    useFrame((state, delta) =>
    {
        if (model != undefined && model.current != undefined){
            const distanceToCenter = 20;
            const time = state.clock.elapsedTime  * 0.05 ;
            model.current.position.x = Math.cos(  time )   * distanceToCenter; 
            model.current.position.z = Math.sin(  time )   * distanceToCenter; 
           
        }
        
    })

    return <Suspense fallback={null}>
            <Model ref={model} modelName="Moon" scale="0.05" position_y={1}  />
        </Suspense>
}