
import {  PerspectiveCamera, MapControls } from '@react-three/drei'
import React, { Suspense, useState, useEffect } from 'react'
import { Physics, RigidBody, CuboidCollider, Debug} from "@react-three/rapier";
import { useControls } from 'leva' 
import useModelBrowser, { useModelStore } from '../Store/useModelBrowser';
import { DoubleSide } from "three";
import * as THREE from 'three'
import SelectedModel from './SelectedModel';
export default function Grid(){


    const gridDimensions = {x : 10, y: 10 , z: 10}
    const cubeSize = 1;
    let cubeSpace = useModelBrowser((state) => state.cubeSpace) 
    const setCubeSpace = useModelBrowser((state) => state.setCubeSpace)
    const [hovered, setHovered] = useState(false)
    const [models, setModels] = useState([])
    const [isDragging, setIsDragging] = useState(false);
    
    useEffect(() => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
      return () => document.body.style.cursor = 'auto'
    }, [hovered]);

    


    const spawnCube = (position) =>{
      const selectedModelFile = useModelStore.getState().selectedModelFile;
      const selectedRotation = useModelStore.getState().selectedRotation;
      cubeSpace = useModelStore.getState().cubeSpace;
      // Check to see if there is already a model in place in cube space 
      if (cubeSpace[position.x ]== undefined){
        cubeSpace[position.x ] = [];
      }  
      if (cubeSpace[position.x ][position.y ]== undefined)  {
        cubeSpace[position.x ][position.y] = [];
      }  
      if (cubeSpace[position.x ][position.y][position.z] == undefined){
        let key = position.x + "," + position.y  +","+position.z ;
        let model = <group 
            position={[ position.x, position.y , position.z]}  
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)} 
            onClick={onGridClick}
            onContextMenu={onHandleLeftClick}
            key={key} 
          >
            <SelectedModel selectedModel={selectedModelFile} selectedRotation={selectedRotation}/>
          </group>
        position.modelFile = selectedModelFile;
        position.rotation = selectedRotation;
        cubeSpace[position.x][position.y][position.z] = position
        setModels(oldArray => [...oldArray, model]);
        setCubeSpace(cubeSpace);

      } 
    }

    const onDragControl = (ctx) => {
      if (ctx.type === 'mousemove' || ctx.type === 'touchmove') {
        setIsDragging(true)
      }
      if (ctx.type === 'mouseup' || ctx.type === 'touchend') {
        setTimeout(() => {
          setIsDragging(false);
        }, 100);
      }
    }
    
    const onPointerOverHandler = (ctx) => {
      ctx.stopPropagation();
      setHovered(true);
    }

    
    const onGridClick = (ctx) =>{
      ctx.stopPropagation();
      if (isDragging)
        return;

      const obj = ctx.eventObject;
      const currPosition =  new THREE.Vector3()
      const intersection =  ctx.intersections[0]
      currPosition.copy(obj.position)
    
      // If a model has been intersected, check to see which face of the model  / cube boundry has been clicked on
      let position = ""
      if (intersection.eventObject )
        position = ctx.eventObject.position;
      
      if (position.y >= 0){
        var faceNormal = intersection.face.normal ;
        var faceMapPosition = {x: 0, y : 0 , z : 0};
        
        // Right
        if (faceNormal.x  == 1){
          faceMapPosition = {x: 1, y : 0 , z : 0};
        } 

        // Left
        if (faceNormal.x  == -1 ){
          faceMapPosition = {x: -1, y : 0 , z : 0};
        } 

        // Top
        if (faceNormal.y  == 1){
          faceMapPosition = {x: 0, y : 1 , z : 0};
        } 

        // Bottom
        if (faceNormal.y  == -1){
          faceMapPosition = {x: 0, y : -1 , z : 0};
        } 

        // Front
        if (faceNormal.z  == 1){
          faceMapPosition = {x: 0, y : 0 , z : 1};
        } 

        // Back
        if (faceNormal.z  == -1){
          faceMapPosition = {x: 0, y : 0 , z : -1};
        } 
        currPosition.add(faceMapPosition)
      } else {
        currPosition.add({x: 0, y : 1 , z : 0})
      }
      spawnCube(currPosition)
    }

    //  Draw Helper Grid planes to place blocks on top of  
    const getGrid = gridDimensions => {
      let content = [];
      for (let x = 0 ; x < gridDimensions.x ; x++ ) {
        for (let z = 0 ; z < gridDimensions.z ; z++ ) {
              let xPos = x * cubeSize;
              let yPos = 0;
              let zPos = z * cubeSize;
              content.push(
                <mesh 
                  position={[ xPos, -1, zPos]}  
                  onPointerOver={onPointerOverHandler} 
                  onPointerOut={() => setHovered(false)} 
                  onClick={onGridClick}
                  onDrag={onDragControl}
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
        {getGrid(gridDimensions) }
        {models}
    </>

}