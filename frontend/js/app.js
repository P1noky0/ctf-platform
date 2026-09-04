import { challenges } from "./data/challenges.js";
import { renderChallenges } from "./modules/challenges.js";
//Application state
import { state } from "./modules/state.js";
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

//1. display the challenges in the object challenges
//2. getting from html and update the score
//3. let the button can have filter function
const challengeList = document.getElementById("challengeList");
const scoreDisplay = document.getElementById("scoreDisplay");
const filterButtons = document.querySelectorAll("#challengeFilters button");

//Logic 

renderChallenges(
    challenges,
    state.selectedCategory,
    challengeList,
    filterButtons,
    showChallengeDetails);

updateScore();

//Show details
function showChallengeDetails(challenge) {
    state.selectedChallenge = challenge;

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

    document.getElementById("challengeDetails").scrollIntoView({
        behavior: "smooth"
    });
}

//Show workspace
function showChallengeWorkspace() {
    const challengeWorkspaceContent = 
        document.getElementById("challengeWorkspaceContent");

    challengeWorkspaceContent.innerHTML = `
        <h3>${state.selectedChallenge.title}</h3>
        <p>
            ${state.selectedChallenge.description}
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
        
        document.getElementById("challengeWorkspace").scrollIntoView({
            behavior: "smooth"
        });
        
}

// Receive input(which is the input id) and submissionStatus
// Valify the input which the selected challenge flag and overwrite the submissionStatus 
function submitFlag() {
    const flagInput = document.getElementById("flagInput");
    const submissionStatus = 
        document.getElementById("submissionStatus");

    const submittedFlag = flagInput.value.trim();

    if (submittedFlag !== state.selectedChallenge.flag) {
        submissionStatus.textContent = 
            "Incorrect flag. Try again."; 
        return;
    }

    if (state.selectedChallenge.solved) {
        submissionStatus.textContent = 
            "Challenge already solved.";
        
        return;
    }

    state.selectedChallenge.solved = true;

    state.score = state.score + state.selectedChallenge.points;

    updateScore();

    renderChallenges(
    challenges,
    state.selectedCategory,
    challengeList,
    filterButtons,
    showChallengeDetails);

    submissionStatus.textContent = 
        `Correct flag! You earned ${state.selectedChallenge.points} points.`;
}

function updateScore(){
    scoreDisplay.textContent = state.score;
}

filterButtons.forEach(function (button){
    button.addEventListener("click",function(){

        state.selectedCategory = button.dataset.category;
        
        renderChallenges(
            challenges,
            state.selectedCategory,
            challengeList,
            filterButtons,
            showChallengeDetails
        );
    });
});