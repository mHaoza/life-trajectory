import * as THREE from 'three'

import type Time from '@/utils/Time'
import type Camera from './Camera'

interface RaycasterOptions {
  $canvas: HTMLCanvasElement
  time: Time
  camera: Camera
}

export default class Raycaster {
  $canvas: HTMLCanvasElement
  time: Time
  camera: Camera
  instance: THREE.Raycaster
  mouse: THREE.Vector2
  eventOffset: THREE.Vector2
  /**
   * Constructor
   */
  constructor(_options: RaycasterOptions) {
    // Options
    this.$canvas = _options.$canvas
    this.time = _options.time
    this.camera = _options.camera

    // Set up
    this.instance = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()
    this.eventOffset = new THREE.Vector2()

    window.addEventListener('mousemove', this.onMouseMove.bind(this), false)
    this.time.on('tick', () => {
      this.instance.setFromCamera(this.mouse, this.camera.instance)
    })
  }

  onMouseMove(event: MouseEvent) {
    // 如果父级并非满屏，所以需要减去父级的left 和 top
    const { top, left, width, height } = this.$canvas.getBoundingClientRect()
    const clientX = event.clientX - left
    const clientY = event.clientY - top

    this.mouse.x = (clientX / width) * 2 - 1
    this.mouse.y = -(clientY / height) * 2 + 1

    this.eventOffset.x = clientX
    this.eventOffset.y = clientY
  }

  intersectObject(object: THREE.Object3D, recursive?: boolean | undefined) {
    return this.instance.intersectObject(object, recursive)
  }
  intersectObjects(objects: THREE.Object3D[], recursive?: boolean | undefined) {
    return this.instance.intersectObjects(objects, recursive)
  }
}
