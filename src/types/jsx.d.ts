/// <reference types="react-scripts" />

import { Group } from 'three';
import { Object3DNode } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: Object3DNode<Group, typeof Group>;
    }
  }
}
