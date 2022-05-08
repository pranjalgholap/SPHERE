const textureLoader = new THREE.TextureLoader()

const sunTexture = textureLoader.load('./sun.jpg')
const mercuryTexture = textureLoader.load('./mercury.jpg')
const venusTexture = textureLoader.load('./venus.jpg')
const earthTexture = textureLoader.load('./earth.jpg')
const marsTexture = textureLoader.load('./mars.jpg')
const jupiterTexture = textureLoader.load('./jupiter.jpg')
const saturnTexture = textureLoader.load('./saturn.jpg')
const saturnringTexture = textureLoader.load('./saturn ring.png')
const uranusTexture = textureLoader.load('./uranus.jpg')
const neptuneTexture = textureLoader.load('./neptune.jpg')
const plutoTexture = textureLoader.load('./pluto.jpg')

const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const sun_geo = new THREE.SphereBufferGeometry(.9, 64, 64)
const mercury_geo = new THREE.SphereBufferGeometry(.2, 64, 64)
const venus_geo = new THREE.SphereBufferGeometry(.5, 64, 64)
const earth_geo = new THREE.SphereBufferGeometry(.5, 64, 64)
const mars_geo = new THREE.SphereBufferGeometry(.4, 64, 64)
const jupiter_geo = new THREE.SphereBufferGeometry(.6, 64, 64)
const saturn_geo = new THREE.SphereBufferGeometry(.4, 64, 64)
const saturnring_geo = new THREE.SphereBufferGeometry(.5, 0.7, 60)
const uranus_geo = new THREE.SphereBufferGeometry(.45, 64, 64)
const neptune_geo = new THREE.RingBufferGeometry(.4, 64, 64)
const pluto_geo = new THREE.RingBufferGeometry(.2, 64, 64)

// Materials

const sun_mat = new THREE.MeshStandardMaterial()
sun_mat.transparent = true
sun_mat.opacity = 0.9
sun_mat.metalness = 0
sun_mat.roughness = 0.3
sun_mat.map = sunTexture;
sun_mat.color = new THREE.Color( 0xfff917 )

const mercury_mat = new THREE.MeshStandardMaterial()
mercury_mat.roughness = 0.3
mercury_mat.opacity = 0.9
mercury_mat.map = mercuryTexture
const mercury = new THREE.Mesh(mercury_geo,mercury_mat)

const venus_mat = new THREE.MeshStandardMaterial()
venus_mat.roughness = 0.3
venus_mat.opacity = 0.9
venus_mat.map = venusTexture
const venus = new THREE.Mesh(venus_geo,venus_mat)

const earth_mat = new THREE.MeshStandardMaterial()
earth_mat.roughness = 0.3
earth_mat.opacity = 0.9
earth_mat.map = earthTexture;
const earth = new THREE.Mesh(earth_geo,earth_mat)

const mars_mat = new THREE.MeshStandardMaterial()
mars_mat.roughness = 0.3
mars_mat.opacity = 0.9
mars_mat.map = marsTexture
const mars = new THREE.Mesh(mars_geo,mars_mat)

const jupiter_mat = new THREE.MeshStandardMaterial()
jupiter_mat.roughness = 0.3
jupiter_mat.opacity = 0.9
jupiter_mat.map = jupiterTexture
const jupiter = new THREE.Mesh(jupiter_geo,jupiter_mat)

const saturn_mat = new THREE.MeshStandardMaterial()
saturn_mat.opacity = 0.9
saturn_mat.roughness = 0.3
saturn_mat.map = saturnTexture
const saturn = new THREE.Mesh(saturn_geo,saturn_mat)

const saturnring_mat = new THREE.MeshBasicMaterial()
saturnring_mat.map = saturnringTexture
const saturnring = new THREE.Mesh(saturnring_geo,saturnring_mat)

const uranus_mat = new THREE.MeshStandardMaterial()
uranus_mat.roughness = 0.3
uranus_mat.opacity = 0.9
uranus_mat.map = uranusTexture
const uranus = new THREE.Mesh(uranus_geo,uranus_mat)

const neptune_mat = new THREE.MeshStandardMaterial()
neptune_mat.roughness = 0.3
neptune_mat.opacity = 0.9
neptune_mat.map = neptuneTexture
const neptune = new THREE.Mesh(neptune_geo,neptune_mat)

const pluto_mat = new THREE.MeshStandardMaterial()
pluto_mat.roughness = 0.3
pluto_mat.opacity = 0.9
pluto_mat.map = plutoTexture
const pluto = new THREE.Mesh(pluto_geo,pluto_mat)

// Mesh
const sun = new THREE.Mesh(sun_geo,sun_mat)
scene.add(sun)
scene.add(mercury)
scene.add(venus)
scene.add(earth)
scene.add(mars)
scene.add(jupiter)
scene.add(saturn)
saturn.add(saturnring)
scene.add(uranus)
scene.add(neptune)
scene.add(pluto)

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
    pluto.position.y = window.scrollY * .001
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
    
    pluto.rotation.z = 1 * elapsedTime
    pluto.rotation.y += .05 * (targetX - earth.rotation.y)
    pluto.rotation.x += .05 * (targetY - earth.rotation.x)
    pluto.position.z += -.05 * (targetY - earth.rotation.x)

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
    
    const rotationOfPluto = Date.now() * 0.0002;
    pluto.position.x = 10 * Math.cos(rotationOfPluto)
    pluto.position.y = 7 * Math.sin(rotationOfPluto)
    
    // Update Orbital Controls
    // controls.update()
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
