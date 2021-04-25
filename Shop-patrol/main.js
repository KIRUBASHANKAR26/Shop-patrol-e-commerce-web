var hamBurger = document.getElementById("burger");
var burgerContent = document.getElementById("nav-links")
hamBurger.onclick  = function () {
  hamBurger.classList.toggle("active")
  burgerContent.classList.toggle("active");
}

$(document).ready(function() {
    
  $("#banner").slick({

    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  });
});
//////////////////

////----------create card ------------

//select of the element

var clothingCards = document.getElementById("clothing-cards");
var accessoriesCards = document.getElementById("accessories-cards");

//create card function that creatw card dynamically

function createItemcards(id, preview, name, brand, price) {
    
    //create a div element with class card
    var cardElement = document.createElement("div");
    cardElement.setAttribute("class", "card")
    cardElement.setAttribute("id", id);

    //create a anchor element 
    var cardLink = document.createElement("a");
    cardLink.href = "html/product.html?product_id=" + id;

    //create a img-container 
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img");

    //create a img element
    var newImgElement = document.createElement("img");
    newImgElement.src = preview;

    //Append img into img-container
    imgContainer.appendChild(newImgElement);

    //create a div elements
    var details = document.createElement("div");
    details.setAttribute("class", "details");

    //create a h3
    var newTitleElement = document.createElement("h3");
    var newName = document.createTextNode(name);

    //Append name into h3
    newTitleElement.appendChild(newName);
    details.appendChild(newTitleElement);

    //create a h4 with text node brand
    var newBrandElement = document.createElement("h4");
    var newBrand = document.createTextNode(brand);

    //append brand into h4;
    newBrandElement.appendChild(newBrand);
    details.appendChild(newBrandElement);

    //create a h5 with text-node price
    var newPriceElement = document.createElement("h5");
    var newPriceText =document.createTextNode("Rs ");
    var newPrice = document.createTextNode(price);
    
    //append price into h5
    newPriceElement.appendChild(newPriceText);
    newPriceElement.appendChild(newPrice);
    details.appendChild(newPriceElement);

    //append img-container, details into card-link;
    cardLink.appendChild(imgContainer);
    cardLink.appendChild(details);
    
    //append cardlink into card-element
    cardElement.appendChild(cardLink);

    return cardElement;
}

//---------------request data & create cards on home page------------------------

function getCardsData() {
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function(data){
        var responseData = data;
        for (let i = 0; i < responseData.length; i++) {
            //console.log(responseData[i]);
            if(responseData[i].isAccessory === false) {
                clothingCards.append(
                    createItemcards(
                        responseData[i].id,
                        responseData[i].preview,
                        responseData[i].name,
                        responseData[i].brand,
                        responseData[i].price
                    )
                );
            } 
            else {
                accessoriesCards.append(
                    createItemcards(
                      responseData[i].id,
                      responseData[i].preview,
                      responseData[i].name,
                      responseData[i].brand,
                      responseData[i].price
                    )
                );    
            }    
        }
    });
}
getCardsData();

//////////-----------------request data on card click to display product page--------------------------------

function getProductDeatail (){
    //get product id from url
    var searchId =window.location.search.split("=")[1];

    //get product details
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + searchId, function(data) {
        var productDetail = data;
        name = productDetail.name;
        imageSrc = productDetail.preview;
        brand = productDetail.brand;
        price = productDetail.price;
        description = productDetail.description;
        photo0 = productDetail.photos[0]; 
        photo1 = productDetail.photos[1]; 
        photo2 = productDetail.photos[2]; 
        photo3 = productDetail.photos[3]; 
        photo4 = productDetail.photos[4];
        photo5 = productDetail.photos[5];
        
        createProductPage(imageSrc,name, brand, price, description ,photo0, 
        photo1, photo2, photo3, photo4, photo5);
    });
}

getProductDeatail();

////----------create product page ----------

function createProductPage(imageSrc,name,brand,price,
    description,
    img0,
    img1,
    img2,
    img3,
    img4,
    img5)
    {
     //product Image
     var productImg = document.getElementById("productImg");
     productImg.src = imageSrc;
     
     //product Name
     var productName = document.getElementById("name");
     productName.innerHTML = name;

     //product Brand
     var productBrand = document.getElementById("brand");
     productBrand.innerHTML = brand;

     //product price
     var productPrice = document.getElementById("price");
     productPrice.innerHTML = price;

     //product description
     var productDescription = document.getElementById("description");
     productDescription.innerHTML = description;

     //Product preview img 0
     var photo0  = document.getElementById("img0");
     photo0.src = img0;

     //Product preview img 1
     var photo1  = document.getElementById("img1");
     photo1.src = img1;

     //Product preview img 2
     var photo2  = document.getElementById("img2");
     photo2.src = img2;

     //Product preview img 3
     var photo3  = document.getElementById("img3");
     photo3.src = img3;

     //Product preview img 4
     var photo4  = document.getElementById("img4");
     photo4.src = img4;

     //Product preview img 0
     var photo5  = document.getElementById("img5");
     photo5.src = img5;

     //////-----------change preview image onclick---------------
    function changeImage() {
        
        photo0.addEventListener("click", function() {
            productImg.src = img0;
            $(".previewImg img").removeClass("active")
            $("#img0").addClass("active");
        })

        photo1.addEventListener("click", function() {
            productImg.src = img1;
            $(".previewImg img").removeClass("active")
            $("#img1").addClass("active");
        })

        photo2.addEventListener("click", function() {
            productImg.src = img2;
            $(".previewImg img").removeClass("active")
            $("#img2").addClass("active");
        })

        photo3.addEventListener("click", function() {
            productImg.src = img3;
            $(".previewImg img").removeClass("active")
            $("#img3").addClass("active");
        })

        photo4.addEventListener("click", function() {
            productImg.src = img4;
            $(".previewImg img").removeClass("active")
            $("#img4").addClass("active");
        })

        photo5.addEventListener("click", function() {
            productImg.src = img5;
            $(".previewImg img").removeClass("active")
            $("#img5").addClass("active");
        })
    }
    changeImage();
}

//--------insert data in local storage--on click the add to cart-----


var addToCartBtn = document.getElementById("add-to-cart");
var cart = document.getElementById("cart-count");
var myCartData = [];
var cartIntialValue;

// set data when the local storage data it null
if(localStorage.getItem('cart-count') == null) {
	localStorage.setItem('cart-count', '0');
}


// ---------------- Increase Cart Count -----------------------
function cartCount() {

  //when onclick the add to cart it check the how many value is there
  if (window.localStorage.getItem("cart-count") === null) {
    cartIntialValue = 0;
  } else {
    cartIntialValue = JSON.parse(window.localStorage.getItem("cart-count"));
    //cart.innerHTML = cartIntialValue;
  }
  var cartCurrentValue = cartIntialValue + 1;
  window.localStorage.setItem("cart-count", cartCurrentValue);
  cart.innerHTML = window.localStorage.getItem("cart-count");
}
// retrive the local storage data when it 
cart.innerHTML = window.localStorage.getItem("cart-count");


// ---------------- Add Data into List and then into Local Storage -----------------------

function addDataIntoList(productData) {
  // If Local Storage Is Empty Then Set List To Empty
  if (window.localStorage.getItem("product-list") === null) {
    myCartData = [];
  }
  // If Local Storage Is Not Empty Then Set List To Value Of Local Storage
  else {
    //length of product list
    myCartData = JSON.parse(window.localStorage.getItem("product-list"));
  }
  //console.log(myCartData.length);
  // If List Is Empty Then Push The Object In It
  if (myCartData.length === 0) {
    var myObj = {
      id: productData.id,
      title: productData.name,
      count: 1,
      price: productData.price,
      preview: productData.preview
    };
    myCartData.push(myObj); 
  }
  // If List Is Not Empty Then
  else if (myCartData.length != 0) {
    var w = 0;
    // If Same Product Data == True Then List.Count++
    for (var i = 0; i < myCartData.length; i++) {
      //console.log(myCartData[i].id);
      if (myCartData[i].id == productData.id) {
        myCartData[i].count = parseInt(myCartData[i].count) + 1;
        w += 1;
      }
    }
    // Else Add New Data Into List
    if (w == 0) {
      var myObj = {
        id: productData.id,
        title: productData.name,
        count: 1,
        price: productData.price,
        preview: productData.preview
      };
      myCartData.push(myObj);
    }
  }
  // Store The List Into Local Storage
  window.localStorage.setItem("product-list", JSON.stringify(myCartData));
}

//------ Add-To-Cart-Btn Click Event Listner ------------------------

addToCartBtn.addEventListener("click", function() {

  //get the data from api with page [add to card] button pressed.
  var productId = window.location.search.split("=")[1];
  var urlLink =
    "https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId;

  function getDataForLocalStorage() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          var productData = JSON.parse(this.responseText);
          addDataIntoList(productData);
        }
      }
    };
    http.open("GET", urlLink, true);
    http.send();
  }
  cartCount();
  getDataForLocalStorage();
});

//////////burger///////////////

