document.addEventListener("DOMContentLoaded", function () {
    const kitties = document.querySelectorAll(".floating-kitty");
    const animationDurations = [50, 60, 70, 80, 90]; // Durations in seconds

    kitties.forEach((kitty, index) => {
        // Assign a unique animation
        const animationClass = `floating-kitty-${index + 1}`;
        const animationName = `move-across-${index + 1}`;
        const randomDuration = animationDurations[Math.floor(Math.random() * animationDurations.length)];
        const randomDelay = Math.random() * 5; // Random delay between 0 to 5 seconds

        kitty.classList.add(animationClass);
        kitty.style.animation = `${animationName} ${randomDuration}s linear infinite ${randomDelay}s`;
    });
});

function initializeVinylPlayer() {
    const vinyl = document.getElementById("vinyl");
    const playPauseButton = document.getElementById("play-pause");
    const currentSongElement = document.getElementById("current-song");

    const tracks = [
        { title: "Cat Song", file: "../assets/song6.mp3" }
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
}
initializeVinylPlayer();