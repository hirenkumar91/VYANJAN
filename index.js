const recipeObject = [
  {
    id: 1,
    title: "Gløgg",
    picture_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: "" },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  },
  {
    id: 2,
    title: "noodles",
    picture_url: "https://www.servingdumplings.com/wp-content/uploads/2024/01/coconut-guchujang-noodle-soup-tn-fdf0b3e8.jpg",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: "" },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  },
];

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

//Typewriter effect 

const typeWriter = (elementId, text, index = 0, typingSpeed = 50, callback) => {
  if (index < text.length) {
    document.getElementById(elementId).innerHTML += text.charAt(index);
    setTimeout(() => typeWriter(elementId, text, index + 1, typingSpeed, callback), typingSpeed);
  } else if (callback) {
    callback();
  }
};

window.onload = () => {
  
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
  startTimer();
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