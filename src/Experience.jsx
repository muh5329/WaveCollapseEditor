import { Text, Html, Loader, useGLTF, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import React, { Suspense } from 'react'
import { Physics, RigidBody, CuboidCollider, Debug} from "@react-three/rapier";
import { useControls } from 'leva' 
import Earth from './Earth/Earth.jsx';
import Satellite from './Earth/Satellite.jsx';
import Moon from './Earth/Moon.jsx';
import Spaceship from './Spaceships/Spaceship.jsx';
import Lights from './Lights.jsx';
export default function Experience()
{
  const textProps = useControls('text ', {
    position: [ -15.0, 10.6, -4.0],
    rotation: [ 0.0, 0.0, 0.0]

})

    return <>
         
        <color args={['#241a1a']} attach='background'  />
        <ambientLight intensity={0.75} />
        <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={45}  />
       
        <Suspense>
          <Physics 
            
          >
            <Lights />
            <Earth/>
            <Satellite />
            <Moon />
            <Spaceship/>
          
            
            {/* <Debug /> */}
          </Physics>
        </Suspense>

        

        {/* enablePan={false} */}
        <OrbitControls   />
        <Stars radius={500} depth={50} count={1000} factor={10} />

        <Text
                    font="./bangers-v20-latin-regular.woff"
                    fontSize={2}
                    maxWidth={ 10}
                    textAlign='center'
                    {...textProps}
                > My Website !</Text> 


    </>
}   