# Loading and Recording

Essential functionality in the Web Audio API is the ability to play back audio from a stream or a file, and to record or stream the output of a node. Here, we introduce audio nodes that enable getting audio into an audio context from different sources, like media streams and media elements, as well as into buffers using decodeAudioData, and to different destinations, like media streams and audio files. Some of the functionality also relies on methods from outside the Web Audio API, like getUserMedia from the MediaStream API.

- MediaElement
  - SimpleMediaElement: basic use of an <audio> media element, without the Web Audio API.
  - MediaElement.html: use of a media element in an audio context.
  - MediaElement2.html: use of the MediaElementSourceNode with the audio() constructor.
- decodeAudioData: These examples show how we can fill an audio buffer source with audio from a file
  - decodeWithRequest.html: use of decodeAudioData and XMLHttpRequest to load an audio file, and playbackRate to play it back at a variable rate.
  - decodeWithFetch.html: use of decodeAudioData and fetch() to load an audio file, and playbackRate to play it back at a variable rate.
- LevelMeter: Uses the MediaStreamAudioSourceNode tp provide a level meter for sound input from a microphone.
- MediaStreamToAudioBuffer: shows how to take an excerpt of a media stream and use it as the audio buffer for an AudioBufferSourceNode
- Record an audio node
  - MediaRecorderExample: use of the MediaRecorder to record an audio nodes
  - RecorderExample: use of the recorder.js library to record an audio node
