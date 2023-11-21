import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type Time from '@/utils/Time'
import type Sizes from '@/utils/Sizes'

interface Options {
  time: Time
  sizes: Sizes
  renderer: THREE.WebGLRenderer
}

export default class Camera {
  container: THREE.Object3D
  time: Time
  sizes: Sizes
  renderer: THREE.WebGLRenderer
  orbitControls!: OrbitControls
  instance!: THREE.PerspectiveCamera
  constructor(_options: Options) {
    // Options
    this.time = _options.time
    this.sizes = _options.sizes
    this.renderer = _options.renderer

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    this.setInstance()
    this.setOrbitControls()
  }
  setInstance() {
    // Set up
    this.instance = new THREE.PerspectiveCamera(
      40,
      this.sizes.viewport.width / this.sizes.viewport.height,
      1,
      80
    )
    this.instance.up.set(0, 0, 1)
    this.instance.lookAt(new THREE.Vector3())
    this.instance.position.copy(new THREE.Vector3(10, 10, 10))
    this.container.add(this.instance)

    // Resize event
    this.sizes.on('resize', () => {
      this.instance.aspect =
        this.sizes.viewport.width / this.sizes.viewport.height
      this.instance.updateProjectionMatrix()
    })
  }
  setOrbitControls() {
    // Set up
    this.orbitControls = new OrbitControls(
      this.instance,
      this.renderer.domElement
    )
    this.orbitControls.enabled = false
    // this.orbitControls.enableKeys = false
    this.orbitControls.zoomSpeed = 0.5
  }
}
