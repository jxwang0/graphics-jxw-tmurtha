/*
 * In this file you can specify all sort of initializers
 *  We provide an example of simple initializer that generates points withing a cube.
 */


function VoidInitializer ( opts ) {
    this._opts = opts;
    return this;
};

VoidInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

function MyInitializer ( opts ) {
    this._opts = opts;
    return this;
};


MyInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var pos = new THREE.Vector3(NaN,
                                     NaN,
                                     NaN);

/*        var z = (Math.random()- 0.5) * 2 * r;
        var phi = Math.random() * 2 * Math.PI;
        var d = Math.sqrt(r*r - z*z);
        pos.x = base_pos.x + d * Math.cos(phi);
        pos.y = base_pos.y + d * Math.sin(phi);
        pos.z = base_pos.z + z;*/


        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

MyInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        // just to get started, make the velocity the same as the initial position
        var pos = getElement( idx, positions );
        //var vel = pos.clone().multiplyScalar(5.0);
	//set initial velocity to zero;
        vel = new THREE.Vector3(0.0,0.0,0.0);x

        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

MyInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

MyInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

MyInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var lifetime = this._opts.lifetime;

        // ----------- STUDENT CODE END ------------
        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
MyInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};


};
////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function SphereInitializer ( opts ) {
    this._opts = opts;
    return this;
};

SphereInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var pos = new THREE.Vector3(NaN,
                                     NaN,
                                     NaN);

/*        var z = (Math.random()- 0.5) * 2 * r;
        var phi = Math.floor(2 * Math.random() * Math.PI);
        var d = Math.sqrt(r*r - z*z) * 1;
        pos.x = base_pos.x + d  * Math.cos(phi) ;
        pos.y = base_pos.y + d * Math.sin(phi);
        pos.z = base_pos.z;// + z;  */
	pos.x = Math.floor(Math.random() * 24) * 5 + 1;
	pos.y = 0;
	pos.z = Math.random() * 10;

        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

SphereInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        // just to get started, make the velocity the same as the initial position
        var pos = getElement( idx, positions );
//        var vel = pos.clone().multiplyScalar(5.0);
	var s = 100;//
	vel = new THREE.Vector3(0, s, 0);


        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

SphereInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

SphereInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;
	size = 3;
        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

SphereInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var lifetime = this._opts.lifetime;
	lifetime = 100;
        // ----------- STUDENT CODE END ------------
        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
SphereInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};



////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function FountainInitializer ( opts ) {
    this._opts = opts;
    return this;
};

FountainInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        var pos = new THREE.Vector3( 1.0 - 2.0 * Math.random(),
                                     base.y + 1.0 - 2.0 * Math.random(),
                                     1.0 - 2.0 * Math.random() );

        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

FountainInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel.clone();
        
        //Not quite correct: Adding horizontal variation
        vel.z += (Math.random() - 0.5)*base_vel.y/2;
        vel.x += (Math.random() - 0.5)*base_vel.y/2;
    
        

        //vel.x += Math.random()*vel.y;
        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

FountainInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

FountainInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

FountainInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
FountainInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};

////////////////////////////////////////////////////////////////////////////////
// Animation Initializer
////////////////////////////////////////////////////////////////////////////////

function AnimationInitializer ( opts ) {
    this._opts = opts;
    return this;
};

// this function gets the morphed position of an animated mesh.
// we recommend that you do not look too closely in here ;-)
AnimationInitializer.prototype.getMorphedMesh = function () {

     if ( ParticleEngine._meshes[0] !== undefined  && ParticleEngine._animations[0] !== undefined){

        var mesh       = ParticleEngine._meshes[0];

        var vertices   = [];
        var n_vertices = mesh.geometry.vertices.length;

        var faces      = ParticleEngine._meshes[0].geometry.faces;

        var morphInfluences = ParticleEngine._meshes[0].morphTargetInfluences;
        var morphs          = ParticleEngine._meshes[0].geometry.morphTargets;

        if ( morphs === undefined ) {
            return undefined;
        }
        for ( var i = 0 ; i < morphs.length ; ++i ) {

            if ( morphInfluences[i] !== 0.0 ) {
                for ( var j = 0 ; j < n_vertices ; ++j ) {
                    vertices[j] = new THREE.Vector3( 0.0, 0.0, 0.0 );
                    vertices[j].add ( morphs[i].vertices[j] );
                }
            }
        }
        return { vertices : vertices, faces : faces, scale: mesh.scale, position: mesh.position };

    } else {

        return undefined;

    }
}


AnimationInitializer.prototype.initializePositions = function ( positions, toSpawn, mesh ) {

    var base_pos = this._opts.position;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        // ----------- STUDENT CODE BEGIN ------------

        var p = base_pos.clone();
        faces = mesh.faces;
        var rand = Math.floor(Math.random() * faces.length);
        p = randomTrianglePoint(mesh, faces[rand]);

        p.multiplyScalar(1/4);
        setElement( i, positions, p );
        // ----------- STUDENT CODE END ------------

    }
    positions.needUpdate = true;
}

function randomTrianglePoint(mesh, face){

    var a = mesh.vertices[face.a].clone();
    var b = mesh.vertices[face.b].clone();
    var c = mesh.vertices[face.c].clone();

    var r1 = Math.random();
    var r2 = Math.random();

    var sqrR1 = Math.sqrt(r1);

    var p = a.addVectors(a.multiplyScalar(1 - sqrR1), b.multiplyScalar((1-r2)*sqrR1));
    p = p.add(c.multiplyScalar(r2*sqrR1));  

    return p;
}

AnimationInitializer.prototype.initializeVelocities = function ( velocities, toSpawn) {

    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel;

        setElement( idx, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
    velocities.needUpdate = true;
}

AnimationInitializer.prototype.initializeColors = function ( colors, toSpawn) {

    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        setElement( idx, colors, base_col );
        // ----------- STUDENT CODE END ------------
    }
    colors.needUpdate = true;
}

AnimationInitializer.prototype.initializeSizes = function ( sizes, toSpawn) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        setElement( idx, sizes, this._opts.size );
        // ----------- STUDENT CODE END ------------
    }
    sizes.needUpdate = true;
}

AnimationInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, lifetimes, this._opts.lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this function nicer to work with. This one is kinda ok, as for initialization
// everything is independent
AnimationInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    var mesh = this.getMorphedMesh();

    if ( mesh == undefined ){
        return;
    }

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn, mesh );

    this.initializeVelocities( particleAttributes.velocity, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );

};

////////////////////////////////////////////////////////////////////////////////
// Cloth
////////////////////////////////////////////////////////////////////////////////

function ClothInitializer ( opts ) {
    this._opts = opts;
    return this;
};

ClothInitializer.prototype.initializePositions = function ( positions, toSpawn, width, height ) {
    var base_pos = this._opts.position;
    var EPSILON = 0.0001;

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var w = idx % width;
        var h = Math.floor(idx / height);
        var grid_pos = new THREE.Vector3( 100.0 - w * 10, 0.0, 100.0 - h * 10 );
        var pos = grid_pos.add( base_pos );
        setElement( idx, positions, pos );
    }
    positions.needUpdate = true;
}

ClothInitializer.prototype.initializeVelocities = function ( velocities, toSpawn) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, velocities, base_vel  );
    }

    velocities.needUpdate = true;
}

ClothInitializer.prototype.initializeColors = function ( colors, toSpawn) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var col = base_col;
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

ClothInitializer.prototype.initializeSizes = function ( sizes, toSpawn) {
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, sizes, 1 );
    }
    sizes.needUpdate = true;
}

ClothInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn) {
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, lifetimes, Math.INFINITY );
    }
    lifetimes.needUpdate = true;
}


ClothInitializer.prototype.initialize = function ( particleAttributes, toSpawn, width, height ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn, width, height );

    this.initializeVelocities( particleAttributes.velocity, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );

    // mark normals to be updated
    particleAttributes["normal"].needsUpdate = true;

};
