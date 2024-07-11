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
    <h1 id="recipeTitle">${recipeObject.title}</h1>
    <div id="recipeCard" style="display: flex; flex-direction: column-reverse; font-size: 1.5rem;">
      <img src="${recipeObject.picture_url}" alt="${recipeObject.title}">
      <div class="ingridientlist">
        <ul>${ingredientsListHTML}</ul>
      </div>
      <div class="card-details" id="discriptin">
        <h2>${recipeObject.description}</h2>
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

  // name field
  const nameField = document.createElement("input");
  nameField.setAttribute("class", "ingridiant");
  nameField.setAttribute("placeholder", "Insert Ingridiant Name");
  nameField.setAttribute("type", "text");
  nameField.setAttribute("required", "");
  nameField.style.margin = "10px";
  fieldDiv.appendChild(nameField);

  // amount field
  const inputAmount = document.createElement("input");
  inputAmount.setAttribute("class", "ingredientAmount");
  inputAmount.setAttribute("placeholder", "Amount");
  inputAmount.setAttribute("type", "text");
  inputAmount.setAttribute("required", "");
  inputAmount.style.margin = "10px";
  fieldDiv.appendChild(inputAmount);

  // add ingridiant count

  addCount++;
  const submitButton = document.getElementById("submitbTn");
  const highlighter = document.getElementById("text-warning");

  if (addCount < 5) {
    submitButton.setAttribute("disabled", ""); // Disable the button
    highlighter.style.color = "red";
  } else {
    submitButton.removeAttribute("disabled"); // Enable the button
    highlighter.style.color = "green";
  }
}

function submitForm(event) {
  event.preventDefault();
  document.getElementById("formSubmitMessage").style.display = "block";
}

// close button function

function closeButton() {
  var elements = document.getElementsByClassName("closeBtn");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}
