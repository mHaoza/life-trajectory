import mitt from 'mitt'
import type { Handler } from 'mitt'

type Events = {
  tick: undefined
}

export default class Time {
  start: number
  current: number
  elapsed: number
  delta: number
  ticker?: number
  private emitter = mitt<Events>()
  constructor() {
    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.tick = this.tick.bind(this)
    window.requestAnimationFrame(this.tick)
  }

  tick() {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.emitter.emit('tick')

    window.requestAnimationFrame(this.tick)
  }
  /**
   * Stop
   */
  stop() {
    this.ticker && window.cancelAnimationFrame(this.ticker)
  }

  /**
   * Event listen
   */
  on(type: keyof Events, handler: Handler<Events[keyof Events]>) {
    this.emitter.on(type, handler)
  }
}
