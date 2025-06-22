"use client"

import { useRef, useMemo, useCallback } from "react"
import * as THREE from "three"

interface ThreePortfolioBackgroundProps {
  className?: string
  activeCategory?: string
}

const ThreePortfolioBackground = ({ className, activeCategory }: ThreePortfolioBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const frameRef = useRef<number>()
  const mouseRef = useRef(new THREE.Vector2())
  const targetCameraPositionRef = useRef(new THREE.Vector3(0, 0, 25))
  if(false){
    console.log(activeCategory)
  }
  // Memoize scene creation
  const scene = useMemo(() => {
    const newScene = new THREE.Scene()
    newScene.fog = new THREE.Fog(0x000000, 10, 100)
    return newScene
  }, [])

  // Memoize camera creation
  const camera = useMemo(() => {
    const newCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    newCamera.position.set(0, 0, 25)
    return newCamera
  }, [])

  // Memoize renderer creation
  const renderer = useMemo(() => {
    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    newRenderer.shadowMap.enabled = true
    newRenderer.shadowMap.type = THREE.PCFSoftShadowMap
    return newRenderer
  }, [])

  // Memoize floating cards creation
  const cardGroup = useMemo(() => {
    const group = new THREE.Group()
    const cards: THREE.Mesh[] = []

    for (let i = 0; i < 12; i++) {
      const cardGeometry = new THREE.PlaneGeometry(2, 1.2, 1, 1)
      const cardMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.1,
        roughness: 0.8,
        transmission: 0.1,
        thickness: 0.1,
        transparent: true,
        opacity: 0.8,
      })

      const card = new THREE.Mesh(cardGeometry, cardMaterial)

      // Position cards in a spiral
      const angle = (i / 12) * Math.PI * 2
      const radius = 8 + Math.sin(i * 0.5) * 3
      card.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 10, Math.sin(angle) * radius)

      card.rotation.y = angle + Math.PI / 2
      card.rotation.x = (Math.random() - 0.5) * 0.3

      group.add(card)
      cards.push(card)
    }

    return { group, cards }
  }, [])

  // Memoize matrix effect creation
  const matrixSystem = useMemo(() => {
    const matrixGeometry = new THREE.BufferGeometry()
    const matrixCount = 1000
    const matrixPositions = new Float32Array(matrixCount * 3)
    const matrixColors = new Float32Array(matrixCount * 3)

    for (let i = 0; i < matrixCount; i++) {
      matrixPositions[i * 3] = (Math.random() - 0.5) * 50
      matrixPositions[i * 3 + 1] = (Math.random() - 0.5) * 50
      matrixPositions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const brightness = 0.3 + Math.random() * 0.7
      matrixColors[i * 3] = brightness
      matrixColors[i * 3 + 1] = brightness
      matrixColors[i * 3 + 2] = brightness
    }

    matrixGeometry.setAttribute("position", new THREE.BufferAttribute(matrixPositions, 3))
    matrixGeometry.setAttribute("color", new THREE.BufferAttribute(matrixColors, 3))

    const matrixMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    return {
      matrix: new THREE.Points(matrixGeometry, matrixMaterial),
      count: matrixCount,
    }
  }, [])

  // Memoize wireframe creation
  const wireframeGroup = useMemo(() => {
    const group = new THREE.Group()
    const geometries = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1.5, 0),
    ]

    geometries.forEach((geo, index) => {
      const wireframe = new THREE.WireframeGeometry(geo)
      const line = new THREE.LineSegments(
        wireframe,
        new THREE.LineBasicMaterial({
          color: [0xffffff, 0xdddddd, 0xaaaaaa][index],
          transparent: true,
          opacity: 0.3,
        }),
      )

      line.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)
      group.add(line)
    })

    return group
  }, [])

  // Memoize lighting setup
  const lights = useMemo(() => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 50)
    pointLight1.position.set(-10, 5, 10)

    const pointLight2 = new THREE.PointLight(0xdddddd, 1, 50)
    pointLight2.position.set(10, -5, -10)

    return { ambientLight, directionalLight, pointLight1, pointLight2 }
  }, [])

  // Memoized mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!mountRef.current) return

    const rect = mountRef.current.getBoundingClientRect()
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    targetCameraPositionRef.current.x = mouseRef.current.x * 3
    targetCameraPositionRef.current.y = mouseRef.current.y * 3
  }, [])

  // Memoized resize handler
  const handleResize = useCallback(() => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

    cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
    cameraRef.current.updateProjectionMatrix()
    rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
  }, [])

  // Memoized animation loop
  const animate = useCallback(() => {
    frameRef.current = requestAnimationFrame(animate)

    const time = Date.now() * 0.001

    // Animate floating cards
    cardGroup.group.rotation.y = time * 0.1
    cardGroup.cards.forEach((card, index) => {
      card.rotation.z = Math.sin(time + index) * 0.1
      card.position.y += Math.sin(time * 2 + index) * 0.01
    })

    // Animate matrix
    const positions = matrixSystem.matrix.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < matrixSystem.count; i++) {
      positions[i * 3 + 1] -= 0.1
      if (positions[i * 3 + 1] < -25) {
        positions[i * 3 + 1] = 25
      }
    }
    matrixSystem.matrix.geometry.attributes.position.needsUpdate = true

    // Animate wireframes
    wireframeGroup.children.forEach((wireframe, index) => {
      wireframe.rotation.x += 0.01 * (index + 1)
      wireframe.rotation.y += 0.01 * (index + 1)
    })

    // Animate lights
    lights.pointLight1.position.x = Math.sin(time) * 15
    lights.pointLight1.position.z = Math.cos(time) * 15
    lights.pointLight2.position.x = Math.cos(time * 0.7) * 15
    lights.pointLight2.position.z = Math.sin(time * 0.7) * 15

    // Smooth camera movement
    if (cameraRef.current) {
      cameraRef.current.position.lerp(targetCameraPositionRef.current, 0.05)
      cameraRef.current.lookAt(0, 0, 0)
    }

    if (rendererRef.current && cameraRef.current) {
      rendererRef.current.render(scene, cameraRef.current)
    }
  }, [scene, cardGroup, matrixSystem, wireframeGroup, lights])

  // Initialize Three.js scene
  const initializeScene = useCallback(() => {
    if (!mountRef.current) return

    // Store refs
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // Setup renderer
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Setup camera aspect ratio
    camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
    camera.updateProjectionMatrix()

    // Add objects to scene
    scene.add(cardGroup.group)
    scene.add(matrixSystem.matrix)
    scene.add(wireframeGroup)
    scene.add(lights.ambientLight)
    scene.add(lights.directionalLight)
    scene.add(lights.pointLight1)
    scene.add(lights.pointLight2)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [scene, camera, renderer, cardGroup, matrixSystem, wireframeGroup, lights, handleMouseMove, handleResize, animate])

  // Initialize on mount
  const mountRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        mountRef.current = node
        const cleanup = initializeScene()

        // Store cleanup for unmount
        return () => {
          if (cleanup) cleanup()
        }
      }
    },
    [initializeScene],
  )

  return <div ref={mountRefCallback} className={className} />
}

export default ThreePortfolioBackground
