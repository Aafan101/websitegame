// Generate Confetti

const confettiColors = ["#FF6F61", "#FFD700", "#4CAF50", "#00BCD4", "#FF5722"];

const confettiContainer = document.getElementById("confetti");
for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti-piece");
    confettiPiece.style.left = Math.random() * 100 + "vw";
    confettiPiece.style.animationDuration = Math.random() * 3 + 2 + "s";
    confettiPiece.style.animationDelay = Math.random() * 3 + "s";
    confettiPiece.style.setProperty("--hue", Math.random());
    confettiContainer.appendChild(confettiPiece);

    // Remove confetti after animation ends
    confettiPiece.addEventListener("animationend", () => {
        confettiPiece.remove();
    });
}

// Start Button Logic
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
    window.location.href = "games/mathgames.html"; // Link to the first game
});

// Generate Balloons
const createBalloon = () => {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.animationDuration = Math.random() * 5 + 3 + "s"; // Random duration
    document.body.appendChild(balloon);

    // Remove balloon after animation ends
    balloon.addEventListener("animationend", () => {
        balloon.remove();
    });
};

// Continuously create balloons
setInterval(createBalloon, 500);

 
function initializeVinylPlayer() {
    // Select elements
    console.log("Initializing Vinyl Player...");
    const vinyl = document.getElementById("vinyl");
    const playPauseButton = document.getElementById("play-pause");
   
    const currentSongElement = document.getElementById("current-song");// For displaying the current song
    
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    // Debug: Check if the current song element exists
    console.log("currentSongElement:", currentSongElement);

    if (!currentSongElement) {
        console.error("Error: Element with id 'current-song' not found!");
        return; // Stop the initialization if the element is missing
    }
    // Track list
    const tracks = [
        { title: "Track 1: (Everything I Do) I Do It For You", file: "assets/song1.mp3" },
        { title: "Track 2: I Should Take Better Care", file: "assets/song2.mp3" },
        { title: "Track 3: Custom Song", file: "assets/song3.mp3" },
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Audio setup
    const audio = new Audio(tracks[currentTrackIndex].file);
    audio.loop = true; // Loop the current track

    // Update the currently playing song
    const updateCurrentSong = () => {
        currentSongElement.textContent = `Currently Playing: ${tracks[currentTrackIndex].title}`;
    };

    // Play or Pause the Vinyl
    playPauseButton.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            vinyl.style.animationPlayState = "paused"; // Pause spinning
            playPauseButton.textContent = "▶️"; // Update button to show play icon
        } else {
            audio.play();
            vinyl.style.animationPlayState = "running"; // Start spinning
            playPauseButton.textContent = "⏸️"; // Update button to show pause icon
        }
        isPlaying = !isPlaying;
    });

    // Play Previous Track
    prevButton.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        audio.src = tracks[currentTrackIndex].file;
        audio.play();
        isPlaying = true;
        updateCurrentSong();
        vinyl.style.animationPlayState = "running";
        playPauseButton.textContent = "⏸️";
    });

    // Play Next Track
    nextButton.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        audio.src = tracks[currentTrackIndex].file;
        audio.play();
        isPlaying = true;
        updateCurrentSong();
        vinyl.style.animationPlayState = "running";
        playPauseButton.textContent = "⏸️";
    });

    // Initialize the current song display
    updateCurrentSong();
}


// Initialize Vinyl Player
document.addEventListener("DOMContentLoaded", () => {
    initializeVinylPlayer();
});

