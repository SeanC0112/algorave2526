// ---------------------------------------------------------
// PREP
// ---------------------------------------------------------

Clock.bpm = 100
introChords = Freesound(687041)
use('hydra').then(init => init())


// ---------------------------------------------------------
// BUS
// ---------------------------------------------------------

function backingGain(lvl, time) {
  if (time === 0) {
    backing.gain = 0
    pad.gain = 0
  } else {
    backing.gain.fade(lvl, time)
    pad.gain.fade(lvl, time)
  }
}


backing = Bus2().connect()
backing.gain = 1

backingFilter = Filter()
backing.fx.add(backingFilter)
pad.fx.add(backingFilter)

filter.filterMode = 1
filter.cutoff = 1
filter.cutoff.fade(1,0,8)

// ---------------------------------------------------------
// VISUALS
// ---------------------------------------------------------

use('hydra').then(init => {
  init()

  // Load cat image
  s0.initImage("https://static.vecteezy.com/system/resources/previews/047/308/861/non_2x/cat-jumping-up-in-the-air-on-transparent-background-free-png.png")

  // Spin the cat in the center
  src(s0)
    .scale(0.5)
    .rotate(() => time * 0.5)
    .out(o1)

  // Combine previous frame + new cat
  src(o0).layer(o1).out(o0)
})

// ---------------------------------------------------------
// INTRO
// ---------------------------------------------------------

filter = Filter()
introChords.fx.add(filter)

introChords.trigger(1)

filter.filterMode = 1
filter.cutoff = 1
filter.cutoff.fade(0.5, 0, 4) // Fade out intro

introChords.stop()

// ---------------------------------------------------------
// DRUMS
// ---------------------------------------------------------

drums = Drums().disconnect()
drums.connect(backing)

drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8', 0)
drums.tidal('[ch?0.3]*8', 1)
drums.tidal('<kd sd kd [oh,kd]> ch*2', 2)

drums.stop()

// ---------------------------------------------------------
// MUSIC
// ---------------------------------------------------------

// --- LEAD SYNTH ---
lead = Synth('lead').disconnect()
lead.connect(backing)
lead.gain = 0
lead.note.seq([7, 5, 8, 7, 5, 3, 5, 7], 1/8)

lead.gain.fade(0, 1)// Fade In

lead.gain.fade(1, 0) // Fade Out

lead.stop()

// --- RHYTHM SYNTH ---
rhythm = Synth('square').disconnect()
rhythm.connect(backing)
rhythm.note.seq([0, 0, 2, 2], 1/16)


rhythm.gain = 0

rhythm.gain.fade(0, 0.75)// Fade In

rhythm.gain.fade(0.75, 0) // Fade Out

rhythm.stop()

// --- STRINGS ---
pad = Synth[4]('stringPad')
pad.chord.seq([[0, 2, 4, 7], [3, 5, 7, 10]], 2)
pad.gain = 0

pad.gain.fade(0, 0.5)// Fade In

pad.gain.fade(0.5, 0) // Fade Out

pad.stop()

// --- BASS ---
bass = Synth('bass').disconnect()
bass.connect(backing)
bass.note.seq([0, 3, 5, 2], 1/4)

bass.gain = 0
bass.fx.add(Distortion())

bass.gain.fade(0, 0.8)// Fade In

bass.gain.fade(0.8, 0) // Fade Out

bass.stop()
