import Sizes from '@/utils/Sizes'
import Time from '@/utils/Time'
import * as THREE from 'three'
import Camera from './Camera'

interface ApplicationOptions {
  $canvas: HTMLCanvasElement
}

export default class Application {
  $canvas: HTMLCanvasElement
  time: Time
  sizes: Sizes
  scene!: THREE.Scene
  renderer!: THREE.WebGLRenderer
  camera!: Camera
  constructor(_options: ApplicationOptions) {
    // Options
    this.$canvas = _options.$canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()
    this.setRenderer()
    this.setCamera()

    const geometry = new THREE.BoxGeometry(5, 5, 5)
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }

  /**
   * Set renderer
   */
  setRenderer() {
    // Scene
    this.scene = new THREE.Scene()

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      alpha: true
    })
    // this.renderer.setClearColor(0x414141, 1)
    this.renderer.setClearColor(0x000000, 1)
    // this.renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2))
    this.renderer.setPixelRatio(2)
    this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    this.renderer.useLegacyLights = true
    // this.renderer.gammaFactor = 2.2
    // this.renderer.gammaOutPut = true
    this.renderer.autoClear = false

    // Resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(
        this.sizes.viewport.width,
        this.sizes.viewport.height
      )
    })
    this.time.on('tick', () => {
      this.renderer.render(this.scene, this.camera.instance)
    })
  }

  /**
   * Set camera
   */
  setCamera() {
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      renderer: this.renderer
      // debug: this.debug,
      // config: this.config
    })

    this.scene.add(this.camera.container)
  }
}
