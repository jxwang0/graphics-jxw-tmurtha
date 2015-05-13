/*
 * In this file you can specify all sort of updaters
 *  We provide an example of simple updater that updates pixel positions based on initial velocity and gravity
 */

////////////////////////////////////////////////////////////////////////////////
// Collisions
////////////////////////////////////////////////////////////////////////////////

var EPSILON = 0.01;
var Collisions = Collisions || {};
var num_points;
var MAX_NOTE = 109; //Maximum note size in MIDI Format

function initializeMIDI ()
{

    MIDI.loadPlugin({
                soundfontUrl: "./soundfont/",
                instrument: "acoustic_grand_piano",
                onprogress: function(state, progress) {
                    console.log(state, progress);
                },
                onsuccess: function() {
                    var myCanvas = document.getElementById('canvas');
                    console.log("Line 30");
                    var delay = 0; // play one note every quarter second
                    var note = 50; // the MIDI note
                    var velocity = 127; // how hard the note hits
                    // play the note
                    MIDI.setVolume(0, 127);
                    //MIDI.noteOn(0, note, velocity, delay);
                    //MIDI.noteOff(0, note, delay + 0.75);
                }
        });     
}

////////////////////////////////////////////////////////////////////////////////
// Null updater - does nothing
////////////////////////////////////////////////////////////////////////////////

function VoidUpdater ( opts ) {
    this._opts = opts;
    return this;
};

VoidUpdater.prototype.update = function ( particleAttributes, initialized, delta_t ) {
    //do nothing
};

////////////////////////////////////////////////////////////////////////////////
// Euler updater
////////////////////////////////////////////////////////////////////////////////

function EulerUpdater ( opts ) {
    this._opts = opts;
    return this;
};

function playTone () {
    var delay = 0; // play one note every quarter second
    var note = 50; // the MIDI note
    var velocity = 127; // how hard the note hits
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, note, velocity, delay);
    MIDI.noteOff(0, note, delay + 0.75);

}; 

// Works best when i spans from 0 to 48
// NOTE FOR USER: MAXIMUM MIDI NOTE IS 88 + 21 = 109
function playTone ( i ) {
    var delay = 0; // play one note every quarter second
    var note = 50; // the MIDI note
    var velocity = 127; // how hard the note hits
    MIDI.setVolume(0, 127);
    MIDI.noteOn(0, i + 21, 100, 0);
    MIDI.noteOn(0, i + 21 + 36, 100, 0);

    MIDI.noteOff(0, i + 21, 0.1);
    MIDI.noteOff(0, i + 21 + 36, 0.1);

}; 
EulerUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var lifetimes = particleAttributes.lifetime;
    var playeds = particleAttributes.played;
    var colors = particleAttributes.color;
    var sizes = particleAttributes.size;
    var isWhites = particleAttributes.isWhite;

    num_particles = alive.length;
    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        var l = getElement( i, lifetimes );
        var pl = getElement(i, playeds);
        var c = getElement(i , colors);
        var s = getElement(i, sizes);
        var w = getElement(i, isWhites);

	//radius
	var r = Math.round(Math.sqrt((p.x * p.x) + (p.y * p.y)));
	//scale speed as a function of proximity to center

     

	var s = ((num_points * 3) - r) * 3 /( num_points * 2);
	var speed = Math.sqrt(num_points) / 12;
	//x and y as a function of timex
	var x = Math.cos((1000 - l) * s);   
	var y = Math.sin((1000 - l) * s);
    if (!pl && x > 0 && y > 0  )
    {
            playTone(r % MAX_NOTE);
            setElement(i, playeds, true);
            setElement(i, isWhites, true);

    }

    if (pl && x < 0)
    {
        setElement(i, playeds, false);
        setElement(i, isWhites, false);
    }
	//position on circle * distance from center
	p.x = x * r;
	p.y = y * r;
//        p.add( v.clone().multiplyScalar( delta_t ) );
        setElement( i, positions, p );
    }
};

EulerUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var attractors = this._opts.externalForces.attractors;

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var v = getElement( i, velocities );
	setElement( i, velocities, v );

        // ----------- STUDENT CODE END ------------
    }

};
EulerUpdater.prototype.updateColors = function ( particleAttributes, alive, delta_t ) {
    var colors    = particleAttributes.color;
    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var c = getElement( i, colors ).clone();
	/*
        c.x =  (c.x + 0.0013) % 1;
        c.y =  (c.y + 0.0017) % 1;
        c.z =  (c.z + 0.0023) % 1;
*/
	

        setElement( i, colors, c );
        // ----------- STUDENT CODE END ------------
    }
};

EulerUpdater.prototype.updateSizes= function ( particleAttributes, alive, delta_t ) {
    var sizes    = particleAttributes.size;
    var colors = particleAttributes.color;
    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var s = getElement( i, sizes );

        //c = getElement(i, colors);
        //s = (c.x + c.y + c.z)/3 * 10


        setElement( i, sizes, s );
        // ----------- STUDENT CODE END ------------
    }

};

EulerUpdater.prototype.updateLifetimes = function ( particleAttributes, alive, delta_t) {
    var positions     = particleAttributes.position;
    var lifetimes     = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;

        var lifetime = getElement( i, lifetimes );

        if ( lifetime < 0 ) {
            killPartilce( i, particleAttributes, alive );
        } else {
            setElement( i, lifetimes, lifetime - delta_t );
        }
    }

};

EulerUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    if ( this._opts.collidables.bouncePlanes ) {
        for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
            var plane = this._opts.collidables.bouncePlanes[i].plane;
            var damping = this._opts.collidables.bouncePlanes[i].damping;
            Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
        }
    }

    if ( this._opts.collidables.sinkPlanes ) {
        for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
            var plane = this._opts.collidables.sinkPlanes[i].plane;
            Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
        }
    }

    if ( this._opts.collidables.spheres ) {
        for (var i = 0 ; i < this._opts.collidables.spheres.length ; ++i ) {
            Collisions.Sphere( particleAttributes, alive, delta_t, this._opts.collidables.spheres[i] );
        }
    }
};

EulerUpdater.prototype.update = function ( particleAttributes, alive, delta_t ) {

    this.updateLifetimes( particleAttributes, alive, delta_t );
    this.updateVelocities( particleAttributes, alive, delta_t );
    this.updatePositions( particleAttributes, alive, delta_t );

    this.collisions( particleAttributes, alive, delta_t );

    this.updateColors( particleAttributes, alive, delta_t );
    this.updateSizes( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;

}

