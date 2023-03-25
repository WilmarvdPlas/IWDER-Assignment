window.onload = () => {
    const navButtons = document.getElementsByClassName("nav_btn");
    
    const leftArrows = document.getElementsByClassName("left_arrow");
    const rightArrows = document.getElementsByClassName("right_arrow");

    const cardHeaders = document.getElementsByClassName("cardHeader");
    const searchbar = document.getElementById("searchbar");
    const mainBoxHeader = document.getElementById("mainBoxHeader");

    const emptyCartText = document.getElementById("emptyCartText");
    const noResultsText = document.getElementById("noResultsText");

    const cartButton = document.getElementById("cartButton")
    const addToCartButtons = document.getElementsByClassName("addToCartButton");
    let removeFromCartButtons = document.getElementsByClassName("removeFromCartButton");

    let removeFromCartButtonsArray = [];
    let totalPrice = 0.00;

    const totalPriceTag = document.getElementById("totalPriceTag");
    const payButton = document.getElementById("payButton");

    const cartCardWrapper = document.getElementById("cart");
    const webshopCardWrapper = document.getElementById("webshop");

    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].onmouseover = () => {
            leftArrows[i].style.opacity = "1";
            rightArrows[i].style.opacity = "1";
        }
        navButtons[i].onmouseleave = () => {
            leftArrows[i].style.opacity = "0";
            rightArrows[i].style.opacity = "0";
        }
    }

    if (webshopCardWrapper !== null) {
        anyTrue = () => {
            for (let i = 0; i < cardHeaders.length; i++) {
                if (cardHeaders[i].parentElement.parentElement.style.display == "") {
                    return true;
                }
            }
            return false;
        }
        checkIfCartEmpty = () => {
            if (totalPrice == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        updateCartEmptyText = () => {
            if (checkIfCartEmpty() == true) {
                emptyCartText.style.display = "";
            }
            else if (checkIfCartEmpty() == false ) {
                emptyCartText.style.display = "none";
            }
        }
        updatePayButton = () => {
            if (checkIfCartEmpty() == true) {
                payButton.style.display = "none";
            }
            else if (checkIfCartEmpty() == false ) {
                payButton.style.display = "";
            }
        }
        updateTotalPrice = () => {
            totalPrice = 0.00;
            
            for (let i = 0; i < cartCardWrapper.childElementCount; i++) {

                totalPrice += parseFloat(cartCardWrapper.children[i].dataset.price);
            }

            totalPrice = totalPrice.toFixed(2);
            let totalPriceText = "Total Price: €" + totalPrice;
            totalPriceText = totalPriceText.replace("." , ",")
            totalPriceTag.textContent = totalPriceText;
        }
        updateNoResultsText = () => {
            if (cartCardWrapper.style.display == "none") {
                if (anyTrue() == true) {
                    noResultsText.style.display = "none";
                }
                else {
                    noResultsText.style.display = "";
                }
            }
            else {
                noResultsText.style.display = "none";
            }
        }

        cartCardWrapper.style.display = "none";

        noResultsText.style.display = "none";
        noResultsText.style.opacity = 1;

        totalPriceTag.style.display = "none";
        totalPriceTag.style.opacity = 1;

        payButton.style.display = "none"
        payButton.style.opacity = 1;

        emptyCartText.style.display = "none";
        emptyCartText.style.opacity = 1;

        for (let i = 0; i < addToCartButtons.length; i++) {
            addToCartButtons[i].onclick = () => {
    
                addToCartButtons[i].animate([{ transform: 'rotate3d(1, 0, 0, 360deg)' }],{duration: 500})
    
                emptyCartText.style.display = "none";
    
                let clonedCard = addToCartButtons[i].parentElement.parentElement.cloneNode(true);
    
                clonedCard.children[1].children[1].textContent = "REMOVE FROM CART"
                clonedCard.children[1].children[1].className = "removeFromCartButton"
    
                cartCardWrapper.appendChild(clonedCard);
    
                removeFromCartButtons = document.getElementsByClassName("removeFromCartButton");
                
                updateTotalPrice();
            }
        }

        cartButton.onmouseover = () => {
            if (cartCardWrapper.style.display == "none") {
                cartButton.style.backgroundColor = "rgb(126, 32, 32)";
            }
            else {
                cartButton.style.backgroundColor = "rgb(4, 71, 4)";
            }
        }

        cartButton.onmouseleave = () => {
            if (cartCardWrapper.style.display == "none") {
                cartButton.style.backgroundColor = "brown";
            }
            else {
                cartButton.style.backgroundColor = "green";
            }
        }

        cartButton.onclick = () => {
            if (cartCardWrapper.style.display == "none") {
                webshopCardWrapper.style.display = "none";
                cartCardWrapper.style.display = "";
                cartButton.style.backgroundColor = "green";
                mainBoxHeader.innerText = ("Shopping Cart");
                totalPriceTag.style.display = "";
                
                updateNoResultsText();
                updatePayButton();
                updateCartEmptyText();
            }
            else {
                cartCardWrapper.style.display = "none";
                webshopCardWrapper.style.display = "";
                cartButton.style.backgroundColor = "brown";
                mainBoxHeader.innerText = ("Merchandise")
                totalPriceTag.style.display = "none";
                payButton.style.display = "none";
                emptyCartText.style.display = "none";

                updateNoResultsText();
            }
            for (let i = 0; i < removeFromCartButtons.length; i++) {
                removeFromCartButtonsArray.push(removeFromCartButtons[i]);
            }

            for (let i = 0; i < removeFromCartButtonsArray.length; i++) {
                removeFromCartButtonsArray[i].onclick = () => {
    
                    removeFromCartButtonsArray[i].parentElement.parentElement.animate([{ opacity: 0, transform: 'scale(0)' }],{duration: 300})
    
                    setTimeout(() => removeFromCartButtonsArray[i].parentElement.parentElement.remove(), 300);
    
                    setTimeout(() => updateTotalPrice(), 300);
                    setTimeout(() => updateCartEmptyText(), 300);
                    setTimeout(() =>updatePayButton(), 300);
                }
            }
        }
        searchbar.onkeyup = (event) => {
            let filter = event.target.value.toUpperCase();
            for (let i = 0; i < cardHeaders.length; i++) {
                let innerHTML = cardHeaders[i].textContent.toUpperCase();
                    
                if (innerHTML.indexOf(filter) !== -1) {
                    cardHeaders[i].parentElement.parentElement.style.display = "";
                }
                else {
                    cardHeaders[i].parentElement.parentElement.style.display = "none";
                }
            }
            updateNoResultsText();
        }
        payButton.onclick = () => {
            window.location.href = "webshop.html";

        }
    }
}
