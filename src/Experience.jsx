import {  PerspectiveCamera, MapControls } from '@react-three/drei'
import React, { Suspense, useState, useEffect } from 'react'
import { Physics, RigidBody, CuboidCollider, Debug} from "@react-three/rapier";
import { useControls } from 'leva' 
import { DoubleSide } from "three";
import * as THREE from 'three'
import Lights from './Lights.jsx';
export default function Experience()
{

    const gridDimensions = {x : 10, y: 10 , z: 10}
    const cubeSize = 1;
    let cubeSpace = [];
    const [hovered, setHovered] = useState(false)
    const [models, setModels] = useState([])
    
    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
      return () => document.body.style.cursor = 'auto'
    }, [hovered])


    const spawnCube = (position) =>{

      // Check to see if there is already a model in place in cube space 
      
      if (cubeSpace[position.x ]== undefined){
        cubeSpace[position.x ] = [];
      }  
      if (cubeSpace[position.x ][position.y ]== undefined)  {
        cubeSpace[position.x ][position.y] = [];
      }  
      if (cubeSpace[position.x ][position.y][position.z] == undefined){
        let key = position.x + "," + position.y  +","+position.z ;
       
        let model = <mesh 
            position={[ position.x, position.y , position.z]}  
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)} 
            onClick={onGridClick}
            onContextMenu={onHandleLeftClick}
            key={key} 
          >
            <boxGeometry />
            <meshStandardMaterial color="purple"  />
          </mesh>
        cubeSpace[position.x][position.y][position.z] = position
        setModels(oldArray => [...oldArray, model]);
      

      } 

    }

    const onGridClick = (ctx) =>{
        ctx.stopPropagation()
        const obj = ctx.eventObject;
        const currPosition =  new THREE.Vector3()
        currPosition.copy(obj.position)
     

        // If a model has been intersected, check to see which face of the model  / cube boundry has been clicked on
       
        const intersectionType = ctx.intersections[0].eventObject.geometry.type
        
        
        if (intersectionType != "PlaneGeometry"){
          const intersectionPoint = ctx.intersections[0].point


          // Determine which face has been clicked
          //  for our 1 by 1 by 1 cube, the plane clicked will be exaclty 0.5 either plus or minus
          // from our clicked axis plane  rounded by 2 decimal points
          
          let faceMapPosition = {x: 0, y : 0 , z : 0};
          // Right
          if (Math.round(intersectionPoint.x * 100) / 100   == currPosition.x + 0.5){
           faceMapPosition = {x: 1, y : 0 , z : 0};
          } 

          // Left
          if (Math.round(intersectionPoint.x * 100) / 100 == currPosition.x - 0.5 ){
            faceMapPosition = {x: -1, y : 0 , z : 0};
          } 

          // Top
          if (Math.round(intersectionPoint.y * 100) / 100 == currPosition.y + 0.5){
            faceMapPosition = {x: 0, y : 1 , z : 0};
          } 

          // Bottom
          if (Math.round(intersectionPoint.y * 100) / 100 == currPosition.y - 0.5){
            faceMapPosition = {x: 0, y : -1 , z : 0};
          } 

          // Front
          if (Math.round(intersectionPoint.z * 100) / 100 == currPosition.z + 0.5){
            faceMapPosition = {x: 0, y : 0 , z : 1};
          } 

          // Back
          if (Math.round(intersectionPoint.z * 100) / 100 == currPosition.z - 0.5){
            faceMapPosition = {x: 0, y : 0 , z : -1};
          } 
         

          currPosition.add(faceMapPosition)
        } else {
          currPosition.add({x: 0, y : 1 , z : 0})
        }
        
         spawnCube(currPosition)

      }

    //  Draw Helper Grid planes to place blocks on top of  
    const getGrids = gridDimensions => {
      let content = [];
      for (let x = 0 ; x < gridDimensions.x ; x++ ) {
        for (let z = 0 ; z < gridDimensions.z ; z++ ) {
         
              let xPos = x * cubeSize;
              let yPos = 0;
              let zPos = z * cubeSize;
              content.push(
                <mesh 
                  position={[ xPos, -1, zPos]}  
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)} 
                  onClick={onGridClick}
                  key={""+x +""+z} 
                  rotation={[Math.PI / 2, 0, 0]} 
                >
                  <planeGeometry />
                  <meshBasicMaterial color="green"  wireframe side={DoubleSide} />
                </mesh>
              
              );
        
        }
      }
    
      return content;
    };

    const onHandleLeftClick = (ctx)=>{
        ctx.stopPropagation()
        const position = ctx.eventObject.position;
        // Filter out the selected key and delete the model 
        let key = position.x + "," +position.y  +","+(position.z)
        setModels(oldArray => oldArray.filter((model)=>{
            return model.key != key
        }));

        // Remove the model from cubeSpace
        cubeSpace[position.x ][position.y][position.z] = undefined

    } 

    return <>
         
        <color args={['#241a1a']} attach='background'  />
        
        <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={45}  />
       
        <Suspense>
          <Physics >
            <Lights />
           {getGrids(gridDimensions) }
           {models}
           
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