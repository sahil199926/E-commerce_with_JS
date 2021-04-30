// var b = JSON.parse(localStorage.getItem("product"));
// document.getElementById("root2").innerHTML = b

//todo fetching cart value
var cart_value =  JSON.parse(localStorage.getItem('cart')) ||{}

//todo  function for updating the cart value
function update(){
    var i=0
    for( j in cart_value){i++}

    //todo condition for displaying the cart value
    if(i>0){
        document.getElementById('cart').style.display='block'
        document.getElementById('cart').innerHTML= i
    }
    else{
        document.getElementById('cart').style.display='none'
    }
    
 
}

update();

//todo get the data from productdata from script.js file
var productData = JSON.parse(localStorage.getItem("product"));

//todo root Node
var root = document.getElementById("root2");

//todo First div child of root 
var t = productData.preview
var preview = document.createElement("div");
preview.style.width = "40%"
var child_preview = document.createElement("img");
child_preview.style.width = "100%";
const changePreview = (change) => {
    child_preview.src = change;
}
changePreview(t);
preview.appendChild(child_preview);
root.appendChild(preview);



//todo Second div child of root
var details = document.createElement("div");
details.style.width = "56%";
var detail_div1 = document.createElement("div");
detail_div1.style.lineHeight = "30px";
var head = document.createElement("h1")
head.appendChild(document.createTextNode(productData.name));
var tittle = document.createElement("p")
tittle.appendChild(document.createTextNode(productData.brand));
tittle.style.color ="#888888";
var price = document.createElement("p")
price.appendChild(document.createTextNode("Price :" + " " + productData.price));
price.style.color ="blue";
price.style.fontSize = "80%";
var desc = document.createElement("p")
desc.appendChild(document.createTextNode("Description"));
desc.style.color ="#888888";
desc.style.fontSize = "80%"
var about = document.createElement("p")
about.appendChild(document.createTextNode(productData.description));
about.style.color ="#888888";
about.style.fontSize = "80%"
var product = document.createElement("p")
product.appendChild(document.createTextNode("Product Preview"));
product.style.color ="#888888";
product.style.fontSize = "85%";
detail_div1.appendChild(head);
detail_div1.appendChild(tittle);
detail_div1.appendChild(price);
detail_div1.appendChild(desc);
detail_div1.appendChild(about);
detail_div1.appendChild(product);
details.appendChild(detail_div1);
var details_div2 = document.createElement("div");
details_div2.style.marginTop = '10px';
details_div2.style.display = "flex"
details_div2.style.columnGap = "3%"
var flag = true;

//todo loop for giving border to an image
for (var i in productData["photos"]) {
    var preview_div = document.createElement("div");
    if (flag) {
        preview_div.style.border = "2px solid green";
        flag = false;
    }
    preview_div.onclick = (e) => func(e);
    preview_div.style.width = "17%";
    var pri_img = document.createElement("img");
    pri_img.src = productData["photos"][i];
    pri_img.style.width = "100%";
    preview_div.appendChild(pri_img)
    details_div2.appendChild(preview_div)
}
//todo Creating buttonn for add to cart
var addbtn = document.createElement("button");
addbtn.setAttribute("id", "addbtn");
addbtn.addEventListener("click", (e)=>addtoCart(e));
var inner_btn = document.createElement("p");
inner_btn.innerHTML = "ADD TO CART"
inner_btn.style.fontSize = "50%";
inner_btn.style.letterSpacing = "0px";
inner_btn.style.fontWeight = "bold";
addbtn.appendChild(inner_btn);
addbtn.style.marginTop = "10px"
details.appendChild(details_div2);
details.appendChild(addbtn);
root.appendChild(details);

//todo function for add to cart 
function addtoCart(e){
    alert("product added to cart");
    if(cart_value[productData.id]==undefined){
       
        var t={...productData,no_item:1}
       cart_value[productData.id]=t;
 
       localStorage.setItem('cart',JSON.stringify(cart_value))
    }
    else{
        
        cart_value[productData.id]['no_item']+=1;
        localStorage.setItem('cart',JSON.stringify(cart_value))
    }
   update();
}

//todo function for image onclick
function func(e) {
    e.target.parentNode.style.border = "2px solid green";
    e.target.parentNode.style.borderRadius = "4px";
    e.target.parentNode.style.padding = "2px"
    var change = e.target.getAttribute('src');
    changePreview(change)
    removeBorder(e.target);
}

//todo function for removing border from an image
var removeBorder = function (elem) {
    var all = elem.parentNode.parentNode.children;

    for (var j in all) {
        var x = all[j]
        if (x != elem.parentNode) {
            x.style.border = 'none';
        }
    }
}
