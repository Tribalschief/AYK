"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ThreeHeroBackgroundProps {
  className?: string
  isLight?: boolean
}

const ThreeHeroBackground = ({ className, isLight = false }: ThreeHeroBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(isLight ? 0xffffff : 0x000000, 1, 100)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 30)
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

    // Create DNA helix structure
    const helixGroup = new THREE.Group()
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
          color: isLight ? 0x000000 : 0xffffff,
          metalness: 0.8,
          roughness: 0.2,
          emissive: isLight ? 0x333333 : 0x222222,
          emissiveIntensity: 0.5,
        }),
      )
      sphere1.position.set(Math.cos(t) * helixRadius, y, Math.sin(t) * helixRadius)
      helixGroup.add(sphere1)

      // Second strand
      const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshPhysicalMaterial({
          color: isLight ? 0x333333 : 0xcccccc,
          metalness: 0.8,
          roughness: 0.2,
          emissive: isLight ? 0x666666 : 0x111111,
          emissiveIntensity: 0.5,
        }),
      )
      sphere2.position.set(Math.cos(t + Math.PI) * helixRadius, y, Math.sin(t + Math.PI) * helixRadius)
      helixGroup.add(sphere2)

      // Connecting lines
      if (i % 5 === 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([sphere1.position, sphere2.position])
        const line = new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: isLight ? 0x666666 : 0x666666,
            transparent: true,
            opacity: 0.3,
          }),
        )
        helixGroup.add(line)
      }
    }

    scene.add(helixGroup)

    // Create floating neural network
    const networkGroup = new THREE.Group()
    const nodes: THREE.Mesh[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshPhysicalMaterial({
          color: isLight ? 0x000000 : 0xffffff,
          metalness: 0.9,
          roughness: 0.1,
          emissive: isLight ? 0x333333 : 0x222222,
          emissiveIntensity: 0.3,
        }),
      )

      node.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)

      networkGroup.add(node)
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
              color: isLight ? 0x000000 : 0xffffff,
              transparent: true,
              opacity: 0.2,
            }),
          )
          networkGroup.add(line)
        }
      }
    }

    scene.add(networkGroup)

    // Advanced particle system with shaders
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

    // Custom shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(isLight ? 0x000000 : 0xffffff) },
        color2: { value: new THREE.Color(isLight ? 0x333333 : 0xcccccc) },
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying vec3 vColor;
        
        void main() {
          vColor = mix(vec3(${isLight ? "0.0, 0.0, 0.0" : "1.0, 1.0, 1.0"}), vec3(${isLight ? "0.2, 0.2, 0.2" : "0.8, 0.8, 0.8"}), sin(time + position.x * 0.01) * 0.5 + 0.5);
          
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

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(isLight ? 0x000000 : 0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Rim lighting
    const rimLight1 = new THREE.DirectionalLight(isLight ? 0x333333 : 0xffffff, 0.5)
    rimLight1.position.set(-10, 0, -10)
    scene.add(rimLight1)

    const rimLight2 = new THREE.DirectionalLight(isLight ? 0x666666 : 0xcccccc, 0.5)
    rimLight2.position.set(10, 0, -10)
    scene.add(rimLight2)

    // Mouse interaction
    const mouse = new THREE.Vector2()
    const targetCameraPosition = new THREE.Vector3(0, 0, 30)

    const handleMouseMove = (event: MouseEvent) => {
      if (!mountRef.current) return

      const rect = mountRef.current.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      targetCameraPosition.x = mouse.x * 5
      targetCameraPosition.y = mouse.y * 5
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update shader uniforms
      if ((particleMaterial as THREE.ShaderMaterial).uniforms) {
        ;(particleMaterial as THREE.ShaderMaterial).uniforms.time.value = time
      }

      // Animate helix
      helixGroup.rotation.y = time * 0.2
      helixGroup.rotation.x = Math.sin(time * 0.1) * 0.1

      // Animate network
      networkGroup.rotation.y = time * 0.1
      networkGroup.rotation.z = time * 0.05

      // Animate particles
      const positions = particles.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i * 3]
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1]
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2]

        // Boundary check
        if (Math.abs(positions[i * 3]) > 50) particleVelocities[i * 3] *= -1
        if (Math.abs(positions[i * 3 + 1]) > 50) particleVelocities[i * 3 + 1] *= -1
        if (Math.abs(positions[i * 3 + 2]) > 50) particleVelocities[i * 3 + 2] *= -1
      }
      particles.geometry.attributes.position.needsUpdate = true

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
      if (!mountRef.current || !camera || !renderer) return

      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [isLight])

  return <div ref={mountRef} className={className} />
}

export default ThreeHeroBackground
