"use client"

import { useRef, useMemo, useCallback } from "react"
import * as THREE from "three"

interface ThreeHeroBackgroundProps {
  className?: string
}

const ThreeHeroBackground = ({ className }: ThreeHeroBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const frameRef = useRef<number>()
  const mouseRef = useRef(new THREE.Vector2())
  const targetCameraPositionRef = useRef(new THREE.Vector3(0, 0, 30))

  // Memoize scene creation
  const scene = useMemo(() => {
    const newScene = new THREE.Scene()
    newScene.fog = new THREE.Fog(0x000000, 1, 100)
    return newScene
  }, [])

  // Memoize camera creation
  const camera = useMemo(() => {
    const newCamera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    newCamera.position.set(0, 0, 30)
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

  // Memoize DNA helix creation
  const helixGroup = useMemo(() => {
    const group = new THREE.Group()
    const helixRadius = 5
    const helixHeight = 20
    const helixTurns = 4

    for (let i = 0; i < 100; i++) {
      const t = (i / 100) * helixTurns * Math.PI * 2
      const y = (i / 100) * helixHeight - helixHeight / 2

      // First strand
      const sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x222222,
          emissiveIntensity: 0.5,
        }),
      )
      sphere1.position.set(Math.cos(t) * helixRadius, y, Math.sin(t) * helixRadius)
      group.add(sphere1)

      // Second strand
      const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshPhysicalMaterial({
          color: 0xcccccc,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x111111,
          emissiveIntensity: 0.5,
        }),
      )
      sphere2.position.set(Math.cos(t + Math.PI) * helixRadius, y, Math.sin(t + Math.PI) * helixRadius)
      group.add(sphere2)

      // Connecting lines
      if (i % 5 === 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([sphere1.position, sphere2.position])
        const line = new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: 0x666666,
            transparent: true,
            opacity: 0.3,
          }),
        )
        group.add(line)
      }
    }

    return group
  }, [])

  // Memoize neural network creation
  const networkGroup = useMemo(() => {
    const group = new THREE.Group()
    const nodes: THREE.Mesh[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0x222222,
          emissiveIntensity: 0.3,
        }),
      )

      node.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)
      group.add(node)
      nodes.push(node)
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)
        if (distance < 8) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position])
          const line = new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.2,
            }),
          )
          group.add(line)
        }
      }
    }

    return group
  }, [])

  // Memoize particle system creation
  const particleSystem = useMemo(() => {
    const particleCount = 2000
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleVelocities = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 100
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 100

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.02
      particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02

      particleSizes[i] = Math.random() * 2 + 1
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1))

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xffffff) },
        color2: { value: new THREE.Color(0xcccccc) },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying vec3 vColor;
        
        void main() {
          vColor = mix(vec3(1.0, 1.0, 1.0), vec3(0.8, 0.8, 0.8), sin(time + position.x * 0.01) * 0.5 + 0.5);
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })

    return {
      particles: new THREE.Points(particleGeometry, particleMaterial),
      velocities: particleVelocities,
      count: particleCount,
    }
  }, [])

  // Memoize lighting setup
  const lights = useMemo(() => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true

    const rimLight1 = new THREE.DirectionalLight(0xffffff, 0.5)
    rimLight1.position.set(-10, 0, -10)

    const rimLight2 = new THREE.DirectionalLight(0xcccccc, 0.5)
    rimLight2.position.set(10, 0, -10)

    return { ambientLight, directionalLight, rimLight1, rimLight2 }
  }, [])

  // Memoized mouse move handler
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!mountRef.current) return

    const rect = mountRef.current.getBoundingClientRect()
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    targetCameraPositionRef.current.x = mouseRef.current.x * 5
    targetCameraPositionRef.current.y = mouseRef.current.y * 5
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

    // Update shader uniforms
    if ((particleSystem.particles.material as THREE.ShaderMaterial).uniforms) {
      ;(particleSystem.particles.material as THREE.ShaderMaterial).uniforms.time.value = time
    }

    // Animate helix
    helixGroup.rotation.y = time * 0.2
    helixGroup.rotation.x = Math.sin(time * 0.1) * 0.1

    // Animate network
    networkGroup.rotation.y = time * 0.1
    networkGroup.rotation.z = time * 0.05

    // Animate particles
    const positions = particleSystem.particles.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particleSystem.count; i++) {
      positions[i * 3] += particleSystem.velocities[i * 3]
      positions[i * 3 + 1] += particleSystem.velocities[i * 3 + 1]
      positions[i * 3 + 2] += particleSystem.velocities[i * 3 + 2]

      // Boundary check
      if (Math.abs(positions[i * 3]) > 50) particleSystem.velocities[i * 3] *= -1
      if (Math.abs(positions[i * 3 + 1]) > 50) particleSystem.velocities[i * 3 + 1] *= -1
      if (Math.abs(positions[i * 3 + 2]) > 50) particleSystem.velocities[i * 3 + 2] *= -1
    }
    particleSystem.particles.geometry.attributes.position.needsUpdate = true

    // Smooth camera movement
    if (cameraRef.current) {
      cameraRef.current.position.lerp(targetCameraPositionRef.current, 0.05)
      cameraRef.current.lookAt(0, 0, 0)
    }

    if (rendererRef.current && cameraRef.current) {
      rendererRef.current.render(scene, cameraRef.current)
    }
  }, [scene, helixGroup, networkGroup, particleSystem])

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
    scene.add(helixGroup)
    scene.add(networkGroup)
    scene.add(particleSystem.particles)
    scene.add(lights.ambientLight)
    scene.add(lights.directionalLight)
    scene.add(lights.rimLight1)
    scene.add(lights.rimLight2)

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
  }, [
    scene,
    camera,
    renderer,
    helixGroup,
    networkGroup,
    particleSystem,
    lights,
    handleMouseMove,
    handleResize,
    animate,
  ])

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

export default ThreeHeroBackground
