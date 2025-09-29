// --- Sound System ---
class SoundManager {
    constructor() {
        this.sounds = {};
        this.isMuted = false;
        this.audioContext = null;
        this.backgroundMusic = null;
        this.ambientLoop = null;
        this.energyWarningInterval = null;
        this.consecutiveCorrects = 0;
        this.audioInitialized = false;
        
        this.setupSoundToggle();
    }

    initializeAudioContext() {
        if (this.audioInitialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
            this.audioInitialized = true;
            console.log('Audio context initialized');
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    createSounds() {
        // Create procedural sounds using Web Audio API
        this.sounds = {
            // Background Ambience
            bruteForceAmbient: this.createBruteForceAmbient(),
            slidingWindowAmbient: this.createSlidingWindowAmbient(),
            
            // Player Actions
            correctInput: this.createCorrectSound(),
            incorrectInput: this.createIncorrectSound(),
            energyWarning: this.createEnergyWarningSound(),
            xpGain: this.createXpGainSound(),
            banish: this.createBanishSound(),
            summon: this.createSummonSound(),
            
            // Stage Events
            windowHighlight: this.createWindowHighlightSound(),
            bruteForceComplete: this.createBruteForceCompleteSound(),
            slidingWindowComplete: this.createSlidingWindowCompleteSound(),
            levelComplete: this.createLevelCompleteSound(),
            finalSummary: this.createFinalSummarySound()
        };
        
        // Create continuous ambient background
        this.createAmbientBackground();
    }

    createBruteForceAmbient() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(60, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(45, this.audioContext.currentTime + 2);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + 2);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 2);
        };
    }

    createSlidingWindowAmbient() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.03, this.audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 1);
        };
    }

    createCorrectSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            this.consecutiveCorrects++;
            const pitch = 440 + (this.consecutiveCorrects * 50);
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(pitch, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }

    createIncorrectSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            this.consecutiveCorrects = 0;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }

    createEnergyWarningSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(80, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.3);
        };
    }

    createXpGainSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.5);
        };
    }

    createBanishSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.4);
            
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.4);
        };
    }

    createSummonSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.4);
            
            gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.4);
        };
    }

    createWindowHighlightSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 0.2);
        };
    }

    createBruteForceCompleteSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 1);
        };
    }

    createSlidingWindowCompleteSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.5);
            oscillator.frequency.exponentialRampToValueAtTime(1320, this.audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 1);
        };
    }

    createLevelCompleteSound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.6);
            
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime + 0.6);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 1);
        };
    }

    createFinalSummarySound() {
        return () => {
            if (!this.audioContext || this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(330, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(440, this.audioContext.currentTime + 0.5);
            oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 1);
            
            gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + 1);
        };
    }

    createAmbientBackground() {
        if (!this.audioContext) return;
        
        // Create a memorable, melodic mystical soundtrack
        this.ambientLayers = [];
        this.ambientMelody = [];
        this.ambientBass = [];
        this.ambientPads = [];
        
        // Mystical scale: D minor pentatonic with some magical intervals
        const mysticalScale = [146.83, 174.61, 196.00, 220.00, 246.94, 293.66, 329.63, 392.00]; // D, F, G, A, B, D, E, G
        
        // Create bass foundation with melodic progression
        this.createMelodicBass(mysticalScale);
        
        // Create harmonic pads with gentle movement
        this.createHarmonicPads(mysticalScale);
        
        // Create main melody that evolves
        this.createEvolvingMelody(mysticalScale);
        
        // Create magical arpeggios
        this.createMagicalArpeggios(mysticalScale);
        
        // Create atmospheric textures
        this.createAtmosphericTextures();
        
        // Start all layers
        [...this.ambientBass, ...this.ambientPads, ...this.ambientMelody].forEach(layer => {
            if (layer.oscillator && layer.oscillator.state !== 'running') {
                try {
                    layer.oscillator.start();
                } catch (e) {
                    console.warn('Oscillator start failed:', e);
                }
            }
        });
    }

    createMelodicBass(scale) {
        // Bass line that follows the mystical scale
        const bassNotes = [scale[0], scale[2], scale[4], scale[1]]; // D, G, B, F
        let noteIndex = 0;
        
        const playBassNote = () => {
            if (this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(bassNotes[noteIndex], this.audioContext.currentTime);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
            filter.Q.setValueAtTime(1, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.03, this.audioContext.currentTime + 0.5);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 3);
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            try {
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 3);
            } catch (e) {
                console.warn('Bass oscillator start failed:', e);
            }
            
            noteIndex = (noteIndex + 1) % bassNotes.length;
            
            // Schedule next note
            setTimeout(playBassNote, 2000);
        };
        
        playBassNote();
    }

    createHarmonicPads(scale) {
        // Create two harmonic pad layers
        const padNotes1 = [scale[1], scale[3], scale[5]]; // F, A, D
        const padNotes2 = [scale[2], scale[4], scale[6]]; // G, B, E
        
        // First pad layer
        padNotes1.forEach((note, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(note, this.audioContext.currentTime);
            
            // LFO for gentle movement
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.1 + index * 0.05, this.audioContext.currentTime);
            lfoGain.gain.setValueAtTime(2, this.audioContext.currentTime);
            
            lfo.connect(lfoGain);
            lfoGain.connect(oscillator.frequency);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
            filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.015, this.audioContext.currentTime);
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            try {
                lfo.start();
                oscillator.start();
            } catch (e) {
                console.warn('Oscillator start failed:', e);
            }
            
            this.ambientPads.push({ oscillator, gainNode, filter, lfo, lfoGain });
        });
        
        // Second pad layer (octave higher)
        padNotes2.forEach((note, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            const lfo = this.audioContext.createOscillator();
            const lfoGain = this.audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(note * 2, this.audioContext.currentTime);
            
            // LFO for gentle movement
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.08 + index * 0.03, this.audioContext.currentTime);
            lfoGain.gain.setValueAtTime(1.5, this.audioContext.currentTime);
            
            lfo.connect(lfoGain);
            lfoGain.connect(oscillator.frequency);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1200, this.audioContext.currentTime);
            filter.Q.setValueAtTime(0.3, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.0125, this.audioContext.currentTime);
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            try {
                lfo.start();
                oscillator.start();
            } catch (e) {
                console.warn('Oscillator start failed:', e);
            }
            
            this.ambientPads.push({ oscillator, gainNode, filter, lfo, lfoGain });
        });
    }

    createEvolvingMelody(scale) {
        // Main melody that evolves over time
        const melodyPhrase1 = [scale[0], scale[2], scale[4], scale[6], scale[4], scale[2]]; // D, G, B, E, B, G
        const melodyPhrase2 = [scale[1], scale[3], scale[5], scale[7], scale[5], scale[3]]; // F, A, D, G, D, A
        const melodies = [melodyPhrase1, melodyPhrase2];
        let melodyIndex = 0;
        let noteIndex = 0;
        
        const playMelodyNote = () => {
            if (this.isMuted) return;
            
            const currentMelody = melodies[melodyIndex];
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(currentMelody[noteIndex] * 2, this.audioContext.currentTime);
            
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1500, this.audioContext.currentTime);
            filter.Q.setValueAtTime(2, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.02, this.audioContext.currentTime + 0.2);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1.5);
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            try {
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 1.5);
            } catch (e) {
                console.warn('Melody oscillator start failed:', e);
            }
            
            noteIndex++;
            if (noteIndex >= currentMelody.length) {
                noteIndex = 0;
                melodyIndex = (melodyIndex + 1) % melodies.length;
            }
            
            // Schedule next note
            setTimeout(playMelodyNote, 800);
        };
        
        playMelodyNote();
    }

    createMagicalArpeggios(scale) {
        // Magical arpeggios that add sparkle
        const arpeggioNotes = [scale[0], scale[2], scale[4], scale[6]]; // D, G, B, E
        let arpIndex = 0;
        
        const playArpeggio = () => {
            if (this.isMuted) return;
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            const filter = this.audioContext.createBiquadFilter();
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(arpeggioNotes[arpIndex] * 4, this.audioContext.currentTime);
            
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(800, this.audioContext.currentTime);
            filter.Q.setValueAtTime(1, this.audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.8);
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            try {
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.8);
            } catch (e) {
                console.warn('Arpeggio oscillator start failed:', e);
            }
            
            arpIndex = (arpIndex + 1) % arpeggioNotes.length;
            
            // Schedule next arpeggio note
            setTimeout(playArpeggio, 400);
        };
        
        playArpeggio();
    }

    createAtmosphericTextures() {
        // Atmospheric textures for depth
        const textureOscillator = this.audioContext.createOscillator();
        const textureGain = this.audioContext.createGain();
        const textureFilter = this.audioContext.createBiquadFilter();
        const noiseBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 2, this.audioContext.sampleRate);
        const noiseSource = this.audioContext.createBufferSource();
        
        // Create noise texture
        const noiseData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseData.length; i++) {
            noiseData[i] = (Math.random() * 2 - 1) * 0.1;
        }
        
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;
        
        textureFilter.type = 'bandpass';
        textureFilter.frequency.setValueAtTime(200, this.audioContext.currentTime);
        textureFilter.Q.setValueAtTime(0.5, this.audioContext.currentTime);
        
        textureGain.gain.setValueAtTime(0.005, this.audioContext.currentTime);
        
        noiseSource.connect(textureFilter);
        textureFilter.connect(textureGain);
        textureGain.connect(this.audioContext.destination);
        
        try {
            noiseSource.start();
        } catch (e) {
            console.warn('Noise source start failed:', e);
        }
        
        this.ambientLayers.push({ oscillator: noiseSource, gainNode: textureGain, filter: textureFilter });
    }

    setupSoundToggle() {
        const toggleBtn = document.getElementById('sound-toggle');
        toggleBtn.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            toggleBtn.textContent = this.isMuted ? '🔇' : '🔊';
            toggleBtn.classList.toggle('muted', this.isMuted);
            
            if (this.isMuted) {
                this.stopBackgroundMusic();
                this.stopAmbientBackground();
            } else {
                this.startBackgroundMusic();
                this.startAmbientBackground();
            }
        });
    }

    playSound(soundName) {
        if (!this.audioInitialized) {
            this.initializeAudioContext();
        }
        
        if (this.sounds[soundName] && !this.isMuted) {
            try {
                this.sounds[soundName]();
            } catch (e) {
                console.warn('Sound playback failed:', e);
            }
        }
    }

    startBackgroundMusic() {
        if (this.isMuted) return;
        
        if (!this.audioInitialized) {
            this.initializeAudioContext();
        }
        
        this.stopBackgroundMusic();
        
        if (gameState.currentStage === 'bruteForce') {
            this.sounds.bruteForceAmbient();
        } else {
            this.sounds.slidingWindowAmbient();
        }
    }

    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
            this.backgroundMusic = null;
        }
    }

    checkEnergyWarning() {
        if (gameState.playerEnergy <= 30 && !this.isMuted) {
            this.sounds.energyWarning();
        }
    }

    startAmbientBackground() {
        if (this.isMuted) return;
        
        if (!this.audioInitialized) {
            this.initializeAudioContext();
        }
        
        if (!this.audioContext) return;
        
        // Stop any existing ambient background first
        this.stopAmbientBackground();
        
        // Create new ambient background
        this.createAmbientBackground();
        
        // Set up continuous restart mechanism
        this.ambientRestartInterval = setInterval(() => {
            if (!this.isMuted && this.audioContext) {
                // Check if any layers have stopped and restart them
                this.ambientLayers.forEach((layer, index) => {
                    try {
                        // Try to access the oscillator state
                        if (layer.oscillator.state === 'finished' || layer.oscillator.state === 'stopped') {
                            // Restart this layer
                            const newOscillator = this.audioContext.createOscillator();
                            const newGainNode = this.audioContext.createGain();
                            const newFilter = this.audioContext.createBiquadFilter();
                            const newCompressor = this.audioContext.createDynamicsCompressor();
                            
                            // Copy settings from the original layer
                            newOscillator.type = layer.oscillator.type;
                            newOscillator.frequency.setValueAtTime(layer.oscillator.frequency.value, this.audioContext.currentTime);
                            newOscillator.detune.setValueAtTime(layer.oscillator.detune.value, this.audioContext.currentTime);
                            
                            newFilter.type = layer.filter.type;
                            newFilter.frequency.setValueAtTime(layer.filter.frequency.value, this.audioContext.currentTime);
                            newFilter.Q.setValueAtTime(layer.filter.Q.value, this.audioContext.currentTime);
                            
                            newCompressor.threshold.setValueAtTime(layer.compressor.threshold.value, this.audioContext.currentTime);
                            newCompressor.knee.setValueAtTime(layer.compressor.knee.value, this.audioContext.currentTime);
                            newCompressor.ratio.setValueAtTime(layer.compressor.ratio.value, this.audioContext.currentTime);
                            newCompressor.attack.setValueAtTime(layer.compressor.attack.value, this.audioContext.currentTime);
                            newCompressor.release.setValueAtTime(layer.compressor.release.value, this.audioContext.currentTime);
                            
                            newGainNode.gain.setValueAtTime(layer.gainNode.gain.value, this.audioContext.currentTime);
                            
                            newOscillator.connect(newFilter);
                            newFilter.connect(newCompressor);
                            newCompressor.connect(newGainNode);
                            newGainNode.connect(this.audioContext.destination);
                            
                            newOscillator.start();
                            
                            // Replace the old layer
                            this.ambientLayers[index] = { 
                                oscillator: newOscillator, 
                                gainNode: newGainNode, 
                                filter: newFilter, 
                                compressor: newCompressor 
                            };
                        }
                    } catch (e) {
                        // Layer is in an invalid state, recreate it
                        console.log('Recreating ambient layer', index);
                    }
                });
            }
        }, 10000); // Check every 10 seconds
    }

    stopAmbientBackground() {
        // Clear the restart interval
        if (this.ambientRestartInterval) {
            clearInterval(this.ambientRestartInterval);
            this.ambientRestartInterval = null;
        }
        
        // Stop all ambient layers
        const allLayers = [
            ...(this.ambientLayers || []),
            ...(this.ambientBass || []),
            ...(this.ambientPads || []),
            ...(this.ambientMelody || [])
        ];
        
        allLayers.forEach(layer => {
            try {
                if (layer.oscillator) layer.oscillator.stop();
                if (layer.lfo) layer.lfo.stop();
            } catch (e) {
                // Oscillator might already be stopped
            }
        });
        
        // Clear all arrays
        this.ambientLayers = [];
        this.ambientBass = [];
        this.ambientPads = [];
        this.ambientMelody = [];
    }
}
