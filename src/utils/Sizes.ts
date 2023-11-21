import mitt from 'mitt'
import type { Handler } from 'mitt'

type Events = {
  resize: undefined
}
export default class Sizes {
  /**
   * Constructor
   */
  viewport: { width: number; height: number }
  $sizeViewport: HTMLDivElement
  width: number = 0
  height: number = 0
  private emitter = mitt<Events>()
  constructor() {
    // Viewport size
    this.viewport = { width: 0, height: 0 }
    this.$sizeViewport = document.createElement('div')
    this.$sizeViewport.style.width = '100vw'
    this.$sizeViewport.style.height = '100vh'
    this.$sizeViewport.style.position = 'absolute'
    this.$sizeViewport.style.top = '0px'
    this.$sizeViewport.style.left = '0px'
    this.$sizeViewport.style.pointerEvents = 'none'

    // Resize event
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  /**
   * Resize
   */
  resize() {
    document.body.appendChild(this.$sizeViewport)
    this.viewport.width = this.$sizeViewport.offsetWidth
    this.viewport.height = this.$sizeViewport.offsetHeight
    document.body.removeChild(this.$sizeViewport)

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.emitter.emit('resize')
  }

  /**
   * Event listen
   */
  on(type: keyof Events, handler: Handler<Events[keyof Events]>) {
    this.emitter.on(type, handler)
  }
}
