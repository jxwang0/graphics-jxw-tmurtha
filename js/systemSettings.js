var SystemSettings = SystemSettings || {};
var num_particles = 20;
var velocity = 127;
var speed = 2; //Bigger is Slower
var concavity = 1;




SystemSettings.standardMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/blank.png' ) },
    },

    attributes: {   
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

////////////////////////////////////////////////////////////////////////////////
// Basic system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.basic = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere: new THREE.Vector4 ( 0.0, 0.0, 0.0, 10.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 7,
        size:     6.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [],
        },
        collidables: {},
    },

    // Scene
    maxParticles :  num_particles,
    particlesFreq : 200000,
    createScene : function () {},
};


////////////////////////////////////////////////////////////////////////////////
// Attractor system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.attractor = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
     initializerSettings : {
	 sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 5.0),
	 color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
	 velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
	 lifetime: 7,
	 size:     6.0,
     },

     // Update
     updaterFunction : EulerUpdater,
     updaterSettings : {
	 externalForces : {
	     gravity :     new THREE.Vector3( 0, 0, 0),
	     attractors : [ new THREE.Sphere( new THREE.Vector3(30.0, 30.0, 30.0), 1500.0 ) ],
	 },
	 collidables: {},
     },

     // Scene
     maxParticles :  10000,
     particlesFreq : 1000,
     createScene : function () {
	 var sphere_geo = new THREE.SphereGeometry( 1.0, 32, 32 );
	 var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );
	 var sphere = new THREE.Mesh( sphere_geo, phong )

	 sphere.position.set (30.0, 30.0, 30.0);
	 Scene.addObject( sphere );
     },
 };

 ////////////////////////////////////////////////////////////////////////////////
 // Horse animation
 ////////////////////////////////////////////////////////////////////////////////

 SystemSettings.animated = {

     // Particle Material
     particleMaterial :  SystemSettings.standardMaterial,

     // Initializer
     initializerFunction : AnimationInitializer,
     initializerSettings : {
	 position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
	 color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
	 velocity: new THREE.Vector3 ( 0.0, 0.0, -40.0),
	 lifetime: 1.25,
	 size:     2.0,
     },

     // Updater
     updaterFunction : EulerUpdater,
     updaterSettings : {
	 externalForces : {
	     gravity :     new THREE.Vector3( 0, 0, 0),
	     attractors : [],
	 },
	 collidables: {
	     bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
	 },
     },

     // Scene
     maxParticles:  20000,
     particlesFreq: 10000,
     createScene : function () {
	 var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
	 var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x444444, side: THREE.DoubleSide } );
	 var plane = new THREE.Mesh( plane_geo, phong );
	 plane.rotation.x = -1.57;
	 plane.position.y = 0;

	 Scene.addObject( plane );
     },

     // Animation
     animatedModelName: "animated_models/horse.js",
     animationLoadFunction : function( geometry ) {

	 mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true, transparent:true, opacity:0.5 } ) );
	 mesh.scale.set( 0.25, 0.25, 0.25 );
	 // mesh.position.set( 0.0, 30.0, 0.0 );
	 Scene.addObject( mesh );
	 ParticleEngine.addMesh( mesh );

	 ParticleEngine.addAnimation( new THREE.MorphAnimation( mesh ) );
     },

 };


 ////////////////////////////////////////////////////////////////////////////////
 // Cloth
 ////////////////////////////////////////////////////////////////////////////////

 SystemSettings.cloth = {

     // Particle Material
     particleMaterial :  new THREE.MeshLambertMaterial( { color:0xff0000, side: THREE.DoubleSide  } ),

     // Initializer
     initializerFunction : ClothInitializer,
     initializerSettings : {
	 position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
	 color:    new THREE.Vector4 ( 1.0, 0.0, 0.0, 1.0 ),
	 velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
     },

     // Updater
     updaterFunction : ClothUpdater,
     updaterSettings : {
	 externalForces : {
	     gravity :     new THREE.Vector3( 0, -10.0, 0),
	     attractors : [],
	 },
	 collidables: {
	     bounceSpheres: [ {sphere : new THREE.Vector4( 0, 0, 0, 52.0 ), damping : 0.0 } ],
	 },
     },

     // Scene
     maxParticles:  400,
     particlesFreq: 1000,
     createScene : function () {
	 var sphere_geo = new THREE.SphereGeometry( 50.0, 32, 32 );
	 var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );

	 Scene.addObject( new THREE.Mesh( sphere_geo, phong ) );

     },

     // Cloth specific settings
     cloth : true,
     width : 20,
     height : 20,
 };


 var RAD = 8000;

 ////////////////////////////////////////////////////////////////////////////////
 // My System
 ////////////////////////////////////////////////////////////////////////////////

 SystemSettings.mySystem = {

     // Particle material
     particleMaterial : SystemSettings.standardMaterial,

     // Initialization
     initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere: new THREE.Vector4 ( 0.0, 0.0, 0.0, 100.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        lifetime: 6,
        size:     2.5,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0.0, 0),
            attractors : [ ], 

        },
        collidables: {}, 
    },

    // Scene
    maxParticles :  16,
    particlesFreq : 1000,
    createScene : function () {

        var sphere_geo = new THREE.SphereGeometry( 1.0, 32, 32 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );
        var sphere = new THREE.Mesh( sphere_geo, phong )

        sphere.position.set (300.0, 300.0, 300.0);
        Scene.addObject( sphere );

        sphere.position.set (-300.0, 300.0, 300.0);
        Scene.addObject( sphere );


    },

};
