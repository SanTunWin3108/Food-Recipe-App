const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
let mealContainer = document.querySelector(".mealContainer");
const modalContainer = document.querySelector(".modalContainer");
let warningText = document.querySelector(".warningText");


searchBtn.addEventListener("click", getItems);
mealContainer.addEventListener("click", getRecipe);


function getItems() {
    const inputText = searchInput.value;

    mealContainer.innerHTML = "";
    warningText.innerText = "";

    if(inputText !== "") {
        fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${inputText}`)
        .then(response => response.json())
        .then(data => {
            if(data.meals === null) {
                warningText.innerText = "Sorry, we didn't find any meals!";
                return;
            }
            showItems(data);
        })
        .catch(error => console.log(error));
    } else {
        warningText.innerText = "Please enter an ingredient!";
    }
}

function showItems(data) {
    const mealItemArr = data.meals;
    
    for(let meal of mealItemArr) {
        
        const mealItem = `
    <div class="meal" data-id="${meal.idMeal}">
        <div class="mealImage">
            <img src="${meal.strMealThumb}" alt="">
        </div>

        <div class="mealName">
            <h2>${meal.strMeal}</h2>
        </div>

        <button class="getRecipeBtn">Get Recipe</button>
    </div>
    `;

        mealContainer.innerHTML += mealItem; 
    };

}

function getRecipe(e) {
    if(e.target.classList.contains("getRecipeBtn")) {
        const mealId = e.target.parentElement.dataset.id;
        fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            showModal(data);
        })
    }
}

function showModal(data) {
    const recipe = data.meals[0];
    const modal = `
    <div class="modal">
    <div class="closeBtn">
        <i class="fa-solid fa-xmark"></i>
    </div>
    <h1>${recipe.strMeal}</h1>
    <h2>${recipe.strCategory}</h3>
    <h3>Instructions:</h3>
    <p>${recipe.strInstructions}</p>
    <div class="modalImage">
        <img src="${recipe.strMealThumb}" alt="">
    </div>
    <a href="${recipe.strYoutube}" target="_blank">Watch Video</a>
    </div>
    `;

    modalContainer.classList.add("showModal");
    modalContainer.innerHTML = modal;

    const closeBtn = document.querySelector(".closeBtn");
    closeBtn.addEventListener("click", function() {
        hideModal();
    });

};

function hideModal() {
    modalContainer.innerHTML = "";
    modalContainer.classList.remove("showModal");
}



