"use client"

import { useEffect, useState, useCallback } from "react"
import * as THREE from "three"

interface ThreeSkillsBackgroundProps {
  className?: string
  activeCategory?: string
}

const ThreeSkillsBackground = ({ className, activeCategory }: ThreeSkillsBackgroundProps) => {
  const [mountElement, setMountElement] = useState<HTMLDivElement | null>(null)
  const [scene, setScene] = useState<THREE.Scene | null>(null)
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
  const [animationFrame, setAnimationFrame] = useState<number | null>(null)

  if(false){
    console.log(mountElement, scene, renderer, camera, animationFrame, activeCategory)
  }
  // Callback ref for mount element
  const mountRef = useCallback((node: HTMLDivElement | null) => {
    setMountElement(node)
  }, [])

  useEffect(() => {
    if (!mountElement) return

    // Dynamic import of Three.js to avoid SSR issues
    const initThreeJS = async () => {
      const THREE = await import("three")

      // Scene setup
      const newScene = new THREE.Scene()
      setScene(newScene)

      // Camera setup
      const newCamera = new THREE.PerspectiveCamera(75, mountElement.clientWidth / mountElement.clientHeight, 0.1, 1000)
      newCamera.position.z = 20
      setCamera(newCamera)

      // Renderer setup
      const newRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
      newRenderer.setSize(mountElement.clientWidth, mountElement.clientHeight)
      newRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      setRenderer(newRenderer)

      mountElement.appendChild(newRenderer.domElement)

      // Create morphing geometry - now in black and white
      const morphGeometry = new THREE.IcosahedronGeometry(3, 2)
      const morphMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          category: { value: 0 },
          color1: { value: new THREE.Color(0xffffff) }, // White
          color2: { value: new THREE.Color(0xdddddd) }, // Light gray
          color3: { value: new THREE.Color(0xbbbbbb) }, // Medium gray
          color4: { value: new THREE.Color(0x999999) }, // Dark gray
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
      newScene.add(morphMesh)

      // Create skill nodes constellation - now in black and white
      const skillNodes: THREE.Mesh[] = []
      const skillConnections: THREE.Line[] = []

      const createSkillConstellation = (categoryIndex: number) => {
        // Clear existing nodes and connections
        skillNodes.forEach((node) => newScene.remove(node))
        skillConnections.forEach((connection) => newScene.remove(connection))
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
              color: [0xffffff, 0xdddddd, 0xbbbbbb, 0x999999][categoryIndex], // Grayscale colors
              metalness: 0.8,
              roughness: 0.2,
              emissive: [0x222222, 0x333333, 0x444444, 0x555555][categoryIndex], // Grayscale emissive
              emissiveIntensity: 0.5,
            }),
          )

          node.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius)

          newScene.add(node)
          skillNodes.push(node)

          // Create connections to nearby nodes
          if (i > 0) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([skillNodes[i - 1].position, node.position])
            const line = new THREE.Line(
              lineGeometry,
              new THREE.LineBasicMaterial({
                color: [0xffffff, 0xdddddd, 0xbbbbbb, 0x999999][categoryIndex], // Grayscale colors
                transparent: true,
                opacity: 0.4,
              }),
            )
            newScene.add(line)
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
              color: [0xffffff, 0xdddddd, 0xbbbbbb, 0x999999][categoryIndex], // Grayscale colors
              transparent: true,
              opacity: 0.4,
            }),
          )
          newScene.add(line)
          skillConnections.push(line)
        }
      }

      // Initialize with first category
      createSkillConstellation(0)

      // Holographic data streams - now in black and white
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
            color: 0xffffff, // White
            transparent: true,
            opacity: 0.3,
          }),
        )

        streamGroup.add(stream)
      }

      newScene.add(streamGroup)

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
      newScene.add(ambientLight)

      const pointLight = new THREE.PointLight(0xffffff, 1, 100) // White light
      pointLight.position.set(0, 0, 10)
      newScene.add(pointLight)

      // Animation loop
      const animate = () => {
        const frameId = requestAnimationFrame(animate)
        setAnimationFrame(frameId)

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

        newRenderer.render(newScene, newCamera)
      }

      animate()

      // Handle resize
      const handleResize = () => {
        if (!mountElement || !newCamera || !newRenderer) return

        newCamera.aspect = mountElement.clientWidth / mountElement.clientHeight
        newCamera.updateProjectionMatrix()
        newRenderer.setSize(mountElement.clientWidth, mountElement.clientHeight)
      }

      window.addEventListener("resize", handleResize)

      // Store cleanup function
      return () => {
        window.removeEventListener("resize", handleResize)

        if (mountElement && newRenderer.domElement && mountElement.contains(newRenderer.domElement)) {
          mountElement.removeChild(newRenderer.domElement)
        }

        newRenderer.dispose()
      }
    }

    let cleanup: (() => void) | undefined

    initThreeJS()
      .then((cleanupFn) => {
        cleanup = cleanupFn
      })
      .catch(console.error)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      if (cleanup) cleanup()
    }
  }, [mountElement, animationFrame])

  // Update category when activeCategory changes
  useEffect(() => {
    if (scene) {
      const categoryMap: { [key: string]: number } = {
        "Full-Stack Development": 0,
        "UI/UX Design": 1,
        "Python Development": 2,
        "Cloud Computing": 3,
      }

      const categoryIndex = categoryMap[activeCategory || "Full-Stack Development"] || 0

      // Update shader uniform
      const morphMesh = scene.children.find((child: THREE.Object3D) => child instanceof THREE.Mesh)
      if (morphMesh && morphMesh.material && (morphMesh.material as THREE.ShaderMaterial).uniforms) {
        ;(morphMesh.material as THREE.ShaderMaterial).uniforms.category.value = categoryIndex
      }
    }
  }, [activeCategory, scene])

  return <div ref={mountRef} className={className} />
}

export default ThreeSkillsBackground
