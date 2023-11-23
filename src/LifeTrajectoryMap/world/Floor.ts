import * as THREE from 'three'

export default class Floor {
  container: THREE.Object3D
  constructor() {
    this.container = new THREE.Object3D()
    this.container.name = 'Floor'

    this.init()
  }
  init() {
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x031837,
      // specular: 0x111111,
      metalness: 0,
      roughness: 1,
      // opacity: 0.2,
      opacity: 0.5,
      transparent: true
    })
    const floorGeometry = new THREE.PlaneGeometry(2000, 2000, 1, 1)

    const floor = new THREE.Mesh(floorGeometry, floorMaterial)

    // floor.rotation.x = - Math.PI / 2;
    floor.position.z = 0
    // floor.castShadow = true;
    floor.receiveShadow = true

    this.container.add(floor)
  }
}
