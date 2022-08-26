$(() => {

  // functions 
    getSrcImg();

    var cartItemsSrc = [];
    var cartItems = [];

    function turnCart(e){
      let currentItem = e.currentTarget;
      let card = currentItem.lastElementChild.lastElementChild.currentSrc;
      currentItem.classList.add("visible");
      checkCart(card,currentItem);
    }

    function checkCart(card, currentCart) {
      cartItemsSrc.push(card);
      cartItems.push(currentCart);

      console.log("cartItemsSrc 0 =>",cartItemsSrc[0],"cartItemsSrc 1 =>",cartItemsSrc[1]);
      console.log("cartItems 0 =>",cartItems[0],"cartItem 1 =>",cartItems[1]);


      if(cartItemsSrc.length == 2) {
        if(cartItemsSrc[0] === cartItemsSrc[1]) {
          cartItems[0].classList.add("matched");
          cartItems[1].classList.add("matched");
          cartItemsSrc = [];
          cartItems = [];
      }
        else {
          setTimeout(() => {
            cartItems[0].classList.remove("visible");
            cartItems[1].classList.remove("visible");
            cartItemsSrc = [];
            cartItems = [];
          }, 1000);
      }
      }
    }

    function getSrcImg() {
      $.getJSON("../json/card.json",
  
        (data) => {
          $("div#card__row").html("");
  
          for (let i = 0; i < 2; i++) {
            $.each(data, function (key, value) {
              let str = "";
  
              let cornerImg =
                "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Cobweb.png";
  
              let cornerImgGrey =
                "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/CobwebGrey.png";
  
              let spider =
                "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Images/Spider.png";
  
              str += "<div class='col-6 col-md-4 col-lg-3 p-0 m-0 d-flex align-items-center justify-content-center'>";
              str += `<div class="card-item rounded">
                  <div class="card-back card-face bg-dark rounded">
                       <img class="cob-web cob-web-top-left"
                         src="${cornerImg}">
                       <img class="cob-web cob-web-top-right"
                         src="${cornerImg}">
                       <img class="cob-web cob-web-bottom-left"
                         src="${cornerImg}">
                       <img class="cob-web cob-web-bottom-right"
                         src="${cornerImg}">
                       <img class="spider"
                         src="${spider}">
                     </div>
                     <div class="card-front card-face">
                       <img class="cob-web cob-web-top-left"
                         src="${cornerImgGrey}">
                       <img class="cob-web cob-web-top-right"
                         src="${cornerImgGrey}">
                       <img class="cob-web cob-web-bottom-left"
                         src="${cornerImgGrey}">
                       <img class="cob-web cob-web-bottom-right"
                         src="${cornerImgGrey}">
                       <img class="card-value"
                         src="${value.mainImg}">
                      </div>
                     </div>`;
              str += "</div>";
              $("div#card__row").html($("div#card__row").html() + str);

            });
          }

            $("div.card-item").click(turnCart);

  
        });
  
    };
  });