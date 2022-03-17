let productosRes = {};
let cart = [];
datos = new Promise(function (resolve, reject) {
  const req = new XMLHttpRequest();
  req.open(
    "get",
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  );
  req.onload = function () {
    if (req.status == 200) {
      let productosIn = JSON.parse(req.response);
      resolve(productosIn);
      productosRes = productosIn;
      productosIn.forEach((element) => {
        let menu = document.getElementById("menu");
        let item = document.createElement("li");
        item.classList.add("nav-item");
        menu.appendChild(item);
        let link = document.createElement("a");
        link.classList.add("nav-link");
        link.onclick = function () {
          changeProducts(element.name);
        };
        link.innerHTML = element.name;
        item.appendChild(link);
      });
      changeProducts(productosIn[0].name);
    } else {
      reject("No se encontraron productos");
    }
  };
  req.send();
});

function changeProducts(category) {
  let productos = productosRes;
  document.getElementById("category-title").innerHTML = category;
  let productosFiltrados = productos.filter(
    (producto) => producto.name == category
  );

  productosFiltrados.forEach((cat) => {
    let productosHTML = "";
    cat.products.forEach((element) => {
      productosHTML += `<div class="col-12 col-md-3 d-flex align-items-stretch">
        <div class="card">
           <div class="center">
          <img src="${element.image}" alt="${element.name}" class="card-img">
          </div>
          <p class="card-title center">${element.name}</p>
          <div class="card-body">
            <p class="card-text">${element.description}</p>
            <div class="center down">
                <button type="button" id="${element.name}"  class="btn-add-cart">Add to cart</button>
            </div>
          </div>
        </div>
      </div>`;
    });
    document.getElementById("productos").innerHTML = productosHTML;

    cat.products.forEach((element) => {
      let add = document.getElementById(element.name);
      add.onclick = function () {
        addToCart(element);
      };
    });
  });
}

function addToCart(product) {
  let isInCart = false;
  cart.forEach(function (element) {
    if (element.name == product.name) {
      isInCart = true;
      product.quantity++;
      let prods = document.getElementById("items-cart");
      prods.innerHTML = cart.length + " items";
    }
  });

  if (!isInCart) {
    product.quantity = 1;
    cart.push(product);
    let prods = document.getElementById("items-cart");
    prods.innerHTML = cart.length + " items";
  }
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

function getTotalCart() {
  let total = 0;
  cart.forEach(function (element) {
    total += element.price * element.quantity;
  });
  return total.toFixed(2);
}

function getAmount(qty,price){
    let amount = qty * price;
    return amount.toFixed(2);
}

function clearCart() {
  cart = [];
  let prods = document.getElementById("items-cart");
  prods.innerHTML =  "";
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  changeToCart();

}

function closeModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function changeToCart() {
  document.getElementById("category-title").innerHTML = "ORDER DETAIL";
  let cartaHTML = "";
  let prods = document.getElementById("productos");
  let container = document.createElement("div");
  container.classList.add("container");
  prods.innerHTML = "";
  let table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("center");
  table.classList.add("table-cart");
  let thead = document.createElement("thead");
  let theadrow = document.createElement("tr");
  theadrow.classList.add("nomobile");
  let theadcol1 = document.createElement("th");
  theadcol1.innerHTML = "Item";
  theadcol1.classList.add("nomobile");
  let theadcol2 = document.createElement("th");
  theadcol2.innerHTML = "Qty.";
  let theadcol3 = document.createElement("th");
  theadcol3.innerHTML = "Description";
  let theadcol4 = document.createElement("th");
  theadcol4.innerHTML = "Unit price";
  theadcol4.classList.add("nomobile");
  let theadcol5 = document.createElement("th");
  theadcol5.innerHTML = "Amount";
  theadcol5.classList.add("nomobile");
  let theadcol6 = document.createElement("th");
  theadcol6.innerHTML = "Modify";
  theadrow.appendChild(theadcol1);
  theadrow.appendChild(theadcol2);
  theadrow.appendChild(theadcol3);
  theadrow.appendChild(theadcol4);
  theadrow.appendChild(theadcol5);
  theadrow.appendChild(theadcol6);
  thead.appendChild(theadrow);
  table.appendChild(thead);
  container.appendChild(table);
  prods.appendChild(container);
  let tbody = document.createElement("tbody");
  let i = 1;
  if (cart.length > 0) {
    cart.forEach(function (producto) {
      let tbodyrow = document.createElement("tr");
      let tbodycol1 = document.createElement("th");
      tbodycol1.innerHTML = i;
      tbodycol1.scope = "col";
      tbodycol1.classList.add("nomobile");
      let tbodycol2 = document.createElement("th");
      tbodycol2.innerHTML = producto.quantity;
      tbodycol2.scope = "col";
      let tbodycol3 = document.createElement("th");
      tbodycol3.innerHTML = producto.name;
      tbodycol3.scope = "col";
      let tbodycol4 = document.createElement("th");
      tbodycol4.innerHTML = producto.price;
      tbodycol4.scope = "col";
      tbodycol4.classList.add("nomobile");
      let tbodycol5 = document.createElement("th");
      tbodycol5.innerHTML = getAmount(producto.quantity,producto.price);
      tbodycol5.scope = "col";
      tbodycol5.classList.add("nomobile");
      let tbodycol6 = document.createElement("th");
      tbodycol6.scope = "col";
      let buttonPlus = document.createElement("button");
      buttonPlus.innerHTML = "+";
      buttonPlus.classList.add("btn-modify");
        buttonPlus.onclick = function () {
            producto.quantity++;
            tbodycol2.innerHTML = producto.quantity;
            tbodycol5.innerHTML = getAmount(producto.quantity,producto.price);
            document.getElementById("total-cart").innerHTML = "Total: $" + getTotalCart();

        };
      let buttonMinus = document.createElement("button");
      buttonMinus.classList.add("btn-modify");
      buttonMinus.innerHTML = "-";
      buttonMinus.onclick = function () {
          if(producto.quantity >= 1){
            if(producto.quantity === 1){
                cart.splice(cart.indexOf(producto), 1);
                tbody.removeChild(tbodyrow);
                document.getElementById("total-cart").innerHTML = "Total: $" + getTotalCart();
            }
            else{
                producto.quantity--;
                tbodycol2.innerHTML = producto.quantity;
                tbodycol5.innerHTML = getAmount(producto.quantity,producto.price)
                document.getElementById("total-cart").innerHTML = "Total: $" + getTotalCart();
            }

        }
        
    };
      tbodycol6.appendChild(buttonPlus);
      tbodycol6.appendChild(buttonMinus);

      tbodyrow.appendChild(tbodycol1);
      tbodyrow.appendChild(tbodycol2);
      tbodyrow.appendChild(tbodycol3);
      tbodyrow.appendChild(tbodycol4);
      tbodyrow.appendChild(tbodycol5);
      tbodyrow.appendChild(tbodycol6);
      tbody.appendChild(tbodyrow);
      i++;
    });
  }
  table.appendChild(tbody);

  container.appendChild(table);
  let finish = document.createElement("div");
    finish.classList.add("container");
    let rowFinish = document.createElement("div");
    rowFinish.classList.add("row");
    let colFinish1 = document.createElement("div");
    colFinish1.classList.add("col-12");
    colFinish1.classList.add("col-md-6");
    colFinish1.classList.add("left");
    let colFinish2 = document.createElement("div");
    colFinish2.id="btns-finish"
    colFinish2.classList.add("col-12");
    colFinish2.classList.add("col-md-6");
    colFinish2.classList.add("right");
    let total = document.createElement("p");
    total.id = "total-cart";
    total.innerHTML = "Total: $" + getTotalCart();
    colFinish1.appendChild(total);
    let buttonCancel = document.createElement("button");
    buttonCancel.classList.add("btn-cancel");
    buttonCancel.innerHTML = "Cancel";
    buttonCancel.onclick = function () {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
    let buttonConfirm = document.createElement("button");
    buttonConfirm.classList.add("btn-confirm");
    buttonConfirm.innerHTML = "Confirm order";
    buttonConfirm.onclick = function () {
        let pedido =[];
        let i = 1;
        cart.forEach(function (producto) {
            pedido.push({
                "item": i,
                "quantity": producto.quantity,
                "description": producto.name,
                "unitPrice": producto.price,
            });

            i++;
        });

        console.log(JSON.parse(JSON.stringify(pedido)));
        clearCart();
        changeToCart();

    }

    colFinish2.appendChild(buttonCancel);
    colFinish2.appendChild(buttonConfirm);
    rowFinish.appendChild(colFinish1);
    rowFinish.appendChild(colFinish2);
    finish.appendChild(rowFinish);
    container.appendChild(finish);
}





