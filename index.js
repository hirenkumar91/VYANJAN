const recipeObject = [
  {
    id: 1,
    title: "Gløgg",
    picture_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Gl%C3%B6gg_kastrull.JPG/800px-Gl%C3%B6gg_kastrull.JPG",
    ingredients: [
      { NAME: "Orange zest", AMOUNT: "0.5" },
      { NAME: "Water", AMOUNT: "200 ml" },
      { NAME: "Sugar", AMOUNT: "275 g" },
      { NAME: "Whole cloves", AMOUNT: "5" },
      { NAME: "Cinnamon sticks", AMOUNT: "2" },
      { NAME: "Spice", AMOUNT: undefined },
      { NAME: "Bottle of red wine", AMOUNT: "1" },
      { NAME: "Raisins", AMOUNT: "100 g" },
      { NAME: "Slipped Almonds", AMOUNT: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  displayRecipe(recipeObject);
});

// Recipe Card start

function displayRecipe(recipe) {
  const recipeObject = recipe[0]; // Assuming 'recipe' is an array and we are using the first element
  const recipeDisplay = document.getElementById("recipeContainer");

  const ingredientsListHTML = recipeObject.ingredients
    .map(
      (ingredient) =>
        `<li style="list-style-type: none;">${ingredient.NAME}: ${ingredient.AMOUNT}</li>`
    )
    .join("");

  recipeDisplay.innerHTML = `
  <div class="card">
    <img src="${recipeObject.picture_url}" alt="${recipeObject.title}">
  <h1 id="recipeTitle">${recipeObject.title}</h1>
  <div id="recipeCard" style="display: flex; flex-direction: column-reverse; font-size: 1.5rem;">
    <div class="ingridientlist">
    <h3>ingridients</h3>
      <ul>${ingredientsListHTML}</ul>
    </div>
    <div class="card-details" id="discriptin">
    <h3>Prepration</h3>
      <p>${recipeObject.description}</p>
    </div>
  </div>
  </div>

  `;
}

// function for adding ingredients.
//functionality to enable & disable submit button.

let addCount = 0;

function addIngredients() {
  const field = document.getElementById("ingredientFieldset");
  const fieldDiv = document.createElement("div");
  fieldDiv.setAttribute("class", "ingredientContainer");
  field.appendChild(fieldDiv);

  // Name field
  const nameField = document.createElement("input");
  nameField.setAttribute("class", "ingredientName");
  nameField.setAttribute("placeholder", "Insert Ingredient Name");
  nameField.setAttribute("type", "text");
  nameField.setAttribute("required", "");
  nameField.style.margin = "10px";
  fieldDiv.appendChild(nameField);

  // Amount field
  const inputAmount = document.createElement("input");
  inputAmount.setAttribute("class", "ingredientAmount");
  inputAmount.setAttribute("placeholder", "Amount");
  inputAmount.setAttribute("type", "text");
  inputAmount.setAttribute("required", "");
  inputAmount.style.margin = "10px";
  fieldDiv.appendChild(inputAmount);

  // Increment ingredient count
  addCount++;
  const submitButton = document.getElementById("submitbTn");
  const highlighter = document.getElementById("text-warning");

  if (addCount < 5) {
    submitButton.setAttribute("disabled", ""); // Disable the button
    highlighter.style.color = "red";
    highlighter.textContent = "Minimum 5 Ingredients";
  } else {
    submitButton.removeAttribute("disabled"); // Enable the button
    highlighter.style.color = "green";
    highlighter.textContent = "You can now submit!";
  }
}


function submitForm(event) {
  event.preventDefault();
  
  const title = document.getElementById("recipeName").value;
  console.log(title);
  const description = document.getElementById("discription").value;

  const ingredients = [];
  const ingredientInputs = document.querySelectorAll("#ingredientFieldset .ingredientContainer");

  ingredientInputs.forEach(container => {
    const nameInput = container.querySelector(".ingredientName");
    const amountInput = container.querySelector(".ingredientAmount");
    
    ingredients.push({
      NAME: nameInput.value,
      AMOUNT: amountInput.value,
    });
  });

  const newRecipe = {
    id: recipeObject.length + 1,
    title,
    picture_url: document.getElementById("imageUplode").files[0] ? URL.createObjectURL(document.getElementById("imageUplode").files[0]) : "",
    ingredients,
    description,
  };

  recipeObject.push(newRecipe);
  document.getElementById("formSubmitMessage").style.display = "block";
  console.log(recipeObject); // Display the updated recipeObject
}


// close button function

function closeButton() {
  var elements = document.getElementsByClassName("closeBtn");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}