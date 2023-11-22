import * as THREE from 'three'

import type Sizes from '@/utils/Sizes'
import type Time from '@/utils/Time'
import type Camera from '../Camera'
import type GUI from 'lil-gui'

interface WorldOptions {
  time: Time
  sizes: Sizes
  camera: Camera
  renderer: THREE.WebGLRenderer
  debug?: GUI
}

export default class World {
  debug?: GUI
  debugFolder?: GUI
  time: Time
  sizes: Sizes
  camera: Camera
  renderer: THREE.WebGLRenderer
  container: THREE.Object3D
  axis!: THREE.AxesHelper
  constructor(_options: WorldOptions) {
    // Options
    this.debug = _options.debug
    this.time = _options.time
    this.sizes = _options.sizes
    this.camera = _options.camera
    this.renderer = _options.renderer

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder('world')
      this.debugFolder.close()
    }

    const geometry = new THREE.BoxGeometry(5, 5, 5)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    const cube = new THREE.Mesh(geometry, material)
    this.container.add(cube)

    this.setAxes()
    console.log(this)
  }
  setAxes() {
    this.axis = new THREE.AxesHelper(100)
    this.container.add(this.axis)
  }
}
