


const textureLoader = new THREE.TextureLoader()

const sunTexture = textureLoader.load('./sun.jpg')
const earthTexture = textureLoader.load('./earth.jpg')
const jupiterTexture = textureLoader.load('./jupiter.jpg')
const saturnTexture = textureLoader.load('./saturn.jpg')
const mercuryTexture = textureLoader.load('./mercury.jpg')
const venusTexture = textureLoader.load('./venus.jpg')
const marsTexture = textureLoader.load('./mars.jpg')
const neptuneTexture = textureLoader.load('./neptune.jpg')
const saturnringTexture = textureLoader.load('./saturn ring.png')
const uranusTexture = textureLoader.load('./uranus.jpg')

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const sungeometry = new THREE.SphereBufferGeometry(.9, 64, 64)
const earthgeometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const mercurygeometry = new THREE.SphereBufferGeometry(.2, 64, 64)
const venusgeometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const marsgeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const jupitergeometry = new THREE.SphereBufferGeometry(.6, 64, 64)
const saturngeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const uranusgeometry = new THREE.SphereBufferGeometry(.45, 64, 64)
const nNeptunegeometry = new THREE.SphereBufferGeometry(.4, 64, 64)
const saturnringgeometry = new THREE.RingBufferGeometry(.5, .7, 60)

// Materials

const sunmaterial = new THREE.MeshStandardMaterial()
sunmaterial.transparent = true
sunmaterial.opacity = 0.9
sunmaterial.metalness = 0
sunmaterial.roughness = 0.3
sunmaterial.map = sunTexture;
sunmaterial.color = new THREE.Color( 0xfff917 )

const earthmaterial = new THREE.MeshStandardMaterial()
earthmaterial.roughness = 0.3
earthmaterial.opacity = 0.9
earthmaterial.map = earthTexture;
const earth = new THREE.Mesh(earthgeometry,earthmaterial)

const mercurymaterial = new THREE.MeshStandardMaterial()
mercurymaterial.roughness = 0.3
mercurymaterial.opacity = 0.9
mercurymaterial.map = mercuryTexture
const mercury = new THREE.Mesh(mercurygeometry,mercurymaterial)

const venusmaterial = new THREE.MeshStandardMaterial()
venusmaterial.roughness = 0.3
venusmaterial.opacity = 0.9
venusmaterial.map = venusTexture
const venus = new THREE.Mesh(venusgeometry,venusmaterial)

const jupitermaterial = new THREE.MeshStandardMaterial()
jupitermaterial.roughness = 0.3
jupitermaterial.opacity = 0.9
jupitermaterial.map = jupiterTexture
const jupiter = new THREE.Mesh(jupitergeometry,jupitermaterial)

const uranusmaterial = new THREE.MeshStandardMaterial()
uranusmaterial.roughness = 0.3
uranusmaterial.opacity = 0.9
uranusmaterial.map = uranusTexture
const uranus = new THREE.Mesh(uranusgeometry,uranusmaterial)

const neptunematerial = new THREE.MeshStandardMaterial()
neptunematerial.roughness = 0.3
neptunematerial.opacity = 0.9
neptunematerial.map = neptuneTexture
const neptune = new THREE.Mesh(neptunegeometry,neptunematerial)

const saturnringMaterial = new THREE.MeshBasicMaterial()
saturnringMaterial.map = saturnringTexture
const saturnring = new THREE.Mesh(saturnringgeometry,saturnringMaterial)

const marsmaterial = new THREE.MeshStandardMaterial()
marsmaterial.roughness = 0.3
marsmaterial.opacity = 0.9
marsmaterial.map = marsTexture
const mars = new THREE.Mesh(marsgeometry,marsmaterial)

const satrunMaterial = new THREE.MeshStandardMaterial()
satrunMaterial.roughness = 0.3
satrunMaterial.opacity = 0.9
satrunMaterial.map = saturnTexture
const saturn = new THREE.Mesh(saturngeometry,satrunMaterial)


// Mesh
const sun = new THREE.Mesh(Sungeometry,Sunmaterial)
scene.add(sun)
scene.add(earth)
scene.add(saturn)
saturn.add(saturnring)
scene.add(mercury)
scene.add(venus)
scene.add(mars)
scene.add(jupiter)
scene.add(uranus)
scene.add(neptune)

const loader = new THREE.TextureLoader();
scene.background = loader.load('./stars.jpg' , function(texture)
            {
             scene.background = texture;  
            });


const pointLight = new THREE.PointLight(0xffffff, 2)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

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
camera.position.z = 10
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

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
    mercury.position.y = window.scrollY * .001
    venus.position.y = window.scrollY * .001
    earth.position.y = window.scrollY * .001
    mars.position.y = window.scrollY * .001
    jupiter.position.y = window.scrollY * .001
    saturn.position.y = window.scrollY * .001
    uranus.position.y = window.scrollY * .001
    neptune.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sun.rotation.z = 0.5 * elapsedTime

    sun.rotation.y += .5 * (targetX - sun.rotation.y)
    sun.rotation.x += .05 * (targetY - sun.rotation.x)
    sun.position.z += -.05 * (targetY - sun.rotation.x)
            
    earth.rotation.z = 1 * elapsedTime
    earth.rotation.y += .05 * (targetX - earth.rotation.y)
    earth.rotation.x += .05 * (targetY - earth.rotation.x)
    earth.position.z += -.05 * (targetY - earth.rotation.x)
            
    mercury.rotation.z = 1 * elapsedTime
    mercury.rotation.y += .05 * (targetX - earth.rotation.y)
    mercury.rotation.x += .05 * (targetY - earth.rotation.x)
    mercury.position.z += -.05 * (targetY - earth.rotation.x)
            
    venus.rotation.z = 1 * elapsedTime
    venus.rotation.y += .05 * (targetX - earth.rotation.y)
    venus.rotation.x += .05 * (targetY - earth.rotation.x)
    venus.position.z += -.05 * (targetY - earth.rotation.x)
            
    mars.rotation.z = 1 * elapsedTime
    mars.rotation.y += .05 * (targetX - earth.rotation.y)
    mars.rotation.x += .05 * (targetY - earth.rotation.x)
    mars.position.z += -.05 * (targetY - earth.rotation.x)
            
    jupiter.rotation.z = 1 * elapsedTime
    jupiter.rotation.y += .05 * (targetX - earth.rotation.y)
    jupiter.rotation.x += .05 * (targetY - earth.rotation.x)
    jupiter.position.z += -.05 * (targetY - earth.rotation.x)
 
    saturn.rotation.z = 1 * elapsedTime
    saturn.rotation.y += .05 * (targetX - earth.rotation.y)
    saturn.rotation.x += .05 * (targetY - earth.rotation.x)
    saturn.position.z += -.05 * (targetY - earth.rotation.x)
            
    uranus.rotation.z = 1 * elapsedTime
    uranus.rotation.y += .05 * (targetX - earth.rotation.y)
    uranus.rotation.x += .05 * (targetY - earth.rotation.x)
    uranus.position.z += -.05 * (targetY - earth.rotation.x)
            
    neptune.rotation.z = 1 * elapsedTime
    neptune.rotation.y += .05 * (targetX - earth.rotation.y)
    neptune.rotation.x += .05 * (targetY - earth.rotation.x)
    neptune.position.z += -.05 * (targetY - earth.rotation.x)

    const rotationOfMercury = Date.now() * 0.0010;
    mercury.position.x = 2 * Math.cos(rotationOfMercury)
    mercury.position.y = 1 * Math.sin(rotationOfMercury)

    const rotationOfVenus = Date.now() * 0.0009;
    venus.position.x = 3 * Math.cos(rotationOfVenus)
    venus.position.y = 1.5 * Math.sin(rotationOfVenus)
            
   
    const rotationOfEarth = Date.now() * 0.0008;
    earth.position.x = 4.5 * Math.cos(rotationOfEarth)
    earth.position.y = 2 * Math.sin(rotationOfEarth)

    const rotationOfMars = Date.now() * 0.0007;
    mars.position.x = 5.5 * Math.cos(rotationOfMars)
    mars.position.y = 3.1 * Math.sin(rotationOfMars)

    const rotationOfJupiter = Date.now() * 0.0006;
    jupiter.position.x = 6.5 * Math.cos(rotationOfJupiter)
    jupiter.position.y = 3.8 * Math.sin(rotationOfJupiter)

    const rotationOfSaturn = Date.now() * 0.0005;
    saturn.position.x = 7.5 * Math.cos(rotationOfSaturn)
    saturn.position.y = 5 * Math.sin(rotationOfSaturn)

    const rotationOfUranus = Date.now() * 0.0004;
    uranus.position.x = 8.5 * Math.cos(rotationOfUranus)
    uranus.position.y = 5.5 * Math.sin(rotationOfUranus)

    const rotationOfNeptune = Date.now() * 0.0003;
    neptune.position.x = 9.2 * Math.cos(rotationOfNeptune)
    neptune.position.y = 6.2 * Math.sin(rotationOfNeptune)
    
    // Update Orbital Controls
    // controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
