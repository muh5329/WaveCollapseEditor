import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
export default function RaycastWhenCameraMoves() {
  const matrix = new THREE.Matrix4()
  useFrame((state) => {   
    if (!matrix.equals(state.camera.matrixWorld)) {
      state.events.update()
      matrix.copy(state.camera.matrixWorld)
    }
  })
}