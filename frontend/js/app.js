const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function () {
    alert("Challenge section coming soon!");
});
//Data
const challenges = [
    {
        title: "SQL Injection",
        category: "Web",
        difficulty: "Easy",
        points: 100
    },
    {
        title: "Caesar Cipher",
        category: "Cryptography",
        difficulty: "Easy",
        points: 100
    },
    {
        title: "Hidden Image",
        category: "Forensics",
        difficulty: "Easy",
        points: 150
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

    challengeList.appendChild(card);
});