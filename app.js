import { menuArray } from "./data.js";

let summaryMenuArray = []
let customerName = ''

render()

const nameInput = document.getElementById("customer-name")
const cardInput = document.getElementById("card-number")
const cvvInput = document.getElementById("cvv")
const paymentModal = document.getElementById("payment-modal")
const purchaseComplete = document.getElementById("purchase-complete")


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
    purchaseComplete.classList.add("hidden")
    render()
}

function handleRemoveClick(elementId) {
    summaryMenuArray.splice(elementId, 1)
    render()
}

function handleCompleteClick() {
    paymentModal.classList.remove("hidden")
}

function handleCancelClick() {
    paymentModal.classList.add("hidden")
}

function handlePayClick()   {
    //check if all fields are filled in
    if(nameInput.value && cardInput.value && cvvInput.value) {
        customerName = document.getElementById("customer-name").value
        paymentModal.classList.add("hidden")
        summaryMenuArray = []

        purchaseComplete.classList.remove("hidden")
        purchaseComplete.innerHTML = getPurchaseCompleteHtml()

        getSummaryHTML()
        render()
        nameInput.value = ''
        cardInput.value = ''
        cvvInput.value = ''

        //RATING
        const stars = document.querySelectorAll('.fa-star')
            
            stars.forEach((star, i) => {
                star.onclick = function() {
                    let currentStar = i + 1
                
                    stars.forEach((star, j) => {
                        if(currentStar >= j+1) {
                            star.classList.add('gold')
                        } else {
                            star.classList.remove('gold')
                        }
                    })

                    document.getElementById('rating-thanks').textContent = 'We appreciate your feedback!'
                }
        })
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
    let drinks = 0
    let food = 0
    let meal = 0

    summaryMenuArray.forEach(summaryItem => {
        totalPrice += summaryItem.price

        if (summaryItem.name === 'Beer') {
            drinks++
        } else {
            food++
        }
    })

    if (food && drinks) {
        if (food > drinks) {
            meal = drinks
        } else {
            meal = food
        }
    }
   
    if (meal) {
        return `${meal} x Meal deal $3 discount: $${totalPrice - 3 * meal}`
    } else {
        return '$' + totalPrice
    }
    
}


function getPurchaseCompleteHtml() {
    return `
    <div>Thanks, ${customerName}! Your order is on its way!</div>
    <div class="rate"> Rate your experience:</div>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <i class="fa-solid fa-star"></i>
    <div id="rating-thanks"></div>
    `
}


//RENDER ALL
function render() {
    document.getElementById("menu-items").innerHTML = getMenuHtml()
    document.getElementById("ordered-items").innerHTML = getSummaryHTML()
    document.getElementById("total-price").textContent = getTotalPrice()


    //display order summary only if summaryMenuArray isn't empty
    if (summaryMenuArray.length > 0) {
        document.getElementById("order-summary").classList.remove('hidden')
    } else {
        document.getElementById("order-summary").classList.add('hidden')
    }
}