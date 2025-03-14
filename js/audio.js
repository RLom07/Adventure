// audio.js - Handles all game music and sound effects

// Changes the scene music
function changeSceneMusic(newMusicId) {
    const currentMusic = document.querySelector("audio.playing");

    if (currentMusic) {
        fadeOutMusic(currentMusic, () => {
            currentMusic.classList.remove("playing");
            playNewMusic(newMusicId);
        });
    } else {
        playNewMusic(newMusicId);
    }
}

// Fade out current music
function fadeOutMusic(audioElement, callback) {
    let volume = audioElement.volume;
    const fadeInterval = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            audioElement.volume = volume;
        } else {
            clearInterval(fadeInterval);
            audioElement.pause();
            audioElement.volume = 1.0; // Reset for next use
            if (callback) callback();
        }
    }, 200);
}

// Play new music with fade-in effect
function playNewMusic(musicId) {
    const newMusic = document.getElementById(musicId);
    if (!newMusic) {
        console.warn(`⚠️ Music file "${musicId}" not found.`);
        return;
    }

    newMusic.classList.add("playing");
    newMusic.volume = 0;
    newMusic.play().catch(error => console.warn("🔇 Failed to play music automatically:", error));

    let volume = 0;
    const fadeInterval = setInterval(() => {
        if (volume < 0.5) {
            volume += 0.05;
            newMusic.volume = volume;
        } else {
            clearInterval(fadeInterval);
        }
    }, 200);
}

// Global Audio Variables
let currentMusic = null;

// Stop all currently playing music
function stopAllMusic() {
    console.log("🔇 Stopping all music...");

    // Stop and reset the current music
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
        currentMusic = null;
    }

    // Stop all HTML audio elements with class "playing"
    document.querySelectorAll("audio.playing").forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
        audio.classList.remove("playing");
    });
}

function playMusic(audioId) {
    // Stop any currently playing music
    stopAllMusic();

    const newMusic = document.getElementById(audioId);
    if (!newMusic) {
        console.warn(`⚠️ Music element "${audioId}" not found.`);
        return;
    }

    newMusic.classList.add("playing");
    newMusic.volume = 0.5;
    newMusic.play().catch(error => console.warn("🔇 Failed to play music automatically:", error));
}

function stopMusic() {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }
}

// Fade Out Music
function fadeOutMusic(audioElement, callback) {
    let volume = audioElement.volume;
    const fadeInterval = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            audioElement.volume = volume;
        } else {
            clearInterval(fadeInterval);
            audioElement.pause();
            audioElement.volume = 1.0; // Reset for next use

            // ✅ Check if callback exists and is a function before calling it
            if (typeof callback === "function") {
                callback();
            } else {
                console.warn("⚠️ No valid callback function provided to fadeOutMusic!");
            }
        }
    }, 200);
}

// Resume Previous Music
function playPreviousMusic() {
    if (combatState.previousMusic) {
        playMusic(combatState.previousMusic);
    }
}

// Get Current Music Source
function getCurrentMusic() {
    return currentMusic ? currentMusic.src : null;
}
