import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type Time from '@/utils/Time'
import type Sizes from '@/utils/Sizes'
import type GUI from 'lil-gui'

interface Options {
  time: Time
  sizes: Sizes
  renderer: THREE.WebGLRenderer
  debug?: GUI
}

export default class Camera {
  container: THREE.Object3D
  time: Time
  sizes: Sizes
  renderer: THREE.WebGLRenderer
  orbitControls!: OrbitControls
  instance!: THREE.PerspectiveCamera
  debug?: GUI
  debugFolder?: GUI
  constructor(_options: Options) {
    // Options
    this.time = _options.time
    this.sizes = _options.sizes
    this.renderer = _options.renderer
    this.debug = _options.debug

    // Set up
    this.container = new THREE.Object3D()
    this.container.matrixAutoUpdate = false

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder('camera')
      // this.debugFolder.open()
    }

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

    // Debug
    if (this.debug) {
      this.debugFolder
        ?.add(this.orbitControls, 'enabled')
        .name('orbitControlsEnabled')
    }
  }
}
