import Model from '../Model';
import { useFrame } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
export default function Earth(){
    const earthModel = useRef()

    useFrame((state, delta) =>
    {
        if (earthModel != undefined && earthModel.current != undefined){
            earthModel.current.rotation.y += Math.PI / 10 * delta ; 
        }
    })

    return <Suspense fallback={null}>
            <Model ref={earthModel} modelName="Earth" scale="0.2" position_y={-3.0} />
        </Suspense>
}