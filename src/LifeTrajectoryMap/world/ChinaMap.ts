import * as THREE from 'three'
import * as d3 from 'd3'

interface Province extends THREE.Object3D {
  properties?: GeoJSON.GeoJsonProperties
}

export default class ChinaMap {
  container: THREE.Object3D
  projection: d3.GeoProjection
  constructor() {
    this.container = new THREE.Object3D()
    this.container.name = 'ChinaMap'
    // 墨卡托投影转换
    this.projection = d3
      .geoMercator()
      .center([104.0, 37.5])
      .scale(80)
      .translate([0, 0])

    this.initMap()
  }

  async initMap() {
    const chinaJson = (await import(
      '@/assets/map/json/china.json'
    )) as GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>

    const COLOR_ARR: THREE.ColorRepresentation[] = [
      '#0465BD',
      '#357bcb',
      '#3a7abd'
    ]

    chinaJson.features.forEach((elem, index) => {
      // 定一个省份3D对象
      const province = new THREE.Object3D() as Province
      // 每个的 坐标 数组
      const coordinates = elem.geometry.coordinates
      const color = COLOR_ARR[index % COLOR_ARR.length]
      // 循环坐标数组
      coordinates.forEach((multiPolygon) => {
        multiPolygon.forEach((polygon) => {
          const shape = new THREE.Shape()

          for (let i = 0; i < polygon.length; i++) {
            const [x = 0, y = 0] =
              this.projection(polygon[i] as [number, number]) ?? []

            if (i === 0) {
              shape.moveTo(x, -y)
            } else {
              shape.lineTo(x, -y)
            }
          }

          const extrudeSettings = {
            depth: 0.1,
            bevelEnabled: true,
            bevelSegments: 1,
            bevelThickness: 0.2
          }

          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

          const material = new THREE.MeshStandardMaterial({
            metalness: 1,
            color: color
          })

          const material1 = new THREE.MeshStandardMaterial({
            metalness: 1,
            roughness: 1,
            color: color
          })

          const mesh = new THREE.Mesh(geometry, [material, material1])
          if (index % 2 === 0) {
            mesh.scale.set(1, 1, 1.2)
          }

          mesh.castShadow = true
          mesh.receiveShadow = true
          // mesh._color = color
          province.add(mesh)
        })
      })

      // 将geo的属性放到省份模型中
      province.properties = elem.properties
      if (elem?.properties?.centorid) {
        const [x, y] = this.projection(elem.properties.centorid) ?? []
        province.properties && (province.properties._centroid = [x, y])
      }

      this.container.add(province)
    })
  }
}
