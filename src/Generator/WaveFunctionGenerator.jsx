import { DoubleSide } from "three";
import useModelBrowser, { useModelStore } from '../Store/useModelBrowser';
import React, { Suspense, useState, useEffect } from 'react'
import SelectedModel from '../Models/SelectedModel';
export default function WaveFunction(){

    const dimensionSize = 10;
    const gridDimensions = {x : dimensionSize, y: dimensionSize , z: dimensionSize}
    const xStart = 0;
    const zStart = 15;
    const yStart = 0;
    const cubeSize = 1;
    const connections = useModelBrowser((state) => state.connections) 
    const [models, setModels] = useState([])
    var nonFloorPossibleConnections = []; 
    var floorPossibleConnections = []; 
    var possibilitySpace = [];
    var finalModelList = [];
    //var propagationStack =  useModelBrowser((state) => state.propagationStack) 
    //const setPropagationStack= useModelBrowser((state) => state.setPropagationStack) 

    useEffect(() => {
        populatePossibilitySpace();
        return ()=>{};
      }, [connections]);
      

     //  Draw Helper Grid planes to place blocks on top of  
     const getGrid = gridDimensions => {
        let content = [];
        for (let x = xStart ; x < gridDimensions.x + xStart; x++ ) {
          for (let z = zStart ; z < gridDimensions.z + zStart; z++ ) {
                let xPos = x * cubeSize;
                let yPos = 0;
                let zPos = z * cubeSize;
                let key = xPos + "," + yPos +","+zPos ;
                content.push(
                  <mesh 
                    position={[ xPos, -1, zPos]}  
                    rotation={[Math.PI / 2, 0, 0]} 
                    key={key} 
                  >
                    <planeGeometry />
                    <meshBasicMaterial color="red"  wireframe side={DoubleSide} />
                  </mesh>
                );
          }
        }
        return content;
    };

    // Make a 3d matrix that has every space filled with the possbility to be any model
    const populatePossibilitySpace = () => {
        resetWaveFunction();
        buildDrawSpaceAndRender();
        if (connections != undefined && connections.size > 0){
            for (let [key, value] of connections) {
                if (value.ny.indexOf("floor") != -1 ){
                    floorPossibleConnections.push(key);
                }
                else {
                    if ( key != "floor")
                    nonFloorPossibleConnections.push(key);
                }
            }

            for (let x = 0 ; x < gridDimensions.x ; x++ ) {
                let y = 0;
                for (let y = 0 ; y < gridDimensions.y ; y++ ) {
                    for (let z = 0 ; z < gridDimensions.z ; z++ ){
                        if (possibilitySpace[x]== undefined){
                            possibilitySpace[x] = [];
                        }  
                        if (possibilitySpace[x][y]== undefined)  {
                            possibilitySpace[x][y] = [];
                        }  
                        if (possibilitySpace[x][y][z] == undefined && y != 0){
                            possibilitySpace[x][y][z] = nonFloorPossibleConnections;
                        } else {
                            possibilitySpace[x][y][z] = floorPossibleConnections;
                        }
                        
                    }
                }
            }
            doWaveTransformCollapse();
            buildDrawSpaceAndRender();
        }
    } 

    // Perform the wave function collapse algorithm
    const doWaveTransformCollapse = () =>{
        do{
            var lowestEntropy = getLowestEntropy();
            collapse(lowestEntropy);
            propagate(lowestEntropy);
        } while (hasLowestEntropy());
    }
    
    const propagate = (node) => {
        var propagationStack = [node];
        while (propagationStack.length > 0){
            var current = propagationStack.shift();
            for (var node of getBorders(current)){
                var direction = node.direction; 
                var possiblities = possibilitySpace[node.x][node.y][node.z];
                if (possiblities.length == 0) continue;
                var possibleNeighbors = getPossibilities(current , direction);
                for (var pos of possiblities){
                    if (!possibleNeighbors.includes(pos)){
                        constrain(node,pos)
                        if (!checkExistInList(node,propagationStack)) propagationStack.push(node);
                    }
                }
            }
            
        }
    }

    const constrain = (node,model) =>{
        var modelList = possibilitySpace[node.x][node.y][node.z];
        possibilitySpace[node.x][node.y][node.z] = modelList.filter((m)=>{return model !== m});

    }

    const getPossibilities = (node , direction) =>{
        var possibilities = [];
        var modelList = possibilitySpace[node.x][node.y][node.z]
        if (modelList == ""){
            if (node.y == 0){
                //possibilities = floorPossibleConnections;
            } else {
                //possibilities = nonFloorPossibleConnections;
            }
        } else {
            for (var model of modelList){
                var nodeConnections = connections.get(model);
                possibilities = possibilities.concat(nodeConnections[direction]);
            }
        }
        return possibilities;
    }

    const hasLowestEntropy = () =>{
        var hasLowest = false;
        for ( var x in possibilitySpace){
            for ( var  y in possibilitySpace[x]){
                for (  var z in possibilitySpace[x][y]){
                    if (possibilitySpace[x][y][z] && possibilitySpace[x][y][z].length > 1){
                        hasLowest = true;
                        break;
                    }
                }
            }
        }
        return hasLowest;
    }

    const collapse = (node) =>{
        var modelList = possibilitySpace[node.x][node.y][node.z];
        possibilitySpace[node.x][node.y][node.z] = [modelList[Math.floor(Math.random() * modelList.length)]];
    }

    const getLowestEntropy = () =>{
        var [x,y,z ] = [0,0,0];
        // Populate lowest Entropy List
        var lowestEntropyList = [];
        for (var x in possibilitySpace){
            for ( var y in possibilitySpace[y]){
                for (var  z in possibilitySpace[x][y]){
                    if (possibilitySpace[x][y][z] && possibilitySpace[x][y][z].length > 1){
                        var possibleModels = possibilitySpace[x][y][z];
                        if (possibleModels  && possibleModels.length > 0){
                                var obj = {models : possibleModels , xyz:{x:x,y:y,z:z}}
                                lowestEntropyList.push(obj); 
                        }
                    }
                }
            }
        }
        
        // Sort and limit lowest entropy list to only elements of the lowest n length
        lowestEntropyList.sort((itemA, itemB)=>{
            if (itemA.models.length < itemB.models.length) {
                return -1;
                }
                if (itemA.models.length > itemB.models.length) {
                return 1;
                }
                return 0;
        });

        var lowestEntropy = lowestEntropyList[0];
        var possibleLowestEntropies = lowestEntropyList.filter((entropy)=>{
            return entropy && entropy.models.length == lowestEntropy.models.length;
        });

        // Pick a random element from lowest entropy list
        lowestEntropy = possibleLowestEntropies[Math.floor(Math.random() * possibleLowestEntropies.length)];
        return {x : lowestEntropy.xyz.x, y : lowestEntropy.xyz.y ,z : lowestEntropy.xyz.z} ;
    }
 
    
    const checkArraySpaceUndefined = (coordinates,array) =>{
        var [x ,y,z] = [coordinates.x , coordinates.y, coordinates.z];
        return array[x] && array[x][y] && array[x][y][z];
    }

    const checkExistInList = (node,list) =>{
        var [x ,y,z] = [node.x , node.y, node.z];
        return list.find((e)=> {return e.x == x &&  e.y == y   &&  e.z == z })
    }

    const resetWaveFunction = () =>{
        nonFloorPossibleConnections = []; 
        floorPossibleConnections = [];  
        possibilitySpace = [];
        finalModelList = [];
        setModels([]);
    }

    const isValidBorder = (border,sourceNode) => {
       var borderModels = possibilitySpace[border.x][border.y][border.z];
       var sourceNodeModels = possibilitySpace[sourceNode.x][sourceNode.y][sourceNode.z];
       return borderModels.length !=1 && borderModels.length > sourceNodeModels.length;
    }

    const getBorders = (node) => {
        var [x,y,z] = [node.x,node.y,node.z]; 
        var possibleBorders = [
        {x:parseInt(x)+1, y:y, z:z, direction:"px"},
        {x:parseInt(x)-1, y:y, z:z, direction:"nx"},
        {x:x, y:parseInt(y)+1 , z:z, direction:"py"},
        {x:x ,y:parseInt(y)-1, z:z , direction:"ny"},
        {x:x, y:y, z:parseInt(z)+1 , direction:"pz"},
        {x:x, y:y, z:parseInt(z)-1, direction:"nz"}, ];

        var validBorders = []
        for (var border of possibleBorders){
            if (checkArraySpaceUndefined(border,possibilitySpace) &&
                isValidBorder(border,node)
            )
            validBorders.push(border);
        }
        return validBorders;
    }

    
    const buildDrawSpaceAndRender = ()=>{
        finalModelList = []
        for ( var x in possibilitySpace){
            for ( var  y in possibilitySpace[x]){
                for (  var z in possibilitySpace[x][y]){
                    if (possibilitySpace[x][y][z].length == 1){
                        finalModelList.push({
                            model:possibilitySpace[x][y][z],
                            x :x,
                            y: y,
                            z: z
                        });
                    }
                    
                }
            }
        } 
        renderPossibilties();
    }

    const renderPossibilties = ()=>{
        for (var mod of finalModelList){
            if ( mod){
                var [x,y,z]  = [mod.x, mod.y , mod.z]
                if (mod.model[0] == undefined  ) continue
                var modelStr = mod.model[0].split("-");
                var modelFile = modelStr[0];
                var modelRotation = modelStr[1];
                let key = x + "," + y  +","+z+"-final" ;
                let model = <group 
                    position={[ parseInt(x)+parseInt(xStart), parseInt(y)+parseInt(yStart) , parseInt(z)+parseInt(zStart)]}  
                    key={key} 
                >
                    <SelectedModel selectedModel={modelFile} selectedRotation={modelRotation}/>
                </group>
                setModels(oldArray => [...oldArray, model]);
            }
        }
      }

    return <>
        {getGrid(gridDimensions) }
        {models}
    </>
}