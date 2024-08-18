import {menuArray} from './data.js'

const menuSectionEl = document.getElementById('menu-section')
const orderSectionEl = document.getElementById('order-section')
const popoverEL = document.getElementById('popover')
const paymentFormEl = document.getElementById('payment-form')
const paymentNameEl = document.getElementById('name')

const menuItems = menuArray
let order = []

menuSectionEl.innerHTML = menuItems.map(item => {
    return `
        <div class="menu-item">
            <span class="emoji">${item.emoji}</span>
            
            <div class="item-details">
                <div class="item-title">${item.name}</div>
                <div class="item-ingredients">${item.ingredients.join(', ')}</div>
                <div class="item-price">$${item.price}</div>
            </div>
            
            <button class="add-btn" data-add-item="${item.id}">＋</button>
        </div>
    `
}).join('')

// Events routing on the main page
window.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-add-item')) {
        addItem(Number(e.target.getAttribute('data-add-item')))
    } else if (e.target.getAttribute('data-remove-item')) {
        removeItem(Number(e.target.getAttribute('data-remove-item')))
    } else if (e.target.getAttribute('data-action')) {
        if (e.target.getAttribute('data-action') === 'complete') {
            completeOrder()
        }
    }
})


paymentFormEl.addEventListener('submit', (e) => {
    e.preventDefault()

    popoverEL.hidePopover()

    orderSectionEl.innerHTML = `
        <div class="success">Thanks, ${paymentNameEl.value}! Your order is on its way!</div>
    `

})

const addItem = function(itemId) {
    if (order.filter(item => item.id === itemId).length === 0) {
        order.push(menuItems.filter(item => item.id === itemId)[0])
    }

    renderOrder()
}

const removeItem = function(itemId) {
    if (order.filter(item => item.id === itemId).length > 0) {
        order = order.filter(item => item.id !== itemId)
    }

    renderOrder()
}

const completeOrder = function() {
    popoverEL.showPopover()
}


const renderOrder = function() {
    if (order.length === 0) {
        orderSectionEl.innerHTML = ""
    }
    else {
        const itemsHtml = order.map(item => {
            return `
                <div class="order-item">
                    <div class="order-item-name">
                        ${item.name} <span class="remove" data-remove-item="${item.id}">remove</span>
                    </div>
                    <div class="order-item-price">
                        $${item.price}
                    </div>
                </div>
            `
        }).join('')

        orderSectionEl.innerHTML = `
        <div class="order-recap">
            <h3 class="order-recap-title">Your order</h3>
            ${itemsHtml}
        </div>
        
        <div class="order-total">
            <span>Total price:</span><span class="total-price">$${order.reduce((accumulator, item) => accumulator + item.price, 0)}</span>
        </div>
        
        <div class="order-cta">
            <button class="submit-btn" data-action="complete">Complete order</button>
        </div>
    `
    }
}
