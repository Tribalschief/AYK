"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ThreeSkillsBackgroundProps {
  className?: string
  activeCategory?: string
}

const ThreeSkillsBackground = ({ className, activeCategory }: ThreeSkillsBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 20
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Create morphing geometry
    const morphGeometry = new THREE.IcosahedronGeometry(3, 2)
    const morphMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        category: { value: 0 },
        color1: { value: new THREE.Color(0x3b82f6) },
        color2: { value: new THREE.Color(0x8b5cf6) },
        color3: { value: new THREE.Color(0xec4899) },
        color4: { value: new THREE.Color(0x06b6d4) },
      },
      vertexShader: `
        uniform float time;
        uniform float category;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          
          // Morphing based on category
          float morphFactor = sin(time + category * 2.0) * 0.5 + 0.5;
          pos += normal * sin(pos.x * 2.0 + time) * 0.3 * morphFactor;
          pos += normal * cos(pos.y * 2.0 + time * 1.5) * 0.2 * morphFactor;
          pos += normal * sin(pos.z * 2.0 + time * 0.8) * 0.25 * morphFactor;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float category;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vec3 colors[4];
          colors[0] = color1;
          colors[1] = color2;
          colors[2] = color3;
          colors[3] = color4;
          
          int categoryIndex = int(mod(category, 4.0));
          vec3 baseColor = colors[categoryIndex];
          
          float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 finalColor = mix(baseColor, vec3(1.0), fresnel * 0.5);
          
          float alpha = 0.7 + sin(time + vPosition.x * 2.0) * 0.2;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const morphMesh = new THREE.Mesh(morphGeometry, morphMaterial)
    scene.add(morphMesh)

    // Create skill nodes constellation
    const skillNodes: THREE.Mesh[] = []
    const skillConnections: THREE.Line[] = []

    const createSkillConstellation = (categoryIndex: number) => {
      // Clear existing nodes and connections
      skillNodes.forEach((node) => scene.remove(node))
      skillConnections.forEach((connection) => scene.remove(connection))
      skillNodes.length = 0
      skillConnections.length = 0

      const nodeCount = 8 + categoryIndex * 2
      const radius = 8

      for (let i = 0; i < nodeCount; i++) {
        const angle = (i / nodeCount) * Math.PI * 2
        const height = (Math.random() - 0.5) * 4

        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 8, 8),
          new THREE.MeshPhysicalMaterial({
            color: [0x3b82f6, 0x8b5cf6, 0xec4899, 0x06b6d4][categoryIndex],
            metalness: 0.8,
            roughness: 0.2,
            emissive: [0x001122, 0x220011, 0x221100, 0x002211][categoryIndex],
            emissiveIntensity: 0.5,
          }),
        )

        node.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)

        scene.add(node)
        skillNodes.push(node)

        // Create connections to nearby nodes
        if (i > 0) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([skillNodes[i - 1].position, node.position])
          const line = new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: [0x3b82f6, 0x8b5cf6, 0xec4899, 0x06b6d4][categoryIndex],
              transparent: true,
              opacity: 0.4,
            }),
          )
          scene.add(line)
          skillConnections.push(line)
        }
      }

      // Connect last to first
      if (skillNodes.length > 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          skillNodes[skillNodes.length - 1].position,
          skillNodes[0].position,
        ])
        const line = new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: [0x3b82f6, 0x8b5cf6, 0xec4899, 0x06b6d4][categoryIndex],
            transparent: true,
            opacity: 0.4,
          }),
        )
        scene.add(line)
        skillConnections.push(line)
      }
    }

    // Initialize with first category
    createSkillConstellation(0)

    // Holographic data streams
    const streamGroup = new THREE.Group()
    const streamCount = 20

    for (let i = 0; i < streamCount; i++) {
      const streamGeometry = new THREE.BufferGeometry()
      const streamPoints = []

      for (let j = 0; j < 50; j++) {
        const t = j / 50
        streamPoints.push(
          new THREE.Vector3(Math.sin(t * Math.PI * 4 + i) * 5, (t - 0.5) * 20, Math.cos(t * Math.PI * 4 + i) * 5),
        )
      }

      streamGeometry.setFromPoints(streamPoints)
      const stream = new THREE.Line(
        streamGeometry,
        new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.3,
        }),
      )

      streamGroup.add(stream)
    }

    scene.add(streamGroup)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100)
    pointLight.position.set(0, 0, 10)
    scene.add(pointLight)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Update morph shader
      if (morphMaterial.uniforms) {
        morphMaterial.uniforms.time.value = time
      }

      // Animate morph mesh
      morphMesh.rotation.x = time * 0.1
      morphMesh.rotation.y = time * 0.15
      morphMesh.rotation.z = time * 0.05

      // Animate skill nodes
      skillNodes.forEach((node, index) => {
        node.rotation.x += 0.01
        node.rotation.y += 0.01
        node.position.y += Math.sin(time + index) * 0.01
      })

      // Animate data streams
      streamGroup.rotation.y = time * 0.1
      streamGroup.children.forEach((stream, index) => {
        stream.rotation.z = time * 0.2 + index * 0.1
      })

      // Animate lighting
      pointLight.position.x = Math.sin(time) * 10
      pointLight.position.z = Math.cos(time) * 10

      renderer.render(scene, camera)
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
      window.removeEventListener("resize", handleResize)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
    }
  }, [])

  // Update category when activeCategory changes
  useEffect(() => {
    if (sceneRef.current) {
      const categoryMap: { [key: string]: number } = {
        "Full-Stack Development": 0,
        "UI/UX Design": 1,
        "Python Development": 2,
        "Cloud Computing": 3,
      }

      const categoryIndex = categoryMap[activeCategory || "Full-Stack Development"] || 0

      // Update shader uniform
      const morphMesh = sceneRef.current.children.find((child) => child instanceof THREE.Mesh)
      if (morphMesh && (morphMesh.material as THREE.ShaderMaterial).uniforms) {
        ;(morphMesh.material as THREE.ShaderMaterial).uniforms.category.value = categoryIndex
      }
    }
  }, [activeCategory])

  return <div ref={mountRef} className={className} />
}

export default ThreeSkillsBackground
