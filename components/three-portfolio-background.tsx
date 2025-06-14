"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface ThreePortfolioBackgroundProps {
  className?: string
  activeCategory?: string
}

const ThreePortfolioBackground = ({ className, activeCategory }: ThreePortfolioBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const frameRef = useRef<number | null>(null)
 
  if(false){
    console.log(mountRef.current, sceneRef.current, rendererRef.current, cameraRef.current, frameRef.current, activeCategory)
  }
  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x000000, 10, 100) // Black fog
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 25)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create floating project cards in 3D space - now in black and white
    const cardGroup = new THREE.Group()
    const cards: THREE.Mesh[] = []

    for (let i = 0; i < 12; i++) {
      const cardGeometry = new THREE.PlaneGeometry(2, 1.2, 1, 1)
      const cardMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a, // Dark gray
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

      cardGroup.add(card)
      cards.push(card)
    }

    scene.add(cardGroup)

    // Create code matrix effect - now in black and white
    const matrixGeometry = new THREE.BufferGeometry()
    const matrixCount = 1000
    const matrixPositions = new Float32Array(matrixCount * 3)
    const matrixColors = new Float32Array(matrixCount * 3)

    for (let i = 0; i < matrixCount; i++) {
      matrixPositions[i * 3] = (Math.random() - 0.5) * 50
      matrixPositions[i * 3 + 1] = (Math.random() - 0.5) * 50
      matrixPositions[i * 3 + 2] = (Math.random() - 0.5) * 50

      const brightness = 0.3 + Math.random() * 0.7 // Grayscale value between 0.3 and 1.0
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

    const matrix = new THREE.Points(matrixGeometry, matrixMaterial)
    scene.add(matrix)

    // Create geometric wireframes - now in black and white
    const wireframeGroup = new THREE.Group()
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
          color: [0xffffff, 0xdddddd, 0xaaaaaa][index], // White to gray
          transparent: true,
          opacity: 0.3,
        }),
      )

      line.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)

      wireframeGroup.add(line)
    })

    scene.add(wireframeGroup)

    // Lighting - now in black and white
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8) // White light
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 50) // White light
    pointLight1.position.set(-10, 5, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xdddddd, 1, 50) // Light gray light
    pointLight2.position.set(10, -5, -10)
    scene.add(pointLight2)

    // Mouse interaction
    const mouse = new THREE.Vector2()
    const targetCameraPosition = new THREE.Vector3(0, 0, 25)

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return

      const rect = mountRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      targetCameraPosition.x = mouse.x * 3
      targetCameraPosition.y = mouse.y * 3
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Animate floating cards
      cardGroup.rotation.y = time * 0.1
      cards.forEach((card, index) => {
        card.rotation.z = Math.sin(time + index) * 0.1
        card.position.y += Math.sin(time * 2 + index) * 0.01
      })

      // Animate matrix
      const positions = matrix.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < matrixCount; i++) {
        positions[i * 3 + 1] -= 0.1
        if (positions[i * 3 + 1] < -25) {
          positions[i * 3 + 1] = 25
        }
      }
      matrix.geometry.attributes.position.needsUpdate = true

      // Animate wireframes
      wireframeGroup.children.forEach((wireframe, index) => {
        wireframe.rotation.x += 0.01 * (index + 1)
        wireframe.rotation.y += 0.01 * (index + 1)
      })

      // Animate lights
      pointLight1.position.x = Math.sin(time) * 15
      pointLight1.position.z = Math.cos(time) * 15
      pointLight2.position.x = Math.cos(time * 0.7) * 15
      pointLight2.position.z = Math.sin(time * 0.7) * 15

      // Smooth camera movement
      if (camera) {
        camera.position.lerp(targetCameraPosition, 0.05)
        camera.lookAt(0, 0, 0)
      }

      if (renderer && camera) {
        renderer.render(scene, camera)
      }
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return

      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (mountRef.current && rendererRef.current && rendererRef.current.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return <div ref={mountRef} className={className} />
}

export default ThreePortfolioBackground
