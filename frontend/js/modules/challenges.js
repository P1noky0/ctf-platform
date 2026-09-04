
//Generate cards for each challenge
export function renderChallenges(
    challenges,
    selectedCategory,
    challengeList,
    filterButtons,
    showChallengeDetails
) {
    //Update active filter button
    filterButtons.forEach(function(button) {
        if(button.dataset.category === selectedCategory) {
            button.classList.add("active-filter");
        } else {
            button.classList.remove("active-filter");
        }
    });

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