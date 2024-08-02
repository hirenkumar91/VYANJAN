const dataUrl = "https://raw.githubusercontent.com/hirenkumar91/mYapi/main/recipiAppdata/data.json",
const recipeObject = [];

async function fetchRecipes() {
  try {
      const response = await fetch(dataUrl);
      recipeObject = await response.json();
      displayRecipes(recipeObject);
  } catch (error) {
      console.error('Error fetching recipes:', error);
  }
}

let addCount = 0;

const addIngredients = () => {
  const field = document.getElementById("ingredientFieldset");
  const fieldDiv = document.createElement("div");
  fieldDiv.className = "ingredientContainer";
  field.appendChild(fieldDiv);

  ["Name", "Amount"].forEach(type => {
    const input = document.createElement("input");
    input.className = `ingredient${type}`;
    input.placeholder = `Insert Ingredient ${type}`;
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
  event.preventDefault();

  const title = document.getElementById("recipeName").value;
  const description = document.getElementById("discription").value;
  const ingredients = Array.from(document.querySelectorAll("#ingredientFieldset .ingredientContainer"))
    .map(container => ({
      NAME: container.querySelector(".ingredientName").value,
      AMOUNT: container.querySelector(".ingredientAmount").value
    }));

  const newRecipe = {
    id: recipeObject.length + 1,
    title,
    picture_url: document.getElementById("imageUplode").files[0] ? URL.createObjectURL(document.getElementById("imageUplode").files[0]) : "",
    ingredients,
    description
  };

  recipeObject.push(newRecipe);
  document.getElementById("newRecipeform").reset();
  document.querySelectorAll("#ingredientFieldset .ingredientContainer").forEach(container => container.remove());
  addCount = 0;
  document.getElementById("submitbTn").disabled = true;
  document.getElementById("text-warning").textContent = "Minimum 5 Ingredients";
  document.getElementById("formSubmitMessage").style.display = "block";
  displayRecipes(recipeObject);
};

const closeButton = () => {
  document.querySelectorAll(".closeBtn").forEach(element => element.style.display = "none");
};

let isAscending = true;

const displayRecipes = (recipes) => {
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
};

const findRecipe = () => {
  const searchKey = document.getElementById("searchkey").value.toLowerCase();
  const filteredRecipes = searchKey.trim() === ''
    ? recipeObject
    : recipeObject.filter(recipe => recipe.title.toLowerCase().includes(searchKey));

  displayRecipes(filteredRecipes);

  if (filteredRecipes.length === 0) {
    showPopup('No recipes found');
} else {
    hidePopup();
}
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