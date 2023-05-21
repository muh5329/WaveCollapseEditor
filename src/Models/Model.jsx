import { useGLTF} from '@react-three/drei'
import { forwardRef } from 'react';

const Model = forwardRef( (props , ref) =>{
    var model = {};
    if (props.modelName != undefined){
         model = useGLTF(`./castle/${props.modelName}.glb`);
          // Cast model shadow
          model.scene.traverse((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            });
    }
    
    return (
        <group ref={ref}>
            {model.scene != undefined ? 
                 <primitive  
                 object={ model.scene } 
                 position-y={props.position_y}
                 scale={props.scale}
                 >
                </primitive>
            : <></>}            
        </ group>
    )
}
); 

export default Model;
