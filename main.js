const activityContainer = document.querySelector("#activity-container");
const toggleButtons = Array.from(document.querySelector(".toggle-buttons").children);

let timeframes = [];

fetch("data.json")
  .then((response) => response.json())
  .then((responseData) => {
    responseData.forEach((cardData) => {
      timeframes.push({
        cardID: cardData.title.toLowerCase().replace(" ", "-"), 
        tf: cardData.timeframes
      });
    });

    const activityCards = Array.from(activityContainer.children);

    function editTimeframe(cardElement, timeframe) {
      timeframes.forEach((tf) => {
        if (cardElement.id === tf.cardID) {
          cardElement.querySelector(".current").classList.remove("appear");
          cardElement.querySelector(".previous").classList.remove("appear");

          cardElement.querySelector(".current").classList.add("fade");
          cardElement.querySelector(".previous").classList.add("fade");

          setTimeout(() => {
            cardElement.querySelector(".current").textContent = `${tf.tf[timeframe].current}hrs`;
            cardElement.querySelector(".previous").textContent = `Last ${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} - ${tf.tf[timeframe].previous}hrs`;

            cardElement.querySelector(".current").classList.remove("fade");
            cardElement.querySelector(".previous").classList.remove("fade");

            cardElement.querySelector(".current").classList.add("appear");
            cardElement.querySelector(".previous").classList.add("appear");
          }, 505);
        }
      });
    }

    toggleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        toggleButtons.forEach((btn) => btn.classList.remove("active-btn"));
        button.classList.add("active-btn");

        activityCards.forEach((card) => editTimeframe(card, button.id));
      });
    });

    // Default view setup
    toggleButtons.find((btn) => btn.id === "weekly").click();
  })
  .catch((error) => console.error("Error fetching JSON data:", error));