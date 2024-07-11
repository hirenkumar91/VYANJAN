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

// form start

// start : button for adding ingredients
function addIngredients() {
  const field = document.getElementById("ingredientFieldset");
  const fieldDiv = document.createElement("div");
  fieldDiv.setAttribute("id", "ingredientContainer");
  field.appendChild(fieldDiv);

  // name field
  const nameField = document.createElement("input");
  nameField.setAttribute("id", "ingridiant");
  nameField.setAttribute("placeholder", "Insert Ingridiant Name");
  nameField.setAttribute("type", "text");
  nameField.setAttribute("required", "");
  nameField.style.margin = "10px";
  fieldDiv.appendChild(nameField);

  // amount field
  const inputAmount = document.createElement("input");
  inputAmount.setAttribute("id", "ingredientAmount");
  inputAmount.setAttribute("placeholder", "Amount");
  inputAmount.setAttribute("type", "text");
  inputAmount.setAttribute("required", "");
  inputAmount.style.margin = "10px";
  fieldDiv.appendChild(inputAmount);
}
// Start: function to enable & disable button on adding minimum 5 ingridiants.

// Click counter
let clickCount = 0;

// Get the button elements
const btnClickCount = document.getElementById("btnIngredients");
const submitButton = document.getElementById("submitbTn");
const highlighter = document.getElementById("text-warning");

function countClick() {
  clickCount++;
  console.log(clickCount);

  // Enable or disable the submit button based on click count
  if (clickCount < 5) {
    submitButton.setAttribute("disabled", ""); // Disable the button
    highlighter.style.color = "red";
  } else {
    submitButton.removeAttribute("disabled"); // Enable the button
    highlighter.style.color = "green";
  }
}
// Add event listener to the click button
btnClickCount.addEventListener("click", countClick);

//Form End

// function to handle form Submission

// Display message on form submission

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
