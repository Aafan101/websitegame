import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

function shadeKeyBoard(letter, color) {
  for (const elem of document.getElementsByClassName("keyboard-button")) {
    if (elem.textContent === letter) {
      let oldColor = elem.style.backgroundColor;
      if (oldColor === "green") {
        return;
      }

      if (oldColor === "yellow" && color !== "green") {
        return;
      }

      elem.style.backgroundColor = color;
      break;
    }
  }
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter - 1];
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter -= 1;
}

function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString);

  for (const val of currentGuess) {
    guessString += val;
  }

  if (guessString.length != 5) {
    toastr.error("Not enough letters!");
    return;
  }

  if (!WORDS.includes(guessString)) {
    toastr.error("Word not in list!");
    return;
  }

  var letterColor = ["gray", "gray", "gray", "gray", "gray"];

  //check green
  for (let i = 0; i < 5; i++) {
    if (rightGuess[i] == currentGuess[i]) {
      letterColor[i] = "green";
      rightGuess[i] = "#";
    }
  }

  //check yellow
  //checking guess letters
  for (let i = 0; i < 5; i++) {
    if (letterColor[i] == "green") continue;

    //checking right letters
    for (let j = 0; j < 5; j++) {
      if (rightGuess[j] == currentGuess[i]) {
        letterColor[i] = "yellow";
        rightGuess[j] = "#";
      }
    }
  }

  for (let i = 0; i < 5; i++) {
    let box = row.children[i];
    let delay = 250 * i;
    setTimeout(() => {
      //flip box
      animateCSS(box, "flipInX");
      //shade box
      box.style.backgroundColor = letterColor[i];
      shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
    }, delay);
  }

  if (guessString === rightGuessString) {
    toastr.success("You guessed right! Game over!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining -= 1;
    currentGuess = [];
    nextLetter = 0;

    if (guessesRemaining === 0) {
      toastr.error("You've run out of guesses! Game over!");
      toastr.info(`The right word was: "${rightGuessString}"`);
    }
  }
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = row.children[nextLetter];
  animateCSS(box, "pulse");
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return;
  } else {
    insertLetter(pressedKey);
  }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target
  
  if (!target.classList.contains("keyboard-button")) {
      return
  }
  let key = target.textContent

  if (key === "Del") {
      key = "Backspace"
  } 

  document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard()



// Array of freedom quotes
const freedomQuotes = [
  "الحمد لله وعادت لأهلها.",
  "ا قهر بعد اليوم، سوريا الجميلة تتحرر.",
  "يا سوريا الحرّة، مبروك حريتك.",
  "الله يديم نعمة الأمن والأمان على جميع بلاد المسلمين يا رب.",
  ".سوريا يا حرّة",
  "تم تحرير سوريا وكأن الأحداث التي صارت حلم.",
  "مبروك للسوريين.. سقط المجرم.. هرب الديكتاتور.",
  "دمشقُ كشمسِ الضحى الطالعة.",
  "يا شام يا بوّابة التاريخ تحرسك الرماح.",
  "ارفع رأسك فوق، أنت سوري حر. تعظيم سلام للشعب السوري البطل.",
  "وستزهر يا شام زهوركِ.",
  "سقط نظام بشار الأسد، وبقيت سوريا حرة للأبد.",
  "يا رب تمم هذا النصر بوحدة الشعب ويعم الأمن والأمان.",
  "ألف مبروك لإخواننا الشعب السوري.",
  "وعليكِ عيني يا دمشقُ، فمنكِ ينهمرُ الصباحُ.",
  "ألف مبروك للشعب السوري وللعرب وللمسلمين على عودة سوريا وانتصار شعبها الأبي الشجاع.",
  "الله يديم نعمة الأمن والأمان على جميع بلاد المسلمين يا رب.",
  "سوريا هو تاريخ سيحفظه العرب طويلاً، اللهم ارزقهم الأمن والأمان والاستقرار.",
  "الله أكبر.",
  "اللهم ولي عليهم خيارهم واحفظهم واحقن الدماء وحقق لهم الأمن والأمان وعوضهم خيراً.",
  "نسأل الله أن يحكم هذا البلد من يخاف الله ويتقيه ويحكم بما أنزل الله.",
  "ياسمين الشام سيعود أبيضًا، سيعود يزهرُ في ربيع دمشق.",
  "نسأل الله العلي العظيم أن تفرح سوريا بالنصر الكبير وتوحيد الصفوف.",
  "اشرقت شمس الحرية على وطن يتألم منذ 14 عاماً، عادت سوريا.. حرّة شامخة أبّية.",
  "كأنه صباح عيد اليوم، أشرقت شمس الحرية.",
  "تحرير الشام، إن بقيتم فأنتم أهل الدار وإن رحلتم زورونا ولا تقطعونا، فالأمر أصبح بيننا صلة رحم، وسامحوا من أخطأ بحقكم واحفظوا معروف من أحسن إليكم، واعلموا إن قست عليكم الدنيا هناك لا زال لكم دار هنا.",
  "ما بين خوف وفرح، نسأل الله العلي القدير أن يأمن خوف الشعب السوري الحر ويلطف بحالهم ويسخر لهم من يدير بلادهم ويقودهم إلى نهوضها ويأمنوا بالعيش في وطنهم ويطيب عيشهم فيها.",
  "سقط بشار الأسد وعادت سوريا من جديد، هذا يوم من أيام العرب بل يوم من أيام الإسلام.",
  "مبروك لأشقائنا السوريين خاصة وللأمة الإسلامية عامة.",
  "اللهم احفظهم بحفظك وأبدل خوفهم أمناً وأبرم لهم أمر رشد يعز فيه أهل طاعتك ويذل فيه أهل معصيتك، اللهم آمين والحمد لله رب العالمين.",
  "اللهم انصر المسلمين في سوريا بنصرك وأيدهم بتأييدك وأمدهم بجند من جندك واربط على قلوبهم وثبت أقدامهم ويسر أمورهم ووفقهم واحفظهم يا رب العالمين.",

];

function createFloatingQuote(quote) {
  const quoteElement = document.createElement('div');
  quoteElement.classList.add('quote');
  quoteElement.innerText = quote;

  // Randomize position
  quoteElement.style.top = `${Math.random() * 90}%`;
  quoteElement.style.left = `${Math.random() * 90}%`;

  // Add the floating quote to the container
  document.getElementById('quotes-container').appendChild(quoteElement);

  // Remove the quote after 10 seconds
  setTimeout(() => {
    quoteElement.remove();
  }, 10000); // 10 seconds
}

function displayFreedomQuotes() {
  // Clear the container before adding quotes
  document.getElementById('quotes-container').innerHTML = "";

  freedomQuotes.forEach((quote, index) => {
    setTimeout(() => {
      createFloatingQuote(quote);
    }, index * 5000); // Add a delay for each quote
  });
}

// Call the function to display floating quotes
displayFreedomQuotes();

function initializeVinylPlayer() {
  const vinyl = document.getElementById("vinyl");
  const playPauseButton = document.getElementById("play-pause");
  const currentSongElement = document.getElementById("current-song");

  const tracks = [
      { title: "Syrian Anthem", file: "../assets/song5.mp3" }
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
