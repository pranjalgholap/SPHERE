
// Loading
const textureLoader = new THREE.TextureLoader()

const normalTextureEarth = textureLoader.load('./Earth.jpg')
const normalTextureSun = textureLoader.load('./Sun.jpg')

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const Sungeometry = new THREE.SphereBufferGeometry( .4, 64, 64);
const Earthgeometry = new THREE.SphereBufferGeometry( .2, 64, 64 );

// Materials

const Earthmaterial = new THREE.MeshStandardMaterial()
Earthmaterial.metalness = 0
Earthmaterial.roughness = 0.4
Earthmaterial.map = normalTextureEarth;

const Sunmaterial = new THREE.MeshStandardMaterial()
Sunmaterial.transparent = true
Sunmaterial.opacity = 0.9
Sunmaterial.metalness = 0
Sunmaterial.roughness = 0.3
Sunmaterial.map = normalTextureSun;

Sunmaterial.color = new THREE.Color(0xfff917)

// Mesh
const sphereEarth = new THREE.Mesh(Earthgeometry,Earthmaterial)
const sphereSun = new THREE.Mesh(Sungeometry,Sunmaterial)
scene.add(sphereSun)
sphereSun.add(sphereEarth)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 3)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Light 2
//const pointLight2 = new THREE.PointLight(0xff0000, 2)
//pointLight2.position.set(-1.86,1,-1.65)
//pointLight2.intensity = 10

//scene.add(pointLight2)

//const light1 = gui.addFolder('Light 1')

//light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
//light1.add(pointLight2.position, 'x').min(-6).max(3).step(0.01)
//light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
//light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

//const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
//scene.add(pointLightHelper)

// Light 3
//
//const pointLight3 = new THREE.PointLight(0xe1ff, 2)
//pointLight3.position.set(2.13, -3, -1.98)
//pointLight3.intensity = 6.8
//
//scene.add(pointLight3)
//
//const light2 = gui.addFolder('Light 2')
//
//light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
//light2.add(pointLight3.position, 'x').min(-6).max(3).step(0.01)
//light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
//light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)
//
//const light2Color = {
//    color: 0xff0000
//}
//
//light2.addColor(light2Color, 'color')
//    .onChange(() => {
//      pointLight3.color.set(light2Color.color)
// })
//
//const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
//scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphereSun.rotation.z = .5 * elapsedTime

    sphereSun.rotation.y += .5 * (targetX - sphereSun.rotation.y)
    sphereSun.rotation.x += .05 * (targetY - sphereSun.rotation.x)
    sphereSun.position.z += -.05 * (targetY - sphereSun.rotation.x)

    sphereEarth.position.y = -1
    sphereEarth.rotation.y = .5 * elapsedTime

    sphereEarth.rotation.y += .5 * (targetX - sphereEarth.rotation.y)
    sphereEarth.rotation.x += .05 * (targetY - sphereEarth.rotation.x)
    sphereEarth.position.z += -.05 * (targetY - sphereEarth.rotation.x)

    // Update Orbital Controls
    //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
