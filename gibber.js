
// PREP --------

Clock.bpm = 100
synthEffect = Freesound( 792947 )
introChords = Freesound( 687041 )

// BUS ---------

fadeIn = Bus()
fadeIn.gain(0)
fadeIn.gain.fade(0.8, 4)

// BEGIN --------

// intro (0)
introChords.trigger(1)

// rhythm (1)
rhythm = Synth('square')
rhythm.note.seq([0,0,2,2], 1/16)
rhythm.gain = 0.3

// strings (1.5)
pad = Synth[4]('stringPad')
pad.chord.seq([[0,2,4,7],[3,5,7,10]], 2)
pad.gain = 0.4


// LAYERS ---------

// claude stuff kinda good (3)
bass = Synth('bass').note.seq([0,3,5,2], 1/4)
bass.fx.add(Distortion())


// melody (2)
lead = Synth('lead')
lead.note.seq([7,5,8,7,5,3,5,7], 1/8)

// MISC ---------
  
// synth effect
synthEffect.trigger(1)

// DRUMS ---------

// (1)
drums = Drums()
drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8')
drums.tidal('[ch?0.3]*8')

// (2)
drums2 = Drums()
drums2.tidal('<kd sd kd [oh,kd]> ch*2')



