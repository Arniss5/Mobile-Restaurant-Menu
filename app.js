import { menuArray } from "./data.js";

let summaryMenuArray = []
let customerName = ''

render()

const nameInput = document.getElementById("customer-name")
const cardInput = document.getElementById("card-number")
const cvvInput = document.getElementById("cvv")



//EVENTS ON BUTTONS
document.addEventListener('click', function(e) {
    
    if (e.target.dataset.add){
        handleAddClick(e.target.dataset.add)  
    }
    
    if(e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }

    if(e.target.id === "complete-order-btn") {
        handleCompleteClick()
    }

    if(e.target.id === "cancel-btn") {
        handleCancelClick()
    }

    if(e.target.id === "pay-btn") {
        handlePayClick()
    }
})


// CLICK HANDLING FUNCTIONS
function handleAddClick(elementId) {
    const targetElement = menuArray.filter(menuItem => {
        return menuItem.id == elementId
    })[0]

    summaryMenuArray.push(targetElement)
    document.getElementById("purchase-complete").classList.add("hidden")
    render()
}

function handleRemoveClick(elementId) {
    summaryMenuArray.splice(elementId, 1)
    render()
}

function handleCompleteClick() {
    document.getElementById("payment-modal").classList.remove("hidden")
}

function handleCancelClick() {
    document.getElementById("payment-modal").classList.add("hidden")
}

function handlePayClick() {
    if(nameInput.value && cardInput.value && cvvInput.value) {
        customerName = document.getElementById("customer-name").value
        document.getElementById("payment-modal").classList.add("hidden")
        summaryMenuArray = []

        document.getElementById("purchase-complete").classList.remove("hidden")
        document.getElementById("purchase-complete").textContent = getPurchaseCompleteHtml()

        getSummaryHTML()
        render()
        
        nameInput.value = ''
        cardInput.value = ''
        cvvInput.value = ''
    }

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


function getPurchaseCompleteHtml() {
    return `Thanks, ${customerName}! Your order is on its way!`
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