export class AudioLoopCrossFader {
    private audioContext: AudioContext;
    private gainNodes: [GainNode, GainNode];
    private sources: [AudioBufferSourceNode | null, AudioBufferSourceNode | null];
    private currentSourceIndex: number = 0;
    private trackUrl: string;
    private crossfadeDuration: number = 4000; // Milliseconds
    private isPlaying: boolean = false;
    private pausePosition: number = 0; // Seconds
    private startTime: number = 0;
    private triggerTimeout: number | null = null;

    constructor(trackUrl: string) {
        this.trackUrl = trackUrl;
        this.audioContext = new AudioContext();

        const gain1 = this.audioContext.createGain();
        const gain2 = this.audioContext.createGain();
        gain1.gain.value = 0;
        gain2.gain.value = 0;

        gain1.connect(this.audioContext.destination);
        gain2.connect(this.audioContext.destination);

        this.gainNodes = [gain1, gain2];
        this.sources = [null, null];
    }

    private async loadAudioBuffer(): Promise<AudioBuffer> {
        const response = await fetch(this.trackUrl);
        const arrayBuffer = await response.arrayBuffer();
        return await this.audioContext.decodeAudioData(arrayBuffer);
    }

    async play(): Promise<void> {
        if (this.isPlaying) return;
        const audioBuffer = await this.loadAudioBuffer();
        const offset = this.pausePosition > 0 ? this.pausePosition : 0;
        this.startSource(audioBuffer, offset);
        this.fadeGain(this.gainNodes[this.currentSourceIndex], 0, 1, this.crossfadeDuration / 1000);
        this.scheduleNextTrack(audioBuffer.duration * 1000);
        this.isPlaying = true;
    }

    pause(): void {
        if (!this.isPlaying) return;

        const elapsedTime = this.audioContext.currentTime - this.startTime;
        this.pausePosition = elapsedTime;

        const currentGainNode = this.gainNodes[this.currentSourceIndex];
        this.fadeGain(currentGainNode, 1, 0, this.crossfadeDuration / 1000);

        setTimeout(() => {
            const currentSource = this.sources[this.currentSourceIndex];
            if (currentSource) {
                currentSource.stop();
                currentSource.disconnect();
                this.sources[this.currentSourceIndex] = null;
            }
        }, this.crossfadeDuration);

        if (this.triggerTimeout) {
            clearTimeout(this.triggerTimeout);
            this.triggerTimeout = null;
        }

        this.isPlaying = false;
    }

    playing(): boolean {
        return this.isPlaying;
    }

    private startSource(audioBuffer: AudioBuffer, offset: number): void {
        const sourceIndex = this.currentSourceIndex;
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        
        source.connect(this.gainNodes[sourceIndex]);
        source.start(0, offset);

        this.sources[sourceIndex] = source;
        this.startTime = this.audioContext.currentTime - offset;
    }

    private scheduleNextTrack(duration: number): void {
        const triggerTime = duration - this.crossfadeDuration;

        if (triggerTime > 0) {
            this.triggerTimeout = window.setTimeout(async () => {
                if (!this.isPlaying) return;

                const nextSourceIndex = (this.currentSourceIndex + 1) % 2;
                const nextGainNode = this.gainNodes[nextSourceIndex];
                const audioBuffer = await this.loadAudioBuffer();

                const nextSourceOffset = 0;
                const nextSource = new AudioBufferSourceNode(this.audioContext, { buffer: audioBuffer });

                nextSource.connect(nextGainNode);
                nextSource.start(0, nextSourceOffset);

                const fadeDurationInSeconds = this.crossfadeDuration / 1000;
                this.fadeGain(this.gainNodes[this.currentSourceIndex], 1, 0, fadeDurationInSeconds);
                this.fadeGain(nextGainNode, 0, 1, fadeDurationInSeconds);

                this.sources[nextSourceIndex] = nextSource;
                this.currentSourceIndex = nextSourceIndex;
                this.scheduleNextTrack(audioBuffer.duration * 1000);
            }, triggerTime);
        }
    }

    private fadeGain(gainNode: GainNode, startValue: number, endValue: number, duration: number): void {
        const currentTime = this.audioContext.currentTime;
        gainNode.gain.setValueAtTime(startValue, currentTime);
        gainNode.gain.linearRampToValueAtTime(endValue, currentTime + duration);
    }
}