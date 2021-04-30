//todo connecting to backend
const data = async () => {
  const f = await fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product");
  const productList = await f.json();

  var mycon = document.getElementById("row1");
  mycon.style.marginTop = "5%";
  mycon.style.marginBottom = "9%";

  var cart_value =  JSON.parse(localStorage.getItem('cart')) ||{};

//todo  function for updating the cart value from product_file.js file
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

  //todo CLOTHING FOR MEN AND WOMEN
  for (var pos = 0; pos < 5; pos++) {
    var child = document.createElement("div");
    child.style.display = "grid"
    mycon.style.gridGap = "2%"
    child.style.boxShadow = "rgb(136 136 136) 2px 2px 7px 0px"
    child.onmouseover = (event) => event.target.parentNode.style.boxShadow = "rgb(136 136 136) 2px 2px 7px 2px"
    child.onmouseout = (event) => event.target.parentNode.style.boxShadow = "rgb(136 136 136) 2px 2px 7px 0px"
    var child2 = document.createElement("img")
    child2.setAttribute("id", pos)
    child2.src = productList[pos].preview
    child2.addEventListener("click", (e) => func(e));
    child2.addEventListener("click", () => location.assign('./product/product_detail.html'))
    var child_div = document.createElement("div");
    var child_desc = document.createElement("h2").appendChild(document.createTextNode(productList[pos].name));
    var child_brand = document.createElement("p").appendChild(document.createTextNode(productList[pos].brand));
    var child_price = document.createElement("p").appendChild(document.createTextNode(productList[pos].price));
    child_div.appendChild(child_desc)
    child_div.appendChild(document.createElement("br"))
    child_div.appendChild(child_brand)
    child_div.appendChild(document.createElement("br"))
    child_div.appendChild(child_price)
    child_div.appendChild(document.createElement("br"))
    child2.style.width = "100%" 
    child.appendChild(child2);
    child.appendChild(child_div)
    mycon.appendChild(child);
  }


  //todo ACCESSORIES FOR MEN AND WOMEN
  var mycon = document.getElementById("row2");
  mycon.style.marginTop = "5%";
  mycon.style.marginBottom = "9%";

  for (var pos = 5; pos < 11; pos++) {

    var child = document.createElement("div");
    child.style.display = "grid"
    mycon.style.gridGap = "2%"
    child.style.boxShadow = "rgb(136 136 136) 2px 2px 7px 0px"
    child.onmouseover = (event) => event.target.parentNode.style.boxShadow = "rgb(136 136 136) 2px 2px 7px 2px"
    child.onmouseout = (event) => event.target.parentNode.style.boxShadow = "rgb(136 136 136) 2px 2px 7px 0px"
    var child2 = document.createElement("img")
    child2.setAttribute("id", pos)
    child2.addEventListener("click", (e) => func(e));
    child2.addEventListener("click", () => location.assign('./product/product_detail.html'))
    child2.src = productList[pos].preview
    var child_div = document.createElement("div");
    var child_desc = document.createElement("h2").appendChild(document.createTextNode(productList[pos].name));
    var child_brand = document.createElement("p").appendChild(document.createTextNode(productList[pos].brand));
    var child_price = document.createElement("p").appendChild(document.createTextNode(productList[pos].price));
    child_div.appendChild(child_desc)
    child_div.appendChild(document.createElement("br"))
    child_div.appendChild(child_brand)
    child_div.appendChild(document.createElement("br"))
    child_div.appendChild(child_price)
    child_div.appendChild(document.createElement("br"))
    child2.style.width = "100%"
    child.appendChild(child2);
    child.appendChild(child_div)
    mycon.appendChild(child);
  }


  //todo EVENTLISTNER FOR ONCLICK IMAGE TO GET AN IMAGE
  function func(e) {
    localStorage.setItem("product", JSON.stringify(productList[Number(e.target.id)]));
  }
}
data()