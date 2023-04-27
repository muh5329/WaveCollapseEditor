import Model from '../Model';
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect, Suspense } from "react";
import { useRapier, RigidBody } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";


export default function Spaceship(){
    const { camera } = useThree();
    const model = useRef()
    const bodyRef = useRef(null);

    const [subscribeKeys, getKeys] = useKeyboardControls(); // see: https://github.com/pmndrs/drei#keyboardcontrols
    // const { rapier, world } = useRapier();
   
    const impulseStrength2 = 50;
    const torqueStrength2 = 30;
    useFrame((state, delta) =>
    {
        const { forward, backward, leftward, rightward } = getKeys();

        const impulse = new THREE.Vector3(0, 0, 0);
        const torque = new THREE.Vector3(0, 0, 0);

        const impulseStrength = impulseStrength2 * delta;
        const torqueStrength = torqueStrength2 * delta;

        if (forward) {
            impulse.z = -1;
            torque.x = -1;
        }
        if (backward) {
            impulse.z = 1;
            torque.x = 1;
        }
        if (rightward) {
            impulse.x = 1;
            torque.z = -1;
        }
        if (leftward) {
            impulse.x = -1;
            torque.z = 1;
        }

        const { current: body } = bodyRef;

        if (body && impulse.length() > 0) {
            impulse.applyMatrix4(camera.matrixWorld).sub(camera.position);
            impulse.setY(0);
            impulse.normalize().setLength(impulseStrength);
            // console.log("impulse", impulse);

            body.applyImpulse(impulse);
        }

        if (body && torque.length() > 0) {
            torque.applyMatrix4(camera.matrixWorld).sub(camera.position);
            torque.setY(0);
            torque.normalize().setLength(torqueStrength);
            // console.log("torque", torque);

            body.applyTorqueImpulse(torque);
        }
       
        
    })

    return <Suspense fallback={null}>
        <RigidBody 
        lockRotations={false}
        ref={bodyRef}
        colliders="ball"
        position={[0, 1, 0]}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
        >
            <Model ref={model} modelName="Spaceship" scale="1" position_y={20} />
            
        </RigidBody>
            
    </Suspense>
}