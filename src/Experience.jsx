import {  PerspectiveCamera, MapControls } from '@react-three/drei'
import React, { Suspense, useState, useEffect } from 'react'
import { Physics, RigidBody, CuboidCollider, Debug} from "@react-three/rapier";
import { useControls } from 'leva' 

import Lights from './Lights.jsx';
export default function Experience()
{

    const gridDimensions = {x : 10, y: 10 , z: 10}
    const cubeSize = 1;
    const [hovered, setHovered] = useState(false)
    
    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
      return () => document.body.style.cursor = 'auto'
    }, [hovered])


    const onGridClick = (ctx) =>{
        ctx.stopPropagation()
        const obj = ctx.eventObject;
        obj.material.wireframe = false;
        console.log(ctx);
      }

    const getGrids = gridDimensions => {
      let content = [];
      for (let x = 0 ; x <gridDimensions.x ; x++ ) {
        for (let z = 0 ; z <gridDimensions.z ; z++ ) {
         
              let xPos = x * cubeSize;
              let yPos = 0;
              let zPos = z * cubeSize;
              content.push(
                <mesh 
                  position={[ xPos, yPos, zPos]}  
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)} 
                  onClick={onGridClick}
                  key={""+x +""+z} 
                >
                  <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                  <meshBasicMaterial  wireframe/>
                </mesh>
              
              );
        
        }
      }
      
      



      return content;
    };


    return <>
         
        <color args={['#241a1a']} attach='background'  />
        


        <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={45}  />
       
        <Suspense>
          <Physics 
            
          >
            <Lights />
           {getGrids(gridDimensions) }
           
            {/* <Debug /> */}
          </Physics>
        </Suspense>

        {/* <RaycastWhenCameraMoves /> */}
        <gridHelper position-y={ - 1 } args={[100, 100]} />
        <MapControls  
          enableDamping={true}
          dampingFactor={0.05}
          screenSpacePanning={false}
          minDistance={2}
          maxDistance={80}
          maxPolarAngle={ Math.PI / 2}
        />

    </>
}   