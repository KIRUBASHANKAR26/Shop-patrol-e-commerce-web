
var cartContainer = document.getElementById("cart-item-container");
//total amount for add the purchases total
var totalAmount = document.getElementById("total-amount");
var numberOfItem = document.getElementById("number-of-item");

var myLocalstorageData = JSON.parse(window.localStorage.getItem("product-list")
);

function createItemOnCheckOut(ipreview, iName, iCount, iPrice) {
    var item = document.createElement("div");
    item.setAttribute("class", "item");

    var itemImg = document.createElement("img");
    itemImg.src = ipreview;

    var itemDetail = document.createElement("div");
    itemDetail.setAttribute("class", "detail");

    var itemName = document.createElement("h3");
    var itemNameText = document.createTextNode(iName);
    itemName.appendChild(itemNameText);

    var itemCount = document.createElement("p");
    var itemCountText = document.createTextNode("X" + iCount);
    itemCount.appendChild(itemCountText);

    var itemPrice = document.createElement("p");
    var itemPriceText = document.createTextNode("Amount: " + iCount * iPrice);
    itemPrice.appendChild(itemPriceText);

    itemDetail.appendChild(itemName);
    itemDetail.appendChild(itemCount);
    itemDetail.appendChild(itemPrice);

    item.appendChild(itemImg);
    item.appendChild(itemDetail);

    return item;
}

for (let i = 0; i < myLocalstorageData.length; i++) {
    
    cartContainer.append(
        createItemOnCheckOut(myLocalstorageData[i].preview,
            myLocalstorageData[i].title,
            myLocalstorageData[i].count,
            myLocalstorageData[i].price
        )
    );  
}

var cost = 0;
var counter = 0;
/// calculate the number of item purchases and total amount
for (let j = 0; j < myLocalstorageData.length; j++) {
    counter += myLocalstorageData[j].count;
    console.log(counter);
    cost += parseInt(myLocalstorageData[j].count) * 
    parseInt(myLocalstorageData[j].price);
    console.log(cost);
}
totalAmount.innerHTML = cost;
numberOfItem.innerHTML = counter;

/////Place Order

var placeOrder = document.getElementById("place-order");

placeOrder.addEventListener("click", function() {
    var myLocalstorageData = window.localStorage.removeItem("product-list");
    cartC = window.localStorage.setItem("cart-count", "0");
    var cost = 0;
    for (var i = 0; i < myLocalstorageData.length; i++) {
        counter += myLocalstorageData[i].count;
    }
    totalAmount.innerHTML = cost;
    numberOfItem.innerHTML = counter;
});
