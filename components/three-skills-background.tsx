"use client"

import { useRef, useMemo, useCallback } from "react"
import * as THREE from "three"

interface ThreeSkillsBackgroundProps {
  className?: string
  activeCategory?: string
}

const ThreeSkillsBackground = ({ className, activeCategory }: ThreeSkillsBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const frameRef = useRef<number>()
  const skillNodesRef = useRef<THREE.Mesh[]>([])
  const skillConnectionsRef = useRef<THREE.Line[]>([])

  // Memoize scene creation
  const scene = useMemo(() => {
    return new THREE.Scene()
  }, [])

  // Memoize camera creation
  const camera = useMemo(() => {
    const newCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    newCamera.position.z = 20
    return newCamera
  }, [])

  // Memoize renderer creation
  const renderer = useMemo(() => {
    const newRenderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    return newRenderer
  }, [])

  // Memoize morphing geometry creation
  const morphSystem = useMemo(() => {
    const morphGeometry = new THREE.IcosahedronGeometry(3, 2)
    const morphMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        category: { value: 0 },
        color1: { value: new THREE.Color(0xffffff) },
        color2: { value: new THREE.Color(0xdddddd) },
        color3: { value: new THREE.Color(0xbbbbbb) },
        color4: { value: new THREE.Color(0x999999) },
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

    return {
      mesh: new THREE.Mesh(morphGeometry, morphMaterial),
      material: morphMaterial,
    }
  }, [])

  // Memoize data streams creation
  const streamGroup = useMemo(() => {
    const group = new THREE.Group()
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
          color: 0xffffff,
          transparent: true,
          opacity: 0.3,
        }),
      )

      group.add(stream)
    }

    return group
  }, [])

  // Memoize lighting setup
  const lights = useMemo(() => {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 10)

    return { ambientLight, pointLight }
  }, [])

  // Memoized skill constellation creation
  const createSkillConstellation = useCallback((categoryIndex: number) => {
    if (!sceneRef.current) return

    // Clear existing nodes and connections
    skillNodesRef.current.forEach((node) => sceneRef.current!.remove(node))
    skillConnectionsRef.current.forEach((connection) => sceneRef.current!.remove(connection))
    skillNodesRef.current.length = 0
    skillConnectionsRef.current.length = 0

    const nodeCount = 8 + categoryIndex * 2
    const radius = 8

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const height = (Math.random() - 0.5) * 4

      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 8, 8),
        new THREE.MeshPhysicalMaterial({
          color: [0xffffff, 0xdddddd, 0xbbbbbb, 0x999999][categoryIndex],
          metalness: 0.8,
          roughness: 0.2,
          emissive: [0x222222, 0x333333, 0x444444, 0x555555][categoryIndex],
          emissiveIntensity: 0.5,
        }),
      )

      node.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)

      sceneRef.current.add(node)
      skillNodesRef.current.push(node)

      // Create connections to nearby nodes
      if (i > 0) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          skillNodesRef.current[i - 1].position,
          node.position,
        ])
        const line = new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color: [0xffffff, 0xdddddd, 0xbbbbbb, 0x999999][categoryIndex],
            transparent: true,
            opacity: 0.4,
          }),
        )
        sceneRef.current.add(line)
        skillConnectionsRef.current.push(line)
      }
    }

    // Connect last to first
    if (skillNodesRef.current.length > 1) {
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        skillNodesRef.current[skillNodesRef.current.length - 1].position,
        skillNodesRef.current[0].position,
      ])
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({
          color: [0xffffff, 0xdddddd, 0xbbbbbb, 0x999999][categoryIndex],
          transparent: true,
          opacity: 0.4,
        }),
      )
      sceneRef.current.add(line)
      skillConnectionsRef.current.push(line)
    }
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

    // Update morph shader
    if (morphSystem.material.uniforms) {
      morphSystem.material.uniforms.time.value = time
    }

    // Animate morph mesh
    morphSystem.mesh.rotation.x = time * 0.1
    morphSystem.mesh.rotation.y = time * 0.15
    morphSystem.mesh.rotation.z = time * 0.05

    // Animate skill nodes
    skillNodesRef.current.forEach((node, index) => {
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
    lights.pointLight.position.x = Math.sin(time) * 10
    lights.pointLight.position.z = Math.cos(time) * 10

    if (rendererRef.current && cameraRef.current) {
      rendererRef.current.render(scene, cameraRef.current)
    }
  }, [scene, morphSystem, streamGroup, lights])

  // Update category when activeCategory changes
  const updateCategory = useCallback(() => {
    const categoryMap: { [key: string]: number } = {
      "Full-Stack Development": 0,
      "UI/UX Design": 1,
      "Python Development": 2,
      "Cloud Computing": 3,
    }

    const categoryIndex = categoryMap[activeCategory || "Full-Stack Development"] || 0

    // Update shader uniform
    if (morphSystem.material.uniforms) {
      morphSystem.material.uniforms.category.value = categoryIndex
    }

    // Update skill constellation
    createSkillConstellation(categoryIndex)
  }, [activeCategory, morphSystem.material, createSkillConstellation])

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
    scene.add(morphSystem.mesh)
    scene.add(streamGroup)
    scene.add(lights.ambientLight)
    scene.add(lights.pointLight)

    // Initialize skill constellation
    createSkillConstellation(0)

    // Add event listeners
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Update category
    updateCategory()

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
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
    morphSystem,
    streamGroup,
    lights,
    createSkillConstellation,
    handleResize,
    animate,
    updateCategory,
  ])

  // Update category effect
  const categoryUpdateCallback = useCallback(() => {
    updateCategory()
  }, [updateCategory])

  // Initialize on mount
  const mountRefCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        mountRef.current = node
        const cleanup = initializeScene()

        // Update category when it changes
        categoryUpdateCallback()

        // Store cleanup for unmount
        return () => {
          if (cleanup) cleanup()
        }
      }
    },
    [initializeScene, categoryUpdateCallback],
  )

  return <div ref={mountRefCallback} className={className} />
}

export default ThreeSkillsBackground
