import * as THREE from 'three'
import ChinaMap from './ChinaMap'
import Floor from './Floor'

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

    this.setAxes()
    this.setGrid()
    this.setLight()
    this.setFloor()
    this.setChinaMap()
    console.log(this)
  }
  setAxes() {
    this.axis = new THREE.AxesHelper(100)
    this.container.add(this.axis)
  }

  setGrid() {
    const gridHelper = new THREE.GridHelper(2000, 200)
    gridHelper.rotation.set(Math.PI / 2, 0, 0)
    gridHelper.position.z = 0.1
    this.container.add(gridHelper)
  }

  setLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1) // 环境光

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4) // 平行光
    directionalLight.position.set(10000, 10000, 10000)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024

    this.container.add(ambientLight, directionalLight)
  }

  setFloor() {
    const floor = new Floor({ debug: this.debugFolder })
    this.container.add(floor.container)
  }

  setChinaMap() {
    const chinaMap = new ChinaMap()
    this.container.add(chinaMap.container)
  }
}
