"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ClassifiedModel() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    } catch {
      return
    }
    renderer.setPixelRatio(1)
    container.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.set(0, 0.3, 4)
    scene.add(new THREE.AmbientLight(0xffffff, 0.8))
    const light = new THREE.DirectionalLight(0xffffff, 1.5)
    light.position.set(5, 5, 5)
    scene.add(light)
    const group = new THREE.Group()
    const material = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.4,
    })
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.12, 1.2, 8),
      material,
    )
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.4, 8), material)
    nose.position.y = 0.8
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.02, 0.3), material)
    wing.position.y = -0.1
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.2), material)
    tail.position.y = -0.55
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.2), material)
    fin.position.y = -0.45
    group.add(body, nose, wing, tail, fin)
    scene.add(group)
    const resize = new ResizeObserver(() => {
      renderer.setSize(container.clientWidth, container.clientHeight)
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    })
    resize.observe(container)
    let visible = false
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    observer.observe(container)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let previous = 0
    renderer.setAnimationLoop((time) => {
      if (visible && !document.hidden && !reduced.matches) {
        group.rotation.y += Math.min((time - previous) / 1000, 0.1) * 0.3
        renderer.render(scene, camera)
      }
      previous = time
    })
    return () => {
      renderer.setAnimationLoop(null)
      observer.disconnect()
      resize.disconnect()
      for (const mesh of [body, nose, wing, tail, fin]) mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <div ref={ref} className="absolute inset-0 blur-[20px]" />
}
