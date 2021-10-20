# OfflineAudioContext

The OfflineAudioContext renders an audio graph to a buffer as fast as it can.

We provide three examples of using the OfflineAudioContext;

- OfflineContext: rendering to a buffer much faster than real-time,
- OfflineContext2: recording the output of an offline audio graph without needing an additional online audio context, and
- OfflineContext3: providing a progress bar for rendering by suspending and resuming the offline context. This last example is especially useful for highly computational tasks where processing is much slower than real-time.
