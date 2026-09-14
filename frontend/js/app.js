import { challenges } from "./data/challenges.js";
import { renderChallenges } from "./modules/challenges.js";
//Application state
import { state } from "./modules/state.js";
import { addScore } from "./modules/scoring.js";
import { renderChallengeDetails } from "./modules/challengeDetails.js";
import { renderChallengeWorkspace } from "./modules/challengeWorkspace.js";
import { checkFlag } from "./modules/flagValidation.js";
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

renderChallenges({
    challenges,
    selectedCategory: state.selectedCategory,
    challengeList,
    filterButtons,
    showChallengeDetails
});

updateScore();

//Show details
function showChallengeDetails(challenge) {
    state.selectedChallenge = challenge;

    const challengeDetailsContent =
        document.getElementById("challengeDetailsContent");

    renderChallengeDetails(challenge, challengeDetailsContent);

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

    renderChallengeWorkspace(
        state.selectedChallenge, 
        challengeWorkspaceContent
    );

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

    if (!checkFlag(state.selectedChallenge, submittedFlag)) {
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

    addScore(state, state.selectedChallenge.points);

    updateScore();

    renderChallenges({
        challenges,
        selectedCategory: state.selectedCategory,
        challengeList,
        filterButtons,
        showChallengeDetails
    });

    submissionStatus.textContent = 
        `Correct flag! You earned ${state.selectedChallenge.points} points.`;
}

function updateScore(){
    scoreDisplay.textContent = state.score;
}

filterButtons.forEach(function (button){
    button.addEventListener("click",function(){

        state.selectedCategory = button.dataset.category;
        
        renderChallenges({
            challenges,
            selectedCategory: state.selectedCategory,
            challengeList,
            filterButtons,
            showChallengeDetails
        });
    });
});