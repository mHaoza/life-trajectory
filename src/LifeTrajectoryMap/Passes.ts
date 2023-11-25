import type Sizes from '@/utils/Sizes'
import type Time from '@/utils/Time'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import type Camera from './Camera'
import type GUI from 'lil-gui'

interface PassesOptions {
  time: Time
  sizes: Sizes
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: Camera
  debug?: GUI
}

export default class Passes {
  time: Time
  sizes: Sizes
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  renderPass: RenderPass
  scene: THREE.Scene
  camera: Camera
  debug?: GUI
  debugFolder?: GUI
  constructor(_options: PassesOptions) {
    // Options
    this.time = _options.time
    this.sizes = _options.sizes
    this.renderer = _options.renderer
    this.scene = _options.scene
    this.camera = _options.camera
    this.debug = _options.debug

    // Set up
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera.instance)
    // Add passes
    this.composer.addPass(this.renderPass)

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder('postprocess')
      this.debugFolder.close()
    }

    // Time tick
    this.time.on('tick', () => {
      // Renderer
      this.composer.render()
      // this.renderer.render(this.scene, this.camera.instance)
    })

    // Resize event
    this.sizes.on('resize', () => {
      this.renderer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
      this.composer.setSize(this.sizes.viewport.width, this.sizes.viewport.height)
    })
  }
}
