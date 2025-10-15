
Gibber.setBPM(100)

// PREP --------

Clock.bpm = 100
synthEffect = Freesound( 792947 )
introChords = Freesound( 687041 )
use( 'hydra' ).then( init => init() )

// VISUALS --------
osc( ()=> Math.random() * 50 ).out()

// BEGIN --------


// intro (0)
introChords.trigger(1)

// MISC ---------
  
// synth effect
synthEffect.trigger(1)

//BACKING ---------

function backingGain(lvl, time) {
  if (time == 0) {
    backing.gain = 0
    pad.gain = 0
  } else {
    backing.gain.fade(lvl, time)
    pad.gain.fade(lvl, time)
  }
}

// bus

backing = Bus2().connect()
backing.gain = 1

// rhythm
rhythm = Synth('square').disconnect()
rhythm.connect(backing)
rhythm.note.seq([0,0,2,2], 1/16)
rhythm.gain = 0.3

// strings (1.5)
pad = Synth[4]('stringPad').disconnect()
pad.connect(backing)
pad.chord.seq([[0,2,4,7],[3,5,7,10]], 2)
pad.gain = 0.4

// claude stuff kinda good (3)
bass = Synth('bass').disconnect()
bass.connect(backing)
bass.note.seq([0,3,5,2], 1/4)
bass.fx.add(Distortion())


// melody (2)
lead = Synth('lead').disconnect()
lead.connect(backing)
lead.note.seq([7,5,8,7,5,3,5,7], 1/8)

console.log(s.__out)

// drums

// (1)
drums = Drums().disconnect()
drums.connect(backing)
drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8', 0)
drums.tidal('[ch?0.3]*8', 1)
drums.tidal('<kd sd kd [oh,kd]> ch*2', 2)


// VISUALS ------

use('hydra').then(init => {
  init()     
  const scroll = 0.3
  voronoi(15, 5, 0.01 ) // scale, speed, gradient
    .modulateScrollY( osc( 10 ), scroll, 0 )
    .color( 3, 2, 23 )
    .repeat( 3.0, 3.0, 0.0, 0.0 )
    .rotate( 0.6 )
    .out(o0)
  // load cat image
  s0.initImage("https://static.vecteezy.com/system/resources/previews/047/308/861/non_2x/cat-jumping-up-in-the-air-on-transparent-background-free-png.png")
  // spin the cat in the center
  src(s0)
    .scale(0.5)           
    .rotate(() => time * 0.5)
    .out(o1)
  // show background + cat
  src(o0).layer(o1).out(o0)
})
