import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
export default function Satellite(){
    const model = useRef()

    useFrame((state, delta) =>
    {
        if (model != undefined && model.current != undefined){
            const distanceToCenter = 16;
            const time = state.clock.elapsedTime  * 0.5  ;
            model.current.position.x = Math.cos(  time )   * distanceToCenter; 
            model.current.position.y = Math.sin(  time )   * distanceToCenter; 
            
        }
        
    })

    return <Suspense fallback={null}>
            <Model ref={model} modelName="Satellite" scale="0.01" position_y={1.5} />
        </Suspense>
}