// ---------------------------------------------------------
// VISUALS 1 (0s)
// ---------------------------------------------------------

use('hydra').then(init => init())

osc(1.5,1.25).mult(shape(1,0.09).rotate(1.5))
  .diff(gradient())
  .add(shape(2,2).blend(gradient(1)))
  .modulate(noise()
            .modulate(noise().scrollY(1,0.0625)))
  .blend(o0)
  .color(1,-0.5,-0.75)
	.rotate(6.28318530718*3/4)
  .out()

// ---------------------------------------------------------
// PREP (0s)
// ---------------------------------------------------------

introChords = Freesound(687041)

// ---------------------------------------------------------
// INTRO (0s)
// ---------------------------------------------------------

filter = Filter()
introChords.fx.add(filter)

introChords.trigger(1)

filter.filterMode = 1
filter.cutoff = 1
filter.cutoff.fade(1, 0, 7) // (~6s)

// ---------------------------------------------------------
// DRUMS (intro 50% out)
// ---------------------------------------------------------

drums = Drums()
drums.gain = 0.8
drums.lowpass = 0.9

drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8', 0)
drums.tidal('[ch?0.3]*8', 1)
drums.tidal('<kd sd kd [oh,kd]> ch*2', 2)
// VISUAL ---------
minColor = [0,0,0.5]
maxColor = [0.9,0.9,0.9]
steps = 2
minSize = 0.5
stepSize = 0.175
solid(0,0,0.8).diff(shape(4,minSize, 0.001).repeat(20,10).color(0,0,0.8))
	//.modulateScrollX(osc(1), 0.3)
	.modulate(noise(1), () => drums.__out)
	.add(solid(0,0.8,0).diff(shape(4,minSize+stepSize, 0.001).repeat(20,10).color(0,0.8,0)))
	//.modulateScrollX(osc(1), 0.3)
	.modulate(noise(1), () => drums.__out)
  .add(solid(0.8,0,0).diff(shape(4,minSize+stepSize*2, 0.001).repeat(20,10).color(0.8,0,0)))
  //.modulateScrollX(osc(1), 0.3)
  .modulate(noise(1), () => drums.__out)
  .out()

// ---------------------------------------------------------
// LEAD (intro 75% out)
// ---------------------------------------------------------

// --- LEAD SYNTH ---

lead = Synth('lead')
lead.waveform = 'sine'
lead.useADSR = true
lead.attack = 1/8
lead.decay = 1/4
lead.sustain = 1/2
lead.release = 1/2
lead.filterType = 3
lead.filterMode = 0
lead.cutoff = 0.25
lead.Q = 0.2
lead.filterMult = 1.2
lead.gain = 0
lead.note.seq([7, 5, 8, 7, 5, 3, 5, 7], 1/8)
lead.gain.fade(0, 0.2) // Fade in around 50s
// VISUAL ---------
lead.gain.fade(0, 0.7)// Fade in when you intro is 75% out
solid(0,0,0.8).diff(shape(4,minSize, 0.001).repeat(20,10).color(0,0,0.8))
	//.modulateScrollX(osc(1), 0.3)
	.modulate(noise(() => lead.__out*10), () => drums.__out)
	.add(solid(0,0.8,0).diff(shape(4,minSize+stepSize, 0.001).repeat(20,10).color(0,0.8,0)))
	//.modulateScrollX(osc(1), 0.3)
	.modulate(noise(() => lead.__out*10), () => drums.__out)
  .add(solid(0.8,0,0).diff(shape(4,minSize+stepSize*2, 0.001).repeat(20,10).color(0.8,0,0)))
  //.modulateScrollX(osc(1), 0.3)
  .modulate(noise(() => lead.__out*10), () => drums.__out)
  .out()

// ---------------------------------------------------------
// BASS (lead 100% in, wait)
// ---------------------------------------------------------

bass = Synth('bass')
bass.sustain = 0.8
bass.cutoff = 0.3
bass.octave = -2
bass.gain = 0.9
bass.note.seq([0, 3, 5, 2], 1/4)

// wait 15s 

lead.gain.fade(0.2, 0) // fade out lead
// VISUAL ---------
solid(0,0,0.8).diff(shape(4,minSize, 0.001).repeat(20,10).color(0,0,0.8))
	//.modulateScrollX(osc(1), 0.3)
	.modulate(noise(() => lead.__out*10), () => drums.__out)
	.add(solid(0,0.8,0).diff(shape(4,minSize+stepSize, 0.001).repeat(20,10).color(0,0.8,0)))
	//.modulateScrollX(osc(1), 0.3)
	.modulate(noise(() => lead.__out*10), () => drums.__out)
  .add(solid(0.8,0,0).diff(shape(4,minSize+stepSize*2, 0.001).repeat(20,10).color(0.8,0,0)))
  //.modulateScrollX(osc(1), 0.3)
  .modulate(noise(() => lead.__out*10), () => drums.__out)
	.layer(solid(0,0,0,() => 1-lead.__out*10)
	.layer(
    voronoi(8,1)
    .mult(osc(10,0.1,()=>Math.sin(time)*1).saturate(3).kaleid(200))
    .modulate(o0,()=> 0.1 * Math.sine(bass.__out*10))
    .add(o0,0.8)
    .scrollY(-0.001)
    .scale(0.9999999)
    .modulate(voronoi(8,1),0.0008)
    .luma(0.3)))
  .out()

// ---------------------------------------------------------
// RHYTHM (bass 30s)
// ---------------------------------------------------------

rhythm = Synth('square')
rhythm.gain = 0.4
rhythm.waveform = 'triangle'
rhythm.attack = 1/16
rhythm.release = 1/8
rhythm.cutoff = 0.3
rhythm.Q = 0.2
rhythm.filterMult = 1
rhythmFlange = Flanger()
rhythmFlange.frequency = 0.15
rhythmFlange.offset = 0.08
rhythmFlange.feedback = 0.35
rhythm.fx.add(rhythmFlange)
rhythm.note.seq([0, 0, 2, 2], 1/16)

// ---------------------------------------------------------
// PAD (rhythm 30s)
// ---------------------------------------------------------

pad = Synth[4]('stringPad')
pad.gain = 0
pad.chord.seq([[0, 2, 4, 7], [3, 5, 7, 10]], 2)
pad.gain.fade(0, 0.3)
// VISUAL ---------
voronoi(8,1)
   .mult(osc(10,0.1,()=>Math.sin(time)*pad.__out*30).saturate(3).kaleid(200))
   .modulate(o0,0.1)
   .add(o0,0.8)
   .scrollY(-0.001)
   .scale(0.9999999)
   .modulate(voronoi(8,1),0.0008)
   .luma(0.3)
  .out()

// wait 15s 

drums.stop()

// wait again

bass.stop()

// more waiting

// ---------------------------------------------------------
// DRUMS 2
// ---------------------------------------------------------

drums2 = Drums()
drums2.gain = 0.75

drums2.tidal('[kd ~ kd] [~ kd] [kd kd ~] [~ kd]', 0)

drums2.tidal('[~ sd] [sd ~] [~ sd?0.4] [sd ~]', 1)

drums2.tidal('ch*6 [oh?0.35 ch]*2', 2)
drums2.tidal('~ [~ cp?0.2] ~ [~ cp?0.15]', 4)
// VISUAL ---------
s0.initImage("https://yt3.googleusercontent.com/Xj6XXGkPKNsW0eVuprJ3b7o3TKQDrJl4sOEdjTNWUkRwQnOFLpRi4gZk7tZXLJiroIzpIt-i-Qo=s900-c-k-c0x00ffffff-no-rj")
osc(0.5, 1, 1.5).modulate(s0, 10).repeat(()=>pad.__out*100).pixelate(() => pad.__out*1000).blend(noise(2, 2).color(1,1,0), ()=>drums2.__out*10).kaleid(() => drums2.__out*100).out()


// ---------------------------------------------------------
// BASS 2
// ---------------------------------------------------------

bass.note.seq([8, 3, 5, 4], 1/4)
bass.gain.fade(0, 0.7)
//
// VISUALS 6
//

use('hydra').then(init => init())
s0.initImage('https://static.vecteezy.com/system/resources/previews/047/308/861/non_2x/cat-jumping-up-in-the-air-on-transparent-background-free-png.png')
src(s0)
  .scale(0.5)
  .rotate(() => time * 0.5)
  .out(o1)
src(o0).layer(o1).out(o0)

// ---------------------------------------------------------
// END
// ---------------------------------------------------------

pad.gain.fade(0.3, 0)  // wait

bass.stop()

drums2.stop()


