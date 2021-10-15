Goals:
- Want an audiobuffersourcenode's output to go straight into a media element
- want an audiobuffer to be the content of a media element

mediasource: creates a mediaSource and attaches that to a mediaelement
The media source allows us to move to arbitrary playback positions.
  creates a buffer,
  makes that the element's source
The problem is that this buffer isn't part of WAA

BufferToMediaElement: see offlinecontext2

See bufferToWave
  creates an audio element from an audioBuffer
