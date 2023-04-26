import { Text, Html, Loader, useGLTF, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import React, { Suspense } from 'react'
import { useControls } from 'leva' 
import Model from './Model';
import Earth from './Earth/Earth.jsx';
import Satellite from './Earth/Satellite.jsx';
import Moon from './Earth/Moon.jsx';
export default function Experience()
{
  const textProps = useControls('text ', {
    position: [ -15.0, 10.6, -4.0],
    rotation: [ 0.0, 0.0, 0.0]

})

    return <>
        
        <color args={['#241a1a']} attach='background'  />
        <ambientLight intensity={0.75} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={75}>
          <pointLight intensity={1} position={[-10, -25, -10]} />
          <spotLight castShadow intensity={2.25} angle={0.2} penumbra={1} position={[-25, 20, -15]} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} />
        </PerspectiveCamera>
       
        <Earth/>
        <Satellite />
        <Moon />
        <OrbitControls  enablePan={false}  />
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