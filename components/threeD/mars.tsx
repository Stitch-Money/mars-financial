/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei/useGLTF'
import { ReactThreeFiber, useFrame } from 'react-three-fiber';
import THREE, { AnimationMixer, AnimationClip } from 'three';
import { Stars } from '@react-three/drei';


export function Mars(props: ReactThreeFiber.Object3DNode<THREE.Group, typeof THREE.Group>) {
  const gltf = useGLTF('/images/mars.glb');
  const mixer = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    if (gltf) {


      const mxr = new AnimationMixer(gltf.scene);
      mixer.current = mxr;
      for (let animation of ['Orbit1', 'Orbit2']) {
        const clip = AnimationClip.findByName(gltf.animations, animation);
        const action = mxr.clipAction(clip);
        action.play();
      }
    }
  }, [gltf]);

  useFrame((_state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  })

  return (<group>
    <Stars
      radius={100} // Radius of the inner sphere (default=100)
      depth={30} // Depth of area where stars should fit (default=50)
      count={1000} // Amount of stars (default=5000)
      factor={8} // Size factor (default=4)
      saturation={0.6} // Saturation 0-1 (default=0)
      fade
    />
    <primitive object={gltf.scene}  {...props} />
  </group>
  )
}

useGLTF.preload('/images/mars.glb')
