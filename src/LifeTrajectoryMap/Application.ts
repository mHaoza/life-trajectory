import Sizes from '@/utils/Sizes'
import Time from '@/utils/Time'
import * as THREE from 'three'
import Camera from './Camera'
import World from './world/World'
import GUI from 'lil-gui'
import Passes from './Passes'
interface ApplicationOptions {
  $canvas: HTMLCanvasElement
}

export default class Application {
  $canvas: HTMLCanvasElement
  config!: { debug: boolean }
  debug?: GUI
  time: Time
  sizes: Sizes
  scene!: THREE.Scene
  renderer!: THREE.WebGLRenderer
  camera!: Camera
  passes!: Passes
  world!: World
  constructor(_options: ApplicationOptions) {
    // Options
    this.$canvas = _options.$canvas

    // Set up
    this.time = new Time()
    this.sizes = new Sizes()

    this.setConfig()
    this.setDebug()
    this.setRenderer()
    this.setCamera()
    this.setPasses()
    this.setWorld()
  }

  /**
   * Set config
   */
  setConfig() {
    this.config = {
      debug: true
    }
  }
  /**
   * Set debug
   */
  setDebug() {
    if (this.config.debug) {
      this.debug = new GUI({ width: 420 })
    }
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
    this.renderer.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio, 1.5), 2)
    )
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
  }

  /**
   * Set camera
   */
  setCamera() {
    this.camera = new Camera({
      time: this.time,
      sizes: this.sizes,
      renderer: this.renderer,
      debug: this.debug
    })

    this.scene.add(this.camera.container)
  }
  setPasses() {
    // Create passes
    this.passes = new Passes({
      time: this.time,
      sizes: this.sizes,
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
      debug: this.debug
    })
  }
  /**
   * Set world
   */
  setWorld() {
    this.world = new World({
      time: this.time,
      sizes: this.sizes,
      camera: this.camera,
      renderer: this.renderer,
      debug: this.debug
    })
    this.scene.add(this.world.container)
  }
  /**
   * Destructor
   */
  destructor() {
    this.time.off('tick')
    this.sizes.off('resize')

    this.camera.orbitControls.dispose()
    this.renderer.dispose()
    this.debug?.destroy()
  }
}
