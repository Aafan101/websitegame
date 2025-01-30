document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });


    function initializeVinylPlayer() {
        const vinyl = document.getElementById("vinyl");
        const playPauseButton = document.getElementById("play-pause");
        const currentSongElement = document.getElementById("current-song");
    
        const tracks = [
            { title: "Space Song", file: "../assets/song3.mp3" }
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
});
