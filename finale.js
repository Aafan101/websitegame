document.addEventListener("DOMContentLoaded", () => {
    // Generate Confetti
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

    const banner = document.getElementById("banner");
    banner.style.transform = "translateY(-100px)";
    banner.style.opacity = "0";

    setTimeout(() => {
        banner.style.transition = "all 1s ease";
        banner.style.transform = "translateY(0)";
        banner.style.opacity = "1";
    }, 500); // Delay for a smoother entrance
    // Generate Balloons

    const createHeart = () => {
        const heartsContainer = document.getElementById("hearts-container");
        const heart = document.createElement("div");
        heart.classList.add("particle");
        heart.style.left = Math.random() * 100 + "vw"; // Random horizontal position
        heart.style.width = Math.random() * 20 + 10 + "px"; // Random size
        heart.style.height = heart.style.width; // Make it circular
        heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // Random animation duration
        heartsContainer.appendChild(heart);
    
        // Remove the heart after animation ends
        heart.addEventListener("animationend", () => {
            heart.remove();
        });
    };

    // Continuously create balloons
    setInterval(createHeart, 50);

    // Initialize Vinyl Player
    const vinyl = document.getElementById("vinyl");
    const playPauseButton = document.getElementById("play-pause");
    const currentSongElement = document.getElementById("current-song");

    const tracks = [
        { title: "Finale Song", file: "../assets/song7.mp3" }
    ];

    let isPlaying = false;
    const audio = new Audio(tracks[0].file);
    audio.loop = true;

    const updateCurrentSong = () => {
        currentSongElement.textContent = `Currently Playing: ${tracks[0].title}`;
    };

    playPauseButton.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            vinyl.style.animationPlayState = "paused";
            playPauseButton.textContent = "▶️";
        } else {
            audio.play();
            vinyl.style.animationPlayState = "running";
            playPauseButton.textContent = "⏸️";
        }
        isPlaying = !isPlaying;
    });

    updateCurrentSong();
});
