// ---------------------------------------------------------
// PREP
// ---------------------------------------------------------

introChords = Freesound(687041)

// ---------------------------------------------------------
// VISUALS
// ---------------------------------------------------------

use('hydra').then(init => init())

// track overall loudness
amp = Follow(master, 1024)
amp.smooth = 0.9 // smooths rapid amplitude changes

// make amplitude available globally
window.ampVal = 0
setInterval(() => { window.ampVal = amp.getValue() }, 20)

osc(1.5, 1.25)
  .mult(shape(1, 0.09).rotate(1.5))
  .diff(gradient())
  .add(shape(2, 2).blend(gradient(1)))
  .modulate(noise().modulate(noise().scrollY(1, 0.0625)))
  .blend(o0)
  .color(
    () => 1 + window.ampVal * 2,
    () => 1 - window.ampVal * 3,
    () => 1 - window.ampVal * 4
  )
  .rotate(() => time * (0.2 + window.ampVal * 3))
  .scale(() => 1 + window.ampVal * 0.5)
  .out(o0)


// ---------------------------------------------------------
// INTRO
// ---------------------------------------------------------

filter = Filter()
introChords.fx.add(filter)

introChords.trigger(1)

filter.filterMode = 1
filter.cutoff = 1
filter.cutoff.fade(1, 0, 7) // Fade out intro at 5s

// ---------------------------------------------------------
// DRUMS (play as intro fades out, approx 50%)
// ---------------------------------------------------------

drums = Drums()
drums.gain = 0.8
drums.lowpass = 0.9

drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8', 0)
drums.tidal('[ch?0.3]*8', 1)
drums.tidal('<kd sd kd [oh,kd]> ch*2', 2)

// ---------------------------------------------------------
// PART 1
// ---------------------------------------------------------

// --- LEAD SYNTH ---

lead = Synth('lead')
//
lead.waveform = 'sine'
lead.useADSR = true
lead.attack  = 1/8
lead.decay   = 1/4
lead.sustain = 1/2
lead.release = 1/2
//
lead.filterType = 3
lead.filterMode = 0
lead.cutoff = 0.25 
lead.Q = 0.2      
lead.filterMult = 1.2  
//
lead.gain = 0
lead.note.seq([7, 5, 8, 7, 5, 3, 5, 7], 1/8)

lead.gain.fade(0, 0.2)// Fade in when intro is 75% out


// --- BASS ---

bass = Synth('bass')
//
bass.sustain = 0.8
bass.cutoff = 0.3
bass.octave = -2
//
bass.gain = 0.9
bass.note.seq([0, 3, 5, 2], 1/4) // wait until lead synth is at 100% volume

// wait 15s

lead.gain.fade(0.2,0) 

// wait until lead synth is 75% out

// --- RHYTHM ---
rhythm = Synth('square')
rhythm.gain = 0.4
rhythm.waveform = 'triangle'
rhythm.attack = 1/16; rhythm.release = 1/8
rhythm.cutoff = 0.3; rhythm.Q = 0.2; rhythm.filterMult = 1
rhythm.note.seq([0, 0, 2, 2], 1/16)
//
rhythmFlange = Flanger()
rhythmFlange.frequency = 0.15
rhythmFlange.offset = 0.08
rhythmFlange.feedback = 0.35
rhythm.fx.add(rhythmFlange)

// wait  15s

bass.stop()

// wait  15s

// --- PAD ---

pad = Synth[4]('stringPad')
//
pad.gain = 0
pad.chord.seq([[0, 2, 4, 7], [3, 5, 7, 10]], 2)

pad.gain.fade(0, 0.3)

// wait 10s

drums.stop()

// waits 15s


// ---------------------------------------------------------
// DRUMS 2 
// ---------------------------------------------------------

drums2 = Drums()
drums2.gain = 0.75

drums2.tidal('[kd ~ kd] [~ kd] [kd kd ~] [~ kd]', 0)

// wait 5s

drums2.tidal('[~ sd] [sd ~] [~ sd?0.4] [sd ~]', 1)

// wait 5s 

drums2.tidal('ch*6 [oh?0.35 ch]*2', 2)
drums2.tidal('~ [~ cp?0.2] ~ [~ cp?0.15]', 4)

// ---------------------------------------------------------
// VISUALS with cat
// ---------------------------------------------------------

use('hydra').then(init => init())
s0.initImage("https://static.vecteezy.com/system/resources/previews/047/308/861/non_2x/cat-jumping-up-in-the-air-on-transparent-background-free-png.png")
  // Spin the cat in the center
  src(s0)
    .scale(0.5)
    .rotate(() => time * 0.5)
    .out(o1)
  // Combine previous frame + new cat
  src(o0).layer(o1).out(o0)


// ---------------------------------------------------------
// PART 2
// ---------------------------------------------------------

// waits 10s 

// --- BASS ---
bass.note.seq([8, 3, 5, 4], 1/4) 
bass.gain = 0.75

// wait 15s

rhythm.gain.fade(1, 0)

// wait 15s

pad.gain.fade(0.3, 0)
