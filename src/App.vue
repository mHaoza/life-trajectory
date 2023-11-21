<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Application from '@/LifeTrajectoryMap/Application'

const canvasRef = ref<HTMLCanvasElement>()
onMounted(() => {
  if (!canvasRef.value) return
  new Application({ $canvas: canvasRef.value })
})
</script>

<template>
  <canvas ref="canvasRef" class="webgl"></canvas>
</template>

<style>
#app {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}
</style>
