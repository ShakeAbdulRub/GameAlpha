var showCheckBoxes = true;
let objectNames = [];
let bigArray = [];
let sizeofBA = 0;
let inputStr = "";
let inputType = "";
let crtans = "";
let n = 0;
let sp = "";
let IntervalId;

let score = 0;
let startTime;
let wrongselect = 0;

function homePage() {
  inputStr = "";
  inputType = "";
  sp = "";
  playAudio(sp);
  var contentContainer = document.getElementById("contentContainer");
  contentContainer.innerHTML = `

         <div id="logoContainer">
         <img src="https://github.com/ShakeAbdulRub/GameAlpha/blob/main/gamealphalogo5.png?raw=true"/>
         Game Alpha

    </div>
    <br><br>
         <div id="Type">
         <label for="checkboxCap">
                     <input type="checkbox" id="checkboxCap" value="1"  checked />
                     Capital Alphabets
                  </label>
         <label for="checkboxSmall">
                     <input type="checkbox" id="checkboxSmall" value="0"  checked/>
                     Small Alphabets
                  </label>

         </div>

               <div class="dropdown" onclick="showOptions()"> Select Alphabets${"       "}<?xml version="1.0" encoding="UTF-8"?><svg width="25px" height="25px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M8.5 11L12 14.5L15.5 11" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>  
</div>
<div id="options">

    <div class="row" id="checkboxRow"></div>
</div>

               <button class="btn-grad" onclick="startGame()"> StartGame </button>
               <p><b>
                <ol>
                Note:
  <li> Increase your device volume</li>
  <li> After starting game Click on letters dictated</li>
  <li> If you Click on 3 wrong letters game will end</li>
</ol></b>
               </P>

        &#169; Developed by Shake Abdul Rub

         `;

  generateAlphabetCheckboxes();
}

function generateAlphabetCheckboxes() {
  const checkboxRow = document.getElementById("checkboxRow");

  const selectAllLabel = document.createElement("label");
  selectAllLabel.setAttribute("for", "selectAll");
  selectAllLabel.innerHTML = `
        <input type="checkbox" id="selectAll" value="" checked onchange="toggleAllCheckboxes(this)" />
        Select All
    `;
  checkboxRow.appendChild(selectAllLabel);

  checkboxRow.appendChild(document.createElement("br"));

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    const letter = String.fromCharCode(i);

    const label = document.createElement("label");
    label.setAttribute("for", `checkbox${letter}`);
    label.innerHTML = `
            <input type="checkbox" id="checkbox${letter}" value="${letter}" checked onclick="updateSelectAllCheckbox()" />
            ${letter}
        `;

    checkboxRow.appendChild(label);
  }
}

function toggleAllCheckboxes(selectAllCheckbox) {
  var checkboxes = document.querySelectorAll('.row input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = selectAllCheckbox.checked;
  });
}
function updateSelectAllCheckbox() {
  var selectAllCheckbox = document.getElementById("selectAll");
  var checkboxes = document.querySelectorAll('.row input[type="checkbox"]');
  selectAllCheckbox.checked = Array.from(checkboxes).every(function (checkbox) {
    return checkbox.checked;
  });
}

function showOptions() {
  var options = document.getElementById("options");

  if (showCheckBoxes) {
    options.style.display = "flex";
    showCheckBoxes = !showCheckBoxes;
  } else {
    options.style.display = "none";
    showCheckBoxes = !showCheckBoxes;
  }
}

function getOptions() {
  var selectedOptions = document.querySelectorAll(
    "#options input[type=checkbox]:checked"
  );
  var selectedType = document.querySelectorAll(
    "#Type input[type=checkbox]:checked"
  );

  for (var i = 0; i < selectedOptions.length; i++) {
    inputStr = inputStr + selectedOptions[i].value;
  }
  
  for (var i = 0; i < selectedType.length; i++) {
    inputType = inputType + selectedType[i].value;
  }
}

function startGame() {
  score = 0;
  wrongselect = 0;
  objectNames = [];
  bigArray = [];
  sizeofBA = 0;

  crtans = "";
  n = 0;

  getOptions();
  var contentContainer = document.getElementById("contentContainer");
  contentContainer.innerHTML = `
         <div id="gamediv">

         <p id="timer">Time: 1:20</p>
         <p id="score">Score: 0</p>
          <p id="wrongselect">wrongselect: 0</p>
    <div id="objects-container"></div>
    <audio id="audio" controls style="display: none">
        <source src="object3.mp3" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>

        </div>
<br><br>
<button class="btn-grad"  onclick="replayAudio()">Replay Voice</button>
<br> &#169; Developed by Shake Abdul Rub`;

  onGame();
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function playAudio(text) {
  const audio = new SpeechSynthesisUtterance();
  audio.text = text;

  const indianEnglishVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => {
      return voice.name === "Microsoft Ravi - English (India)";
    });

  audio.voice = indianEnglishVoice;
  window.speechSynthesis.speak(audio);
}

function replayAudio() {
  playAudio(sp);
}

function onGame() {
  startTime = new Date();

  setBigArray();
  setObjectNames();
  showObjects();
  updateTimer();
}

function setBigArray() {
  bigArray = selectRandomWords(inputStr, Number(inputType));
}
function generateWords(letter, type, k) {
  const words = [];

  for (let i = 0; i < k; i++) {
    const r = Math.floor(Math.random() * 2);

    const fifthLetter =
      type === 0
        ? letter.toLowerCase()
        : type === 1
        ? letter.toUpperCase()
        : r === 0
        ? letter.toLowerCase()
        : letter.toUpperCase();

    var otherLetters = [];
    do {
      otherLetters = [];

      for (let j = 0; j < 3; j++) {
        let randomLetter;
        const randomCase = Math.random() > 0.5 ? 65 : 97;
        randomLetter = String.fromCharCode(
          Math.floor(Math.random() * 26) + randomCase
        );
        otherLetters.push(randomLetter);
      }
    } while (otherLetters.includes(fifthLetter));

    const randomPosition = Math.floor(Math.random() * 4);
    otherLetters.splice(randomPosition, 0, fifthLetter);

    const word = otherLetters.join("");

    words.push(word + fifthLetter);
  }

  return words;
}

function selectRandomWords(series, type) {
  const selectedWords = [];

  for (const letter of series) {
    const generatedWords = generateWords(
      letter,
      type,
      Math.ceil(80 / series.length)
    );

    generatedWords.sort(() => Math.random() - 0.5);

    selectedWords.push(
      ...generatedWords.slice(0, Math.ceil(80 / series.length))
    );
    
  }

  selectedWords.sort(() => Math.random() - 0.5);

  return selectedWords.slice(0, 80);
}

function setObjectNames() {
  var tempstr = bigArray[n];
  objectNames = tempstr.substring(0, 4).split("");
  crtans = tempstr[4];
}

function showObjects() {
  shuffleArray(objectNames);
  const objectsContainer = document.getElementById("objects-container");
  objectsContainer.innerHTML = "";

  if (wrongselect === 3 || new Date() - startTime > 80000 || n > 79) {
    endGame();
    return;
  }

  for (const name of objectNames) {
    const button = document.createElement("button");
    button.textContent = name;
    button.id = "objectbutton";
    button.className = "button-64";
    button.addEventListener("click", () => checkAnswer(name));
    objectsContainer.appendChild(button);
  }
  sp = "";
  if (crtans === crtans.toLowerCase()) {
    sp = sp + "Small" + " " + crtans;
  } else {
    sp = sp + "Capital" + " " + crtans;
  }

  playAudio(sp);
}

function checkAnswer(selectedObject) {
  n++;
  if (selectedObject === crtans) {
    score++;
  } else {
    wrongselect++;
  }

  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById(
    "wrongselect"
  ).textContent = `wrongselect: ${wrongselect}`;

  if (wrongselect == 3 || new Date() - startTime > 80000 || n > 79) {
    
    endGame();
  } else {
    setObjectNames();
    showObjects();
  }
}

function updateTimer() {
  const timerElement = document.getElementById("timer");

  function formatTime(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function update() {
    const elapsed = new Date() - startTime;
    const remaining = Math.max(0, 80000 - elapsed);
    timerElement.textContent = `Time: ${formatTime(remaining)}`;

    if (remaining === 0) {
     
      endGame();
    }
  }

  intervalId = setInterval(update, 1000);
}
function getRandomNumber(n) {
  if (typeof n !== "number" || n <= 0) {
    
    return null;
  }

  const randomNumber = Math.floor(Math.random() * n);

  return randomNumber;
}

function endGame() {
  clearInterval(intervalId);

  var contentContainer = document.getElementById("contentContainer");

  contentContainer.innerHTML = `
         <div id="gamediv">
         <h1 style="color:#2980b9; font-family:'Courier New',monospace;">Game Over<h1>

         <div id="imageContainer">

    </div>

         <p id="scored">Score: 0</p>
         <button class="btn-grad" onclick="startGame()"> New Game </button>
          <button class="btn-grad" onclick="homePage()"> Home </button>
	  <br>
       <img style="width:40px; height:40px;"  src="./developerImage.jpeg">
          <a href="https://www.linkedin.com/in/shake-abdul-rub" style="font-size: 20px;">Linked In</a>
          </div>

        &#169; Developed by Shake Abdul Rub

         `;
  const imgarr1 = ["crying-emoji-3.gif", "cryingnobitha.gif", "cryingtom.gif"];
  const imgarr2 = [
    "minidoranice.gif",
    "cockrojesenjoyingatbeach.gif",
    "kidvskat.gif",
    "dancingjaggu.gif",
    "goodjobbychotb.gif",
    "singingchinchan.gif",
    "kidvskatclapping.gif",
    "duckangjryycongtats.gif",
    "doremoncongrats.gif",
    "sinchandancing.gif",
    "minidoragogo.gif",
    "jerryandduckdancing.gif",
    "amazingchinchan.gif",
    "tomcongratsjerry.gif",
    "awesomebychotabeem.gif"
  ];
  const imgarr3 = ["chotabeemwithtropy.gif", "yourethebesttropy.gif"];
  var imageContainer = document.getElementById("imageContainer");
  if (score > 45) {
    var imid = getRandomNumber(2);
    var hino = "./" + imgarr3[imid];
    imageContainer.innerHTML = `<img src=${hino}>`;
  } else if (score > 9) {
    var imid = getRandomNumber(15);
    var hino = "./" + imgarr2[imid];
    imageContainer.innerHTML = `<img src=${hino}>`;
  } else {
    var imid = getRandomNumber(3);
    var hino = "./" + imgarr1[imid];
    imageContainer.innerHTML = `<img src=${hino}>`;
  }
  document.getElementById("scored").textContent = `Score: ${score}`;
}

homePage();
