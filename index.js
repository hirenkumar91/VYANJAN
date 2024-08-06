
const dataUrl = 'https://raw.githubusercontent.com/hirenkumar91/mYapi/main/recipiAppdata/data.json';


let recipeObject = [];
let addCount = 0;

async function fetchRecipes() {
  try {
      const response = await fetch(dataUrl);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const text = await response.text();
      
      // Log and check response text
      
      // Attempt to parse JSON
      try {
          recipeObject = JSON.parse(text);
      } catch (jsonError) {
          throw new Error('Failed to parse JSON: ' + jsonError.message);
      }
      
      displayRecipes(recipeObject);
  } catch (error) {
      console.error('Error fetching recipes:', error);
  }
}
const addIngredients = () => {
  const field = document.getElementById("ingredientFieldset");
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "ingredientContainer";
  field.appendChild(fieldDiv);

  ["Name", "Amount"].forEach(type => {
    const input = document.createElement("input");
    input.className = `ingredient${type}`;
    input.placeholder = `Insert ${type}`;
    input.type = "text";
    input.required = true;
    input.style.margin = "10px";
    fieldDiv.appendChild(input);
  });

  addCount++;
  const submitButton = document.getElementById("submitbTn");
  const highlighter = document.getElementById("text-warning");

  if (addCount < 5) {
    submitButton.disabled = true;
    highlighter.style.color = "red";
    highlighter.textContent = "Minimum 5 Ingredients";
  } else {
    submitButton.disabled = false;
    highlighter.style.color = "green";
    highlighter.textContent = "You can now submit!";
  }
};

const submitForm = (event) => {

  event.preventDefault();  // Prevent form submission
  
  const respondMessage = document.getElementById("formSubmitMessage");
  respondMessage.style.display = "none"; // Hide the message initially

  const title = document.getElementById("recipeName").value.trim();
  const description = document.getElementById("discription").value.trim();
  const imageFile = document.getElementById("imageUplode").files[0];

  let validForm = true;

  // Validate title
  if (!title) {
    validForm = false;
    respondMessage.style.display = "block";
    respondMessage.innerText = "Please fill up the recipe title.";
    return;
  }

  // Validate image
  if (!imageFile) {
    validForm = false;
    respondMessage.style.display = "block";
    respondMessage.innerText = "Please upload an image.";
    return;
  }

  // Validate description
  if (!description) {
    validForm = false;
    respondMessage.style.display = "block";
    respondMessage.innerText = "Please fill up the description.";
    return;
  }

  // Validate ingredients
  const ingredientContainers = Array.from(document.querySelectorAll("#ingredientFieldset .ingredientContainer"));
  let validIngredients = true;
  ingredientContainers.forEach(container => {
    const nameInput = container.querySelector(".ingredientName");
    const amountInput = container.querySelector(".ingredientAmount");
    if (!nameInput.value.trim() || !amountInput.value.trim()) {
      validIngredients = false;
    }
  });

  if (!validIngredients) {
    validForm = false;
    respondMessage.style.display = "block";
    respondMessage.innerText = "Please fill up ingredient details.";
    return;
  }

  if (!validForm) {
    return;
  }

  // Proceed to collect ingredient data since validation passed
  const ingredients = ingredientContainers.map(container => ({
    NAME: container.querySelector(".ingredientName").value,
    AMOUNT: container.querySelector(".ingredientAmount").value
  }));

  const newRecipe = {
    id: recipeObject.length + 1,
    title,
    picture_url: URL.createObjectURL(imageFile),
    ingredients,
    description
  };

  recipeObject.push(newRecipe);
  document.getElementById("newRecipeform").reset();
  document.querySelectorAll("#ingredientFieldset .ingredientContainer").forEach(container => container.remove());
  addCount = 0;
  document.getElementById("submitbTn").disabled = true;
  document.getElementById("text-warning").textContent = "Minimum 5 Ingredients";
  respondMessage.style.display = "block";
  respondMessage.innerText= "Thank You for filling up form";
  displayRecipes(recipeObject);
};

const closeButton = () => {
  document.querySelectorAll(".closeBtn").forEach(element => element.style.display = "none");
};

let isAscending = true;
const findRecipe = () => {
  const searchKey = document.getElementById("searchkey").value.toLowerCase().trim();
  console.log("Search Key:", searchKey);

  // Filter recipes based on search key
  const filteredRecipes = searchKey === ''
    ? recipeObject
    : recipeObject.filter(recipe => recipe.title.toLowerCase().includes(searchKey));
  
  console.log("Filtered Recipes:", filteredRecipes);

  // Display the filtered recipes
  displayRecipes(filteredRecipes);

  // Show or hide the popup based on the number of filtered recipes
  if (filteredRecipes.length === 0) {
    showPopup('No recipes found');
  } else {
    hidePopup();
  }
};
const displayRecipes = (recipes) => {
  const recipeDisplay = document.getElementById("recipeContainer");

  // Clear previous content
  recipeDisplay.innerHTML = '';

  // Generate HTML for each recipe and join them
  recipeDisplay.innerHTML = recipes.map(recipe => `
    <div class="card">
      <img src="${recipe.picture_url}" alt="${recipe.title}">
      <h1>${recipe.title}</h1>
      <div class="popup-content">
        <span class="close-button" id="closeBtn">&times;</span>
        <div class="ingredientlist">
          <h3>Ingredients</h3>
          <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient.NAME}: ${ingredient.AMOUNT || 'N/A'}</li>`).join('')}</ul>
        </div>
        <div class="card-details" id="description">
          <h3>Preparation</h3>
          <p>${recipe.description}</p>
        </div>
      </div>
    </div>
  `).join('');
};


function showPopup(message) {
  const popup = document.getElementById('Nofind');
  if (popup) {
      const messageElement = popup.querySelector('.popup-message');
      if (messageElement) {
          messageElement.textContent = message;
      } else {
          console.error('Popup message element not found.');
      }
      popup.style.display = 'block';
      popup.style.backgroundColor = 'black';
  } else {
      console.error('Popup element not found.');
  }
}

function hidePopup() {
  const popup = document.getElementById('Nofind');
  if (popup) {
      popup.style.display = 'none';
  }
  displayRecipes(recipeObject);
};

function sortRecipes() {
  const sortBtn = document.getElementById('sortBtn');
  const sortedRecipes = [...recipeObject].sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return isAscending ? -1 : 1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return isAscending ? 1 : -1;
      return 0;
  });


  isAscending = !isAscending;

  // Update button text
  sortBtn.textContent = isAscending ? 'Z to A' : 'A to Z';

  // Display the sorted recipes
  displayRecipes(sortedRecipes);
}

//Typewriter effect 

const typeWriter = (elementId, text, index = 0, typingSpeed = 50, callback) => {
  if (index < text.length) {
    document.getElementById(elementId).innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(elementId, text, index + 1, typingSpeed, callback), typingSpeed);
  } else if (callback) {
    callback();
  }
};


// Timer Function

let startTime;
let timerInterval;

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const now = new Date();
  const elapsedTime = new Date(now - startTime);

  const hours = String(elapsedTime.getUTCHours()).padStart(2, '0');
  const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');

  document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}
// Functions to be called on windows load
window.onload = function() {
  // Timerfunction for time spent on page
  displayRecipes(recipeObject);
  startTimer();
  fetchRecipes();
  // Typewriting effect
  typeWriter(
    "p1", 
    "Welcome to Vyanjan, your ultimate destination for a world of delightful recipes. Here, we gather and share a diverse collection of recipes from around the globe, bringing together flavors that inspire and satisfy.", 
    0, 
    50, 
    () => {
      typeWriter(
        "p2", 
        "Whether you are a culinary novice or a seasoned chef, Vyanjan is here to guide you through every step of your cooking journey. Our extensive recipe collection offers something for everyone, from traditional dishes that bring comfort to modern creations that ignite curiosity.", 
        0, 
        50, 
        () => {
          typeWriter(
            "p3", 
            "Join our community of food enthusiasts and embark on a culinary adventure. Explore new tastes, share your favorite recipes, and connect with others who share your passion for cooking. Welcome to Vyanjan, where every recipe tells a story and every meal is a celebration!", 
            0, 
            50
          );
        }
      );
    }
  );
};

// Stopwatch
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the countdown display to 00:00:00 on page load
  updateCountdownDisplay(0, document.getElementById('timerCountdown'));
});

document.getElementById('startTimer').addEventListener('click',startCookingTimer);
function startCookingTimer() {
  let timeInMinutes = parseInt(document.getElementById('cookingTime').value, 10);

  document.getElementById("timerCountdown").style.display="block"
  // Handle invalid input
  if (isNaN(timeInMinutes) || timeInMinutes < 0) {
      alert("Enter a valid number");

      // Reset the input field and countdown display
      document.getElementById('cookingTime').value = 0;
      updateCountdownDisplay(0, document.getElementById('timerCountdown'));
      return;
  }

  // Convert minutes to seconds
  const timeInSeconds = timeInMinutes * 60;

  // Start the timer
  startStopwatch(timeInSeconds);
}

function startStopwatch(duration) {
  const alarmSound = document.getElementById('alarmSound');
  const countdownElement = document.getElementById('timerCountdown');
  let timeRemaining = duration;

  // Ensure timeRemaining is a number
  if (isNaN(timeRemaining) || timeRemaining < 0) {
      timeRemaining = 0;
  }

  // Update the countdown display immediately
  updateCountdownDisplay(timeRemaining, countdownElement);

  // Update the countdown every second
  const countdownInterval = setInterval(() => {
      timeRemaining--;
      if (timeRemaining < 0) {
          clearInterval(countdownInterval);
          alert('Time is up!');
          alarmSound.play();
      } else {
          updateCountdownDisplay(timeRemaining, countdownElement);
      }
  }, 1000);
}

function updateCountdownDisplay(seconds, element) {
  // Ensure seconds is a number
  if (isNaN(seconds)) {
      seconds = 0;
  }

  const counthours = Math.floor(seconds / 3600);
  const countminutes = Math.floor((seconds % 3600) / 60);
  const countremainingSeconds = seconds % 60;

  const formattedTime = [
      counthours.toString().padStart(2, '0'),
      countminutes.toString().padStart(2, '0'),
      countremainingSeconds.toString().padStart(2, '0')
  ].join(':');

  // Update the display element
  element.textContent = formattedTime;
}
