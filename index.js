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
  },{
    id: 2,
    title: "ABC",
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
  document.getElementById("newRecipeform").reset();

  // Clear the ingredients list
  const ingredientContainers = document.querySelectorAll("#ingredientFieldset .ingredientContainer");
  ingredientContainers.forEach(container => container.remove());

  // Reset the submit button state
  document.getElementById("submitbTn").setAttribute("disabled", ""); // Disable until 5 ingredients are added
  document.getElementById("text-warning").textContent = "Minimum 5 Ingredients"; // Reset warning message
  document.getElementById("formSubmitMessage").style.display = "block";
  displayRecipes(recipeObject);
}


// close button function

function closeButton() {
  var elements = document.getElementsByClassName("closeBtn");
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
}

function displayRecipes(recipes) {
  const recipeDisplay = document.getElementById("recipeContainer");
  
  // Clear previous content
  recipeDisplay.innerHTML = "";

  // Iterate through each recipe
  recipes.forEach(recipe => {
    const ingredientsListHTML = recipe.ingredients
      .map(ingredient => 
        `<li style="list-style-type: none;">${ingredient.NAME}: ${ingredient.AMOUNT || 'N/A'}</li>`
      )
      .join("");

    // Append each recipe's HTML
    recipeDisplay.innerHTML += `
      <div class="card">
        <img src="${recipe.picture_url}" alt="${recipe.title}">
        <h1>${recipe.title}</h1>
        <div class="popup-content">
            <span class="close-button" id="closeBtn">&times;</span>
            <div class="ingredientlist">
                <h3>Ingredients</h3>
                <ul>${ingredientsListHTML}</ul>
            </div>
            <div class="card-details" id="description">
                <h3>Preparation</h3>
                <p>${recipe.description}</p>
            </div>
        </div>
    </div>
    `;
  });
}

// Call the function to display all recipes on page load
window.onload = function() {
  displayRecipes(recipeObject);
};




const text1 = "Welcome to Vyanjan, your ultimate destination for a world of delightful recipes. Here, we gather and share a diverse collection of recipes from around the globe, bringing together flavors that inspire and satisfy.";
const text2 = "Whether you are a culinary novice or a seasoned chef, Vyanjan is here to guide you through every step of your cooking journey. Our extensive recipe collection offers something for everyone, from traditional dishes that bring comfort to modern creations that ignite curiosity.";
const text3 = "Join our community of food enthusiasts and embark on a culinary adventure. Explore new tastes, share your favorite recipes, and connect with others who share your passion for cooking. Welcome to Vyanjan, where every recipe tells a story and every meal is a celebration!";
    const typingSpeed = 50;
    let index1 = 0, index2 = 0, index3 = 0;

    function typeWriter1() {
      if (index1 < text1.length) {
        document.getElementById("p1").innerHTML += text1.charAt(index1);
        index1++;
        setTimeout(typeWriter1, typingSpeed);
      } else {
        typeWriter2();
      }
    }

    function typeWriter2() {
      if (index2 < text2.length) {
        document.getElementById("p2").innerHTML += text2.charAt(index2);
        index2++;
        setTimeout(typeWriter2, typingSpeed);
      } else {
        typeWriter3();
      }
    }

    function typeWriter3() {
      if (index3 < text3.length) {
        document.getElementById("p3").innerHTML += text3.charAt(index3);
        index3++;
        setTimeout(typeWriter3, typingSpeed);
      }
    }

    // Start typing effect on page load
    window.onload = function() {
      typeWriter1();
    }

    // Recipe Search function

    function findRecipe() {
      const searchKey = document.getElementById("searchkey").value.toLowerCase();
      if (searchKey.trim() === '') {
          // If search input is empty, display all recipes
          displayRecipes(recipeObject);
          return;
      }
  
      const filteredRecipes = recipeObject.filter(recipe =>
          recipe.title.toLowerCase().includes(searchKey)
      );
  
      // Display the filtered recipes
      displayRecipes(filteredRecipes);
  }
  
  // Set up the initial load
  window.onload = function() {
      displayRecipes(recipeObject);
  };