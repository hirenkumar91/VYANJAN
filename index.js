const recipeObject = {
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
};

// Recipe Card start

// Create title element
const recipeContainer = document.getElementById("recipeCard");
const title = document.createElement("h1");
title.setAttribute("id", "recipeTitle");
title.innerText = recipeObject.title;
recipeContainer.appendChild(title);

// create img element
const image = document.createElement("img");
image.src = recipeObject.picture_url;
image.alt = recipeObject.title;
image.width = 200;
image.height = 200;
recipeContainer.appendChild(image);

// create Description

const recipeDiscription = document.createElement("div");
recipeDiscription.classList = "card-details";
recipeDiscription.id = "discriptin";
recipeContainer.appendChild(recipeDiscription);
const recipeText = document.createElement("h2");
recipeText.innerText = recipeObject.description;
recipeDiscription.appendChild(recipeText);

/// create ingredients list

// create container for ingredients list
const ingredientsList = document.createElement("div");
ingredientsList.classList = "ingridiantlist";
recipeContainer.appendChild(ingredientsList);

// create UL element for ingredients list
const ingredientsUL = document.createElement("ul");
ingredientsList.appendChild(ingredientsUL);

// create Li for UL ingredients list using for Loop

for (let i = 0; i < recipeObject.ingredients.length; i++) {
  const LI = document.createElement("li");
  LI.innerHTML = `${recipeObject.ingredients[i].NAME}: ${recipeObject.ingredients[i].AMOUNT}`;
  ingredientsUL.appendChild(LI);
}

// Recipe card end //

// form start

// start button for adding ingredients
const bTn = document
  .getElementById("bTnIngredients")
  .addEventListener("click", function () {
    const Fild = document.getElementById("fieldset");
    const fieldDiv = document.createElement("div");
    fieldDiv.setAttribute("id", "ingridiantList");
    Fild.appendChild(fieldDiv);

    const fieldSet = document.getElementById("ingridiantList");

    // name field
    const NameFild = document.createElement("input");
    NameFild.setAttribute("id", "ingridiant1");
    NameFild.setAttribute("placeholder", "Insert Ingridiant Name");
    NameFild.setAttribute("type", "text");
    NameFild.setAttribute("required", "");
    fieldSet.appendChild(NameFild);

    // ammount field
    const inputAmmount = document.createElement("input");
    inputAmmount.setAttribute("id", "ingrediantAmmount");
    inputAmmount.setAttribute("placeholder", "Ammount");
    inputAmmount.setAttribute("type", "text");
    inputAmmount.setAttribute("required", "");
    fieldSet.appendChild(inputAmmount);
  });
//start button for adding ingredients

//Form End
