import { menuArray } from "./data.js";




// render menu



function getMenuHtml() {
  let menuHtml = ''
  menuArray.forEach(item => {

    let ingredients = item.ingredients[0]
    for ( let i = 1; i < item.ingredients.length; i++) {
        ingredients += `, ${item.ingredients[i]}`
    }
    console.log(ingredients)

    menuHtml += `
        <div class="menu-item">
          <div class="item-container">
            <div class="menu-item-icon">${item.emoji}</div>
            <div>
              <div class="item">${item.name}</div>
              <div class="ingredients">${ingredients}</div>
              <div class="price" data-price="${item.id}">$${item.price}</div>
            </div>
          </div>
          <button class="add-btn" data-add="${item.id}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
    `

})
}



console.log(menuHtml)

document.getElementById("menu-items").innerHTML = menuHtml