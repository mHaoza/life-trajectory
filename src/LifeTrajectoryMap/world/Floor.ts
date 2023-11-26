import type GUI from 'lil-gui'
import * as THREE from 'three'

interface FloorOptions {
  debug?: GUI
}
export default class Floor {
  container: THREE.Object3D
  debug?: GUI
  constructor(_options: FloorOptions) {
    this.container = new THREE.Object3D()
    this.container.name = 'Floor'
    this.debug = _options.debug

    this.init()
  }
  init() {
    const floorMaterial = new THREE.MeshBasicMaterial({
      color: 0x031837,
      // metalness: 0,
      // roughness: 1,
      // opacity: 0.2,
      opacity: 1,
      transparent: true
    })
    const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 1, 1)

    const floor = new THREE.Mesh(floorGeometry, floorMaterial)

    // floor.rotation.x = - Math.PI / 2;
    floor.position.z = 0
    // floor.castShadow = true;
    floor.receiveShadow = true

    this.container.add(floor)

    if (this.debug) {
      const debugFolder = this.debug.addFolder('floor')
      debugFolder.addColor(floorMaterial, 'color').name('floorColor')
    }
  }
}
