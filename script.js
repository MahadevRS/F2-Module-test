async function getMenu() {

  try {
    let response = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");

    let result = await response.json();

    console.log(result);
    displayMenu(result);

    try {
      let order = await TakeOrder(result);
      console.log("Order : ", order);

      try {
        let orderObj = await orderPrep(order);
        console.log("order Object : ", orderObj);

        try {
          let orderObject = await payOrder(orderObj);
          console.log("order Object : ", orderObject);

          thankyouFnc(orderObject);
        }
        catch {
          console.log("Error while paying for Order");
        }
      }
      catch {
        console.log("Error prepping Order");
      }
    }

    catch {
      console.log("Error taking Order");
    }
  }
  catch (error) {
    console.log("Error fetching data : ", error);
  }

}

getMenu();

function displayMenu(menuList) {

  let container = document.getElementsByClassName("container")[0];

  for (let i = 0; i < menuList.length; i++) {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      `<div class="image">
      <img src = "${menuList[i].imgSrc}" alt = "img">
      </div >

      <div class="right">
        <p class="name">${menuList[i].name}</p>

        <div class="bottom">
          <p class="price">${menuList[i].price}$</p>
          <button disabled="disabled">Select</button>
        </div>
      </div>`

    container.append(card);
  }

}

async function TakeOrder(menuList) {

  let orders = {}

  for (let i = 0; i < 3; i++) {
    let randomid = Math.floor((Math.random() * menuList.length));
    orders[i] = menuList[randomid];
  }

  let promise = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(orders);
    }, 2500)
  })

  return promise;

}

async function orderPrep(order) {

  let obj = {
    order_status: true,
    paid: false
  }

  let promise = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(obj);
    }, 1500)
  })

  return promise;
}


async function payOrder(obj) {

  obj.paid = true;

  let promise = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(obj);
    }, 1500)
  })

  return promise;

}

function thankyouFnc(obj) {

  if (obj.paid) {
    alert("Thankyou for eating with us today!")
  }
}


