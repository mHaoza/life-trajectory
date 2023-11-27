import * as THREE from 'three'

export default class FlyLine {
  container: THREE.Object3D
  constructor() {
    this.container = new THREE.Object3D()
    this.container.name = 'FlyLine'

    this.createFlyLine([new THREE.Vector3(-10, 0, 0), new THREE.Vector3(0, 0, 5), new THREE.Vector3(10, 0, 0)])
  }

  createFlyLine(curvePoints: THREE.Vector3[]) {
    const curve = new THREE.CatmullRomCurve3(curvePoints, false)
    const geometry = new THREE.TubeGeometry(curve, 1000, 0.1, 100, false)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const mesh = new THREE.Mesh(geometry, material)
    this.container.add(mesh)
  }
}
