//1. just let the page scroll to challenges section when click the start button
const startButton = document.getElementById("startButton");
const challengesSection = document.getElementById("challenges");

//learned forEach, textContent, innerHTML, appendChild()

// Scroll to the challenges section when the start button is clicked
startButton.addEventListener("click", function () {

    challengesSection.scrollIntoView({
        behavior: "smooth"
    });
});

//Data
const challenges = [
    {
        title: "SQL Injection",
        category: "Web",
        difficulty: "Easy",
        points: 100,
        description: "Exploit a vulnerable login system to find the hidden flag.",
        flag: "CTF{sql_injection}",
        solved: false
    },
    {
        title: "Caesar Cipher",
        category: "Cryptography",
        difficulty: "Easy",
        points: 100,
        description: "Decrypt the encoded message and recover the flag.",
        flag: "CTF{caesar_cipher}",
        solved: false
    },
    {
        title: "Hidden Image",
        category: "Forensics",
        difficulty: "Easy",
        points: 150,
        description: "Investigate an image file and search for hidden information.",
        flag: "CTF{hidden_image}",
        solved: false
    }
];

//Application state
let selectedChallenge = null;
let score = 0;
let selectedCategory = "All";

//1. display the challenges in the object challenges
//2. getting from html and update the score
//3. let the button can have filter function
const challengeList = document.getElementById("challengeList");
const scoreDisplay = document.getElementById("scoreDisplay");
const filterButtons = document.querySelectorAll("#challengeFilters button");

//Logic
//Generate cards for each challenge
function renderChallenges() {
    //remove old cards
    challengeList.innerHTML = "";

    const filteredChallenges = challenges.filter(function(challenge) {
        
        if (selectedCategory === "All") {
            return true;
        }

        return challenge.category === selectedCategory;
    });

    // Filter challenges based on the selected category
    filteredChallenges.forEach(function (challenge) {
        const card = document.createElement("div");

        card.classList.add("challenge-card");

        //for css know this challenge is solved
        if (challenge.solved) {
            card.classList.add("solved");
        }

        card.innerHTML = `
            <h3>${challenge.title}</h3>
            <p>Category: ${challenge.category}</p>
            <p>Difficulty: ${challenge.difficulty}</p>
            <p>Points: ${challenge.points}</p>
        `;

        if (challenge.solved) {
            card.innerHTML += `
                <p class="solved-status">
                    ✓ Solved
                </p>
            `
        }

        card.addEventListener("click", function () {
            showChallengeDetails(challenge);
        });

        challengeList.appendChild(card);
    });
}

renderChallenges();

//Show details
function showChallengeDetails(challenge) {
    selectedChallenge = challenge;

    const challengeDetailsContent =
        document.getElementById("challengeDetailsContent");

    challengeDetailsContent.innerHTML = `
        <h3>${challenge.title}</h3>

        <p><strong>Category:</strong> ${challenge.category}</p>
        <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
        <p><strong>Points:</strong> ${challenge.points}</p>
        <p><strong>Description:</strong> ${challenge.description}</p>

        <button id="startChallengeButton">Start Challenge</button>
    `;

    const startChallengeButton =
        document.getElementById("startChallengeButton");

    startChallengeButton.addEventListener("click", function () {
        showChallengeWorkspace();
    });
}

//Show workspace
function showChallengeWorkspace() {
    const challengeWorkspaceContent = 
        document.getElementById("challengeWorkspaceContent");

    challengeWorkspaceContent.innerHTML = `
        <h3>${selectedChallenge.title}</h3>
        <p>
            ${selectedChallenge.description}
        </p>
        <label for="flagInput">Flag:</label>
        <input
            type="text"
            id="flagInput"
            placeholder="Enter your flag"
        >

        <button id="submitFlagButton">
            Submit Flag
        </button>

        <p id="submissionStatus">
            Waiting for flag submission.
        </p>

        `;

        const submitFlagButton = 
            document.getElementById("submitFlagButton");

        submitFlagButton.addEventListener("click",function (){
            submitFlag();
        });
        
}

// Receive input(which is the input id) and submissionStatus
// Valify the input which the selected challenge flag and overwrite the submissionStatus 
function submitFlag() {
    const flagInput = document.getElementById("flagInput");
    const submissionStatus = 
        document.getElementById("submissionStatus");

    const submittedFlag = flagInput.value.trim();

    // if(submittedFlag === selectedChallenge.flag) {
    //     submissionStatus.textContent = 
    //     "Correct flag! Challenge solved.";
    // } else {
    //     submissionStatus.textContent = 
    //     "Incorrect flag. Try again.";
    // }
    if (submittedFlag !== selectedChallenge.flag) {
        submissionStatus.textContent = 
            "Incorrect flag. Try again."; 
        return;
    }

    if (selectedChallenge.solved) {
        submissionStatus.textContent = 
            "Challenge already solved.";
        
        return;
    }

    selectedChallenge.solved = true;

    score = score + selectedChallenge.points;

    updateScore();

    renderChallenges();

    submissionStatus.textContent = 
        `Correct flag! You earned ${selectedChallenge.points} points.`;
}

function updateScore(){
    scoreDisplay.textContent = score;
}

filterButtons.forEach(function (button){
    button.addEventListener("click",function(){

        selectedCategory = button.dataset.category;
        
        renderChallenges();
    });
});