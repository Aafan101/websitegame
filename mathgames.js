document.addEventListener("DOMContentLoaded", () => {
    function initializeVinylPlayer() {
        const vinyl = document.getElementById("vinyl");
        const playPauseButton = document.getElementById("play-pause");
        const currentSongElement = document.getElementById("current-song");

        const tracks = [
            { title: "Math Song", file: "../assets/song2.mp3" }
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

    function initializeMathGame() {
        const questionElement = document.getElementById("question");
        const answerInput = document.getElementById("answer");
        const submitButton = document.getElementById("submit");
        const feedbackElement = document.getElementById("feedback");
    
        let currentQuestion = {};
        let questionCount = 0; // Counter for questions
        const totalQuestions = 1; // Total number of questions
    
        const generateQuestion = () => {
            // Stop generating questions when the limit is reached
            if (questionCount >= totalQuestions) {
                questionElement.textContent = "🎉 IM SO PROUD OF YOU MY LOVE YOU'RE THE SMARTEST GIRL IN THE WORLD 🎉";
                answerInput.style.display = "none";
                submitButton.style.display = "none";
                feedbackElement.textContent = "";
                confetti({
                    particleCount: 10000,
                    spread: 150,
                    origin: { y: 0.6 }
                });
                const nextButton = document.getElementById("next-button");
                nextButton.style.display = "inline-block";
            
                // Add click event to redirect to the Wordle page
                nextButton.addEventListener("click", () => {
                    window.location.href = "gallery_interlude.html"; // Update the path to match your folder structure
                });
                return;
            }
    
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            currentQuestion = { num1, num2, answer: num1 * num2 };
            questionElement.textContent = `What is ${num1} × ${num2}?`;
        };
    
        submitButton.addEventListener("click", () => {
            const userAnswer = parseInt(answerInput.value, 10);
    
            if (userAnswer === currentQuestion.answer) {
                feedbackElement.textContent = "Correct! 🎉";
                feedbackElement.style.color = "#00a86b";
                questionCount++; // Increment the counter
                answerInput.value = ""; // Clear the input field
                generateQuestion(); // Generate the next question
            } else {
                feedbackElement.textContent = "Try Again! 🙃";
                feedbackElement.style.color = "#ff6f61";
            }
        });
    
        // Generate the first question
        generateQuestion();
    }


    const container = document.body;

    const generateEquation = () => {
        // Randomly generate numbers and operations
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operators = ["+", "-", "×", "÷"];
        const operator = operators[Math.floor(Math.random() * operators.length)];
        const equation = `${num1} ${operator} ${num2}`;

        // Create an equation element
        const equationEl = document.createElement("div");
        equationEl.className = "math-equation";
        equationEl.textContent = equation;

        // Randomly position it
        equationEl.style.left = `${Math.random() * 100}vw`;
        equationEl.style.top = `${Math.random() * 100}vh`;

        // Add animation
        equationEl.style.animationDuration = `${Math.random() * 5 + 3}s`;
        container.appendChild(equationEl);

        // Remove the element after animation ends
        equationEl.addEventListener("animationend", () => {
            equationEl.remove();
        });
    };


    let timeLeft = 60;
    const timerEl = document.getElementById("timer");

    const countdown = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = `Time Left: ${timeLeft}s`;
    } else {
        clearInterval(countdown);
        timerEl.textContent = "Time's up!";
    }
}, 1000);   

    // Generate equations at intervals
    setInterval(generateEquation, 500);
    initializeVinylPlayer();
    initializeMathGame();
});
