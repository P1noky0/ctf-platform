const startButton = document.getElementById("startButton");
const challengesSection = document.getElementById("challenges");

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
        description: "Exploit a vulnerable login system to find the hidden flag."
    },
    {
        title: "Caesar Cipher",
        category: "Cryptography",
        difficulty: "Easy",
        points: 100,
        description: "Decrypt the encoded message and recover the flag."
    },
    {
        title: "Hidden Image",
        category: "Forensics",
        difficulty: "Easy",
        points: 150,
        description: "Investigate an image file and search for hidden information."
    }
];

const challengeList = document.getElementById("challengeList");

//Logic
challenges.forEach(function (challenge) {
    const card = document.createElement("div");

    card.classList.add("challenge-card");

    card.innerHTML = `
        <h3>${challenge.title}</h3>
        <p>Category: ${challenge.category}</p>
        <p>Difficulty: ${challenge.difficulty}</p>
        <p>Points: ${challenge.points}</p>
    `;

    card.addEventListener("click", function () {
        showChallengeDetails(challenge);
    });

    challengeList.appendChild(card);
});

function showChallengeDetails(challenge) {
    const challengeDetailsContent =
        document.getElementById("challengeDetailsContent");

    challengeDetailsContent.innerHTML = `
        <h3>${challenge.title}</h3>

        <p><strong>Category:</strong> ${challenge.category}</p>
        <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
        <p><strong>Points:</strong> ${challenge.points}</p>
        <p><strong>Description:</strong> ${challenge.description}</p>

        <button>Start Challenge</button>
    `;
}