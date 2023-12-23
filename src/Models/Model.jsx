import { useGLTF} from '@react-three/drei'
import { forwardRef } from 'react';

const Model = forwardRef( (props , ref) =>{
    var model = {};
    if (props.modelName != undefined){
          model = useGLTF(props.modelName);
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
                 object={ model.scene.clone() } 
                 position={props.position}
                 scale={props.scale}
                 rotation={props.rotation}
                 >
                </primitive>
            : <></>}            
        </ group>
    )
}
); 

export default Model;
