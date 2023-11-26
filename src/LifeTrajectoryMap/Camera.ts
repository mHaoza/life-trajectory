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
    this.instance = new THREE.PerspectiveCamera(45, this.sizes.viewport.width / this.sizes.viewport.height, 0.1, 5000)
    this.instance.position.set(0, -40, 70)
    this.instance.lookAt(0, 0, 0)
    this.container.add(this.instance)

    // Resize event
    this.sizes.on('resize', () => {
      this.instance.aspect = this.sizes.viewport.width / this.sizes.viewport.height
      this.instance.updateProjectionMatrix()
    })
  }
  setOrbitControls() {
    // Set up
    this.orbitControls = new OrbitControls(this.instance, this.renderer.domElement)
    this.orbitControls.enabled = true
    // this.orbitControls.enableKeys = false
    this.orbitControls.zoomSpeed = 0.5

    this.orbitControls.minPolarAngle = Math.PI / 3
    this.orbitControls.maxPolarAngle = (Math.PI / 3) * 2
    this.orbitControls.minAzimuthAngle = -(Math.PI / 6)
    this.orbitControls.maxAzimuthAngle = Math.PI / 6
    this.orbitControls.minDistance = 20
    this.orbitControls.maxDistance = 160
    this.orbitControls.enableDamping = true
    // this.orbitControls.dampingFactor = 0.01

    this.time.on('tick', () => {
      this.orbitControls.update()
      if (this.orbitControls.target.x > 100) {
        this.orbitControls.target.x = 100
      }
    })

    // Debug
    if (this.debug) {
      this.debugFolder?.add(this.orbitControls, 'enabled').name('orbitControlsEnabled')
    }
  }
}
