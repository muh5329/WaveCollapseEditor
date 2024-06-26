import React, { Suspense, useRef , useEffect } from 'react'
import Model from "./Model"
import * as THREE from 'three'
export default function SelectedModel(props){
    
    const selectedModelFile = props.selectedModel;
    const selectedRotation= props.selectedRotation;
    const yRotation = THREE.MathUtils.degToRad(selectedRotation);
    const modelRef = useRef()

    // Create a generic Purple box mesh for debugging when no model is selected
    const genericMesh = <mesh>
        <boxGeometry />
        <meshStandardMaterial color="purple"  />
    </mesh>

    // Load the selected model into the Model Class object , the model class object uses GLTF loader to load the .glb model in 
    // place. 

    const selectedMesh =  <mesh
                        position={[0, -0.5, 0]}
                            >
                            <boxGeometry />
                            <meshStandardMaterial color="green" transparent={true} opacity={0.5}/>
                            <Model 
                                ref={modelRef} 
                                modelName={selectedModelFile} 
                                scale="0.09" 
                                position={[-0.05, -0.5, 0]}
                                rotation={[0,yRotation,0]}
                                  />
                        </mesh>      
    const model = selectedModelFile != "" || selectedModelFile !=  "floor" ? selectedMesh : genericMesh


    return model

}