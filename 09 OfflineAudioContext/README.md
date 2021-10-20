# OfflineAudioContext

The OfflineAudioContext renders an audio graph to a buffer as fast as it can.

We provide three examples of using the OfflineAudioContext;

- rendering to a buffer much faster than real-time,
- recording the output of an offline audio graph without needing an additional online audio context, and
- providing a progress bar for rendering by suspending and resuming the offline context. This last example is especially useful for highly computational tasks where processing is much slower than real-time.
