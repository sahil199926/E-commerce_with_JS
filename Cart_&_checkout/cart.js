var cart_value = JSON.parse(localStorage.getItem("cart")) || {};
console.log(cart_value);
// var cart_value = {1:{
//     brand: "United Colors of Benetton",
//     description: "Navy solid sweatshirt with patchwork, has a round neck, long sleeves, straight hem",
//     id: "1",
//     isAccessory: false,
//     name: "Men Navy Blue Solid Sweatshirt",
//     no_item: 1,
//     photos: (5) ["https://assets.myntassets.com/h_1440,q_100,w_1080/…f-Benetton-Men-Sweatshirts-1271541402833444-1.jpg", "https://assets.myntassets.com/h_1440,q_100,w_1080/…f-Benetton-Men-Sweatshirts-1271541402833444-2.jpg", "https://assets.myntassets.com/h_1440,q_100,w_1080/…f-Benetton-Men-Sweatshirts-1271541402833444-3.jpg", "https://assets.myntassets.com/h_1440,q_100,w_1080/…f-Benetton-Men-Sweatshirts-1271541402833444-4.jpg", "https://assets.myntassets.com/h_1440,q_100,w_1080/…f-Benetton-Men-Sweatshirts-1271541402833444-5.jpg"]
//     ,preview: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/7579188/2018/11/5/08a7b230-ee8f-46c0-a945-4e835a3c01c01541402833619-United-Colors-of-Benetton-Men-Sweatshirts-1271541402833444-1.jpg"
//     ,price: 2599,
//     size: (5) [1, 1, 0, 1, 0]}}


//todo  function for updating the cart value from product_file.js file
var no_of_products = 0;
function update() {
  for (j in cart_value) {
    no_of_products++;
  }
  //todo condition for displaying the cart value
  if (no_of_products > 0) {
    document.getElementById("cart").style.display = "block";
    document.getElementById("cart").innerHTML = no_of_products;
  } else {
    document.getElementById("cart").style.display = "none";
  }
  document.getElementById("total-items").innerHTML = `Total items ${no_of_products}`;
}
update();
var first_div = document.getElementById("first-div");
var total_amount = 0;   

//todo Loop for fetching the products of cart
for(var k in cart_value)
{
var my_item = document.createElement("div");
my_item.style.boxShadow = "0 2px 2px #ccc";
my_item.style.borderRadius = "6px"
my_item.style.display = "flex";
my_item.style.padding ="4%";
var item_image = document.createElement('img');
item_image.src= cart_value[k].preview
item_image.style.width = "13%";
item_image.style.height = "114px";
var item_detail = document.createElement("div"); 
item_detail.style.marginLeft = "18px";
item_name = document.createElement("h3");
item_name.innerHTML = cart_value[k].name
item_price = document.createElement("h4");
item_price.innerHTML = "Price Rs : " + cart_value[k].price;
item_count = document.createElement("h5");
item_count.setAttribute('id',`${k}aa`)
item_count.innerHTML = "X " + cart_value[k].no_item;
var inc_dec = document.createElement("div");
inc_dec.style.display = "flex";
inc_dec.style.columnGap = "3%"
var dec_btn = document.createElement("div");
dec_btn.innerHTML = `<i id=${k} class="fas fa-minus"></i>`;
dec_btn.className = "icon";
dec_btn.setAttribute("id", k);
dec_btn.addEventListener("click", (e)=>remove(e));
var inc_btn = document.createElement("div");
inc_btn.innerHTML = `<i id=${k}  class="fas fa-plus-circle"></i>`;
inc_btn.className = "icon";
inc_btn.setAttribute("id", k);
inc_btn.addEventListener("click", (e)=>add(e));
my_item.appendChild(item_image);
inc_dec.appendChild(dec_btn);
inc_dec.appendChild(item_count);
inc_dec.appendChild(inc_btn);
item_detail.appendChild(item_name);
item_detail.appendChild(item_price);
item_detail.appendChild(inc_dec);
my_item.append(item_detail);
first_div.appendChild(my_item);
total_amount += cart_value[k].price * cart_value[k].no_item;
}

var item_amount = document.getElementById("amount");
item_amount.innerHTML = "Amount Rs : " + total_amount;

//todo function for order place
function orderplace(){
  if (no_of_products<1){
    alert("Cart is empty");
  }
  else{
    alert("order has been placed");
    localStorage.setItem("cart", JSON.stringify({}));
    location.assign("./checkout.html");
  }
}

//todo function for adding the no of item from cart
function add(e){
  
  console.log(document.getElementById(`${e.target.id}aa`).innerHTML)
  if(cart_value[e.target.id]['no_item']>4){alert("can't add more then 5 items");return}

  cart_value[e.target.id]['no_item']+=1;
  document.getElementById(`${e.target.id}aa`).innerHTML = "X " + cart_value[e.target.id].no_item;
  total_amount= eval( total_amount+  cart_value[e.target.id].price)
  document.getElementById("amount").innerHTML = "Amount Rs : " + total_amount ;
  
  localStorage.setItem("cart", JSON.stringify(cart_value));
}

//todo function for removing the no of item from cart
function remove(e){

  if(cart_value[e.target.id]['no_item']<2){
    var what=window.confirm('Are you sure you want to kick this product out of cart?');

    if(!what){return}

    else{
     document.getElementById(`${e.target.id}aa`).innerHTML = "X " + cart_value[e.target.id].no_item;
      total_amount= eval( total_amount -  cart_value[e.target.id].price)
      // document.getElementById("amount").innerHTML = "Amount Rs : " +total_amount;
      delete cart_value[e.target.id]

      localStorage.setItem("cart", JSON.stringify(cart_value));
      location.reload();
    }
  }
  else{
    cart_value[e.target.id]['no_item']-=1;
    localStorage.setItem("cart", JSON.stringify(cart_value));
    document.getElementById(`${e.target.id}aa`).innerHTML = "X " + cart_value[e.target.id].no_item;
    total_amount= eval( total_amount-  cart_value[e.target.id].price)
    document.getElementById("amount").innerHTML = "Amount Rs : " + total_amount ;
  }

}






