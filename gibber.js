// ---------------------------------------------------------
// PREP
// ---------------------------------------------------------

introChords = Freesound(687041)
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
// INTRO
// ---------------------------------------------------------

filter = Filter()
introChords.fx.add(filter)

introChords.trigger(1) //(let play for 5s)

filter.filterMode = 1
filter.cutoff = 1
filter.cutoff.fade(1, 0, 7) // Fade out intro at 5s
Console.log(introChords.__out)


// ---------------------------------------------------------
// DRUMS (play as intro fades out, approx 50%)
// ---------------------------------------------------------

drums = Drums()
drums.gain = 0.8

drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8', 0)
drums.tidal('[ch?0.3]*8', 1)
drums.tidal('<kd sd kd [oh,kd]> ch*2', 2)




minColor = [0,0,0.2]
maxColor = [0.9,0.9,0.9]
steps = 2
minSize = 0.5
stepSize = 0.175
solid(minColor[0],minColor[1],minColor[2]).diff(shape(4,minimum, 0.001).repeat(20,10).color(minColor[0],minColor[1],minColor[2]))
	.add(solid((maxColor[0]-minColor[0])/steps,(maxColor[1]-minColor[1])/steps,(maxColor[2]-minColor[2])/steps).diff(shape(4,minimum+stepSize, 0.001).repeat(20,10).color((maxColor[0]-minColor[0])/steps,(maxColor[1]-minColor[1])/steps,(maxColor[2]-minColor[2])/steps)))
	.add(solid((maxColor[0]-minColor[0])/steps,(maxColor[1]-minColor[1])/steps,(maxColor[2]-minColor[2])/steps).diff(shape(4,minimum+stepSize*2, 0.001).repeat(20,10).color((maxColor[0]-minColor[0])/steps,(maxColor[1]-minColor[1])/steps,(maxColor[2]-minColor[2])/steps)))
  .out()

// ---------------------------------------------------------
// PART 1
// ---------------------------------------------------------

// --- LEAD SYNTH ---
lead = Synth('lead')
lead.gain = 0
lead.note.seq([7, 5, 8, 7, 5, 3, 5, 7], 1/8)

lead.gain.fade(0, 0.7)// Fade in when you intro is 75% out


// wait until lead synth is at 100% volume


// --- BASS ---
bass = Synth('bass')
bass.sustain = 0.8
// lower bass pitch !!!
bass.note.seq([0, 3, 5, 2], 1/4) // next the bass


// wait 15s


lead.gain.fade(1,0) // no more lead synth...

// --- RHYTHM SYNTH ---
rhythm = Synth('square')
rhythm.note.seq([0, 0, 2, 2], 1/16) // start as lead synth fades 75% out 


// wait  12s


// --- STRINGS ---
pad = Synth[4]('stringPad')
pad.chord.seq([[0, 2, 4, 7], [3, 5, 7, 10]], 2)
pad.gain = 0

pad.gain.fade(0, 0.5)// fade in


// wait 20s after fades in

bass.stop()


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
// PART 2
// ---------------------------------------------------------

rhythm.gain.fade(1, 0)

// waits 10 

// --- BASS ---
bass.note.seq([8, 3, 5, 4], 1/4) 

// wait 15s

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

use( 'hydra' ).then( init => init() )

k = Kick('long').trigger.seq( [.125,.5,2], 1/4 )
s = Synth().note.seq([0,1,2,1,3,4,1], 1/4)
 
s0.initImage("https://yt3.googleusercontent.com/Xj6XXGkPKNsW0eVuprJ3b7o3TKQDrJl4sOEdjTNWUkRwQnOFLpRi4gZk7tZXLJiroIzpIt-i-Qo=s900-c-k-c0x00ffffff-no-rj")
  
osc(0.5, 1, 1.5).modulate(s0, 10).repeat(()=>drums.__out*100).pixelate(() => drums2.__out*1000).blend(noise(2, 2).color(1,1,0), ()=>drums2.__out*10).kaleid(() => drums.__out*100).out()

console.log(s.__out)


// ---------------------------------------------------------
// VISUALS without cat
// ---------------------------------------------------------