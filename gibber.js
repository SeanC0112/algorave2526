s = Synth("shimmer")
s.note.seq([0, 4, 7, 9,], 1/2)

s2 = Synth()
s2.attack = 1/2
s2.note.seq([0,1,2,3,4,5,6,7,8,9], 1)


Gibber.setBPM(100)

// synth 

s = Synth("cry")

s.attack = 0.3
s.decay = 0.4
s.sustain = 0.7
s.release = 1.3
synthPattern1 = s.note.seq([0, 4, 7, 11, 9, 2, 5, 9], 1/4)


//background beat - have smth fade in
//TODO connect everything on background to bus so that we can modify it all
//claude stuff kinda good
bass = Synth('bass').note.seq([0,3,5,2], 1/4)
bass.fx.add(Distortion())

// Lead melody
lead = Synth('lead')
lead.note.seq([7,5,8,7,5,3,5,7], 1/8)
lead.fx.add(Delay(1/8, 0.3))

// rhythem  
rhythm = Synth('square')
rhythm.note.seq([0,0,2,2], 1/16)
rhythm.gain = 0.3

// Orchestral touches
pad = Synth[4]('stringPad')
pad.chord.seq([[0,2,4,7],[3,5,7,10]], 2)
pad.gain = 0.4

// drums

drums = Drums()
drums.tidal('[kd kd ~ kd] sd [~ sd ~ sd] ch*8')
drums.tidal('[ch?0.3]*8')

drums.tidal('<kd sd kd [oh,kd]> ch*2')



