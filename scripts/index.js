//Apply Style based on screen Size.
function loadDeviceStyle(href){
  let link= document.createElement('link');
  link.rel ="stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function applyDeciceStyle (){
  if (window.innerWidth <= 768) {
    loadDeviceStyle('./Style/mobile.css');
} else if (window.innerWidth <= 1024) {
  loadDeviceStyle('./Style/teblet.css');
} else {
  loadDeviceStyle('./Style/desktop.css');
}
}

window.addEventListener("resize",applyDeciceStyle);
window.addEventListener("load",applyDeciceStyle);

//


const dataUrl = 'https://raw.githubusercontent.com/hirenkumar91/mYapi/main/recipiAppdata/data.json';
const priceDataurl ='https://raw.githubusercontent.com/hirenkumar91/mYapi/main/recipiAppdata/priceData.json';
let recipeObject = [];
let ingredienTPrice =[];

let addCount = 0;

async function fetchRecipes() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const text = await response.text();
    try {
      recipeObject = JSON.parse(text);
      displayRecipes(recipeObject);
    } catch (jsonError) {
      throw new Error('Failed to parse JSON: ' + jsonError.message);
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}


async function fetchIngridiants() {
  try {
    const response = await fetch(priceDataurl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const text = await response.text();
    try {
      ingredienTPrice = JSON.parse(text);

    } catch (jsonError) {
      throw new Error('Failed to parse JSON: ' + jsonError.message);
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }

  console.log(ingredienTPrice);
}





function addIngredients() {
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
  updateSubmitButtonState();
}

function updateSubmitButtonState() {
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
}

function submitForm(event) {
  event.preventDefault();
  
  const respondMessage = document.getElementById("formSubmitMessage");
  respondMessage.style.display = "none";

  const title = document.getElementById("recipeName").value.trim();
  const description = document.getElementById("discription").value.trim();
  const imageFile = document.getElementById("imageUplode").files[0];

  if (!validateForm(title, description, imageFile, respondMessage)) return;

  const ingredients = getIngredients();
  const newRecipe = createNewRecipe(title, description, imageFile, ingredients);
  
  recipeObject.push(newRecipe);
  resetForm();
  respondMessage.style.display = "block";
  respondMessage.innerText = "Thank You for filling up form";
  //displayRecipes(recipeObject);
}

function validateForm(title, description, imageFile, respondMessage) {
  if (!title) return showErrorMessage(respondMessage, "Please fill up the recipe title.");
  if (!imageFile) return showErrorMessage(respondMessage, "Please upload an image.");
  if (!description) return showErrorMessage(respondMessage, "Please fill up the description.");
  if (!validateIngredients()) return showErrorMessage(respondMessage, "Please fill up ingredient details.");
  return true;
}

function showErrorMessage(respondMessage, message) {
  respondMessage.style.display = "block";
  respondMessage.innerText = message;
  return false;
}

function validateIngredients() {
  const ingredientContainers = document.querySelectorAll("#ingredientFieldset .ingredientContainer");
  return Array.from(ingredientContainers).every(container => {
    const nameInput = container.querySelector(".ingredientName");
    const amountInput = container.querySelector(".ingredientAmount");
    return nameInput.value.trim() && amountInput.value.trim();
  });
}

function getIngredients() {
  return Array.from(document.querySelectorAll("#ingredientFieldset .ingredientContainer")).map(container => ({
    NAME: container.querySelector(".ingredientName").value,
    AMOUNT: container.querySelector(".ingredientAmount").value
  }));
}

function createNewRecipe(title, description, imageFile, ingredients) {
  return {
    id: recipeObject.length + 1,
    title,
    picture_url: URL.createObjectURL(imageFile),
    ingredients,
    description
  };
}

function resetForm() {
  document.getElementById("newRecipeform").reset();
  document.querySelectorAll("#ingredientFieldset .ingredientContainer").forEach(container => container.remove());
  addCount = 0;
  updateSubmitButtonState();
}

function closeButton() {
  document.querySelectorAll(".closeBtn").forEach(element => element.style.display = "none");
}

let isAscending = true;

function displayRecipes(recipes) {
  const recipeDisplay = document.getElementById("recipeContainer");
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
}
function findRecipe() {
  const searchKey = document.getElementById("searchkey").value.toLowerCase().trim();
  const filteredRecipes = searchKey ? recipeObject.filter(recipe => recipe.title.toLowerCase().startsWith(searchKey)) : recipeObject;
  
  if (filteredRecipes.length === 0) showPopup('No recipes found');
  else hidePopup(),displayRecipes(filteredRecipes);
}

document.getElementById("searchkey").addEventListener("keyup",findRecipe);

function showPopup(message) {
  const popup = document.getElementById('Nofind');
  if (popup) {
    const messageElement = popup.querySelector('.popup-message');
    if (messageElement) messageElement.textContent = message;
    popup.style.display = 'block';
    popup.style.backgroundColor = 'black';
  } else {
    console.error('Popup element not found.');
  }
}

function hidePopup() {
  const popup = document.getElementById('Nofind');
  if (popup) popup.style.display = 'none';
  displayRecipes(recipeObject);
}

function sortRecipesbyTitel() {
  const sortBtn = document.getElementById('sortBtn');
  const sortedRecipes = [...recipeObject].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()) * (isAscending ? 1 : -1));
  isAscending = !isAscending;
  sortBtn.textContent = isAscending ? 'Z to A' : 'A to Z';
  displayRecipes(sortedRecipes);
}

function typeWriter(elementId, text, index = 0, typingSpeed = 50, callback) {
  if (index < text.length) {
    document.getElementById(elementId).innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(elementId, text, index + 1, typingSpeed, callback), typingSpeed);
  } else if (callback) callback();
}

let startTime;
let timerInterval;

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsedTime = new Date(new Date() - startTime);
  const hours = String(elapsedTime.getUTCHours()).padStart(2, '0');
  const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0');
  document.getElementById('timer').textContent = `${hours}:${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

window.onload = function() {
  startTimer();
  fetchRecipes();
  typeWriter("p1", "Welcome to Vyanjan, your ultimate destination for a world of delightful recipes. Here, we gather and share a diverse collection of recipes from around the globe, bringing together flavors that inspire and satisfy.", 0, 50, () => {
    typeWriter("p2", "Whether you are a culinary novice or a seasoned chef, Vyanjan is here to guide you through every step of your cooking journey. Our extensive recipe collection offers something for everyone, from traditional dishes that bring comfort to modern creations that ignite curiosity.", 0, 50, () => {
      typeWriter("p3", "Join our community of food enthusiasts and embark on a culinary adventure. Explore new tastes, share your favorite recipes, and connect with others who share your passion for cooking. Welcome to Vyanjan, where every recipe tells a story and every meal is a celebration!", 0, 50);
    });
  });
  fetchIngridiants();
};

document.addEventListener('DOMContentLoaded', () => updateCountdownDisplay(0, document.getElementById('timerCountdown')));

document.getElementById('startTimer').addEventListener('click', startCookingTimer);

function startCookingTimer() {
  let timeInMinutes = parseInt(document.getElementById('cookingTime').value, 10);
  document.getElementById("timerCountdown").style.display = "block";
  if (isNaN(timeInMinutes) || timeInMinutes < 0) {
    alert("Enter a valid number");
    document.getElementById('cookingTime').value = 0;
    updateCountdownDisplay(0, document.getElementById('timerCountdown'));
    return;
  }
  startStopwatch(timeInMinutes * 60);
}

function startStopwatch(duration) {
  const alarmSound = document.getElementById('alarmSound');
  const countdownElement = document.getElementById('timerCountdown');
  let timeRemaining = duration;
  updateCountdownDisplay(timeRemaining, countdownElement);

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
  const counthours = Math.floor(seconds / 3600);
  const countminutes = Math.floor((seconds % 3600) / 60);
  const countremainingSeconds = seconds % 60;
  element.textContent = `${String(counthours).padStart(2, '0')}:${String(countminutes).padStart(2, '0')}:${String(countremainingSeconds).padStart(2, '0')}`;
}
