import { menuArray } from "./data.js";

let summaryMenuArray = []

render()

document.addEventListener('click', function(e) {
    
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)  
    }
    
    if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
})


// CLICK HANDLING FUNCTIONS
function handleAddClick(elementId) {
    const targetElement = menuArray.filter(menuItem => {
        return menuItem.id == elementId
    })[0]

    summaryMenuArray.push(targetElement)
    render()
}

function handleRemoveClick(elementId) {
    summaryMenuArray.splice(elementId, 1)
    render()
}





//'GET HTML' FUNCTIONS

function getMenuHtml() {
    let menuHtml = ''
    menuArray.forEach(item => {
  
      let ingredients = item.ingredients[0]
      for ( let i = 1; i < item.ingredients.length; i++) {
          ingredients += `, ${item.ingredients[i]}`
      }
  
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
              +
            </button>
          </div>
      `
    })
    return menuHtml
}
  
    
function getSummaryHTML() {
    let summaryHtml = ''
    summaryMenuArray.forEach(summaryItem => {
        summaryHtml += `
        <div class="ordered-item-container" id="${summaryMenuArray.indexOf(summaryItem)}">
            <div class="ordered-item">
                <div>${summaryItem.name}</div>
                <button class="remove-btn" data-remove="${summaryMenuArray.indexOf(summaryItem)}">remove</button>
            </div>
    
            <div class="price">$${summaryItem.price}</div>
        </div>
        `
    })  
    return summaryHtml
}

function getTotalPrice() {
    let totalPrice = 0
    summaryMenuArray.forEach(summaryItem => {
        totalPrice += summaryItem.price
    })
    return '$' + totalPrice
}


//RENDER ALL
function render() {
    document.getElementById("menu-items").innerHTML = getMenuHtml()
    document.getElementById("ordered-items").innerHTML = getSummaryHTML()
    document.getElementById("total-price").textContent = getTotalPrice()


    //display order summary only if summaryMenuArray isn't empty
    if (summaryMenuArray.length > 0) {
        document.querySelector("#order-summary").classList.remove('hidden')
    } else {
        document.querySelector("#order-summary").classList.add('hidden')
    }
}