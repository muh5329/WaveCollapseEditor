import { useGLTF} from '@react-three/drei'
import { forwardRef } from 'react';

const Model = forwardRef( (props , ref) =>{
    var model = {};
    if (props.modelName != undefined){
         model = useGLTF(`./${props.modelName}.glb`);
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
