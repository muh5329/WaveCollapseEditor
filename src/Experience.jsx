import {  PerspectiveCamera,  Environment, OrbitControls , MapControls} from '@react-three/drei'
import React, { Suspense } from 'react'
import { Physics, RigidBody, CuboidCollider, Debug} from "@react-three/rapier";
import Grid from './Models/Grid';
import Lights from './Lights';
export default function Experience()
{

    return <>
         
        <color args={['#241a1a']} attach='background'  />
        
        <OrbitControls 
          makeDefault  
          attach="orbitControls" 
          maxDistance={100}
          minDistance={10}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 2}
        />

        <PerspectiveCamera  position={[0, 0, 40]} fov={45}  />
       
        <Suspense>
          <Physics >
            <Lights />
            <Grid />
            {/* <Debug /> */}
          </Physics>
        </Suspense>

        {/* <RaycastWhenCameraMoves /> */}
        <gridHelper position-y={ - 1 } args={[100, 100]} />
        {/* <MapControls  
          enableDamping={true}
          dampingFactor={0.05}
          screenSpacePanning={false}
          minDistance={2}
          maxDistance={80}
          maxPolarAngle={ Math.PI / 2}
        /> */}

        

    </>
}   