//resCarousel
$(document).ready(function() {
  ResCarouselOnInit();
});

$(window).resize(function() {
  var r = new Date();
  setTimeout(function() {
    ResCarouselResize(r);
  }, 200);
});

function ResCarouselOnInit() {
  ResCarouselSize();
  $(document).on("click", ".leftRs, .rightRs", function() {
    ResCarousel(this);
  });
  $(document).on("mouseenter", ".ResHover", function() {
    $(this).addClass("ResHovered");
  });

  $(document).on("mouseleave", ".ResHover", function() {
    $(this).removeClass("ResHovered");
  });
}

// Rescarousel Auto Slide
function ResCarouselSlide(e) {
  var thiss = $(e).find(".rightRs");
  var dataInterval = $(e).attr("data-interval");
  !isNaN(dataInterval) &&
    $(e).addClass("ResHover") &&
    setInterval(function() {
      !thiss.parent().hasClass("ResHovered") && ResCarousel(thiss);
    }, +dataInterval);
}

function ResCarouselResize() {
  function myfunction() {
    console.log("resize Works");
    //var r = $('body').width();
    $(".resCarousel").each(function() {
      var divValue = $(this).attr("data-value");
      var itemWidth = $(this)
        .find(".item")
        .width();
      $(this)
        .find(".resCarousel-inner")
        .scrollLeft(divValue * itemWidth);
      //var itemsSplit = $(this).attr("data-items").split(',');
      //var it = r >= 1200 ? itemsSplit[3] : r >= 992 ? itemsSplit[2] : r >= 768 ? itemsSplit[1] : itemsSplit[0];
      //$(this).attr("data-itm", it);
    });
  }
  //var ResTimeout = setTimeout(function() { myfunction() }, 3000);
  //clearTimeout(ResTimeout);
  //ResTimeout = setTimeout(function() { myfunction() }, 3000);
  //console.log(ResTimeout);
  myfunction();
}

//this function define the size of the items
function ResCarouselSize() {
  var t0 = performance.now();

  //    styleCollector0 = styleCollector1 = styleCollector2 = styleCollector3 = "";
  $(".resCarousel").each(function(index) {
    var itemsSplit = $(this)
      .attr("data-items")
      .split("-");
    $(this).addClass("ResSlid" + index);

    for (var i = 0; i < 6; i++) {
      if (i == 0) {
        var styleCollector0 =
          ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
      } else if (i == 1) {
        var styleCollector1 =
          ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
      } else if (i == 2) {
        var styleCollector2 =
          ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
      } else if (i == 3) {
        var styleCollector3 =
          ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
      } else if (i == 4) {
        var styleCollector4 =
          ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
      }
    }

    $(this).attr("data-value", "0");
    //var r = $('body').width();
    //var it = r >= 1200 ? itemsSplit[3] : r >= 992 ? itemsSplit[2] : r >= 768 ? itemsSplit[1] : itemsSplit[0];
    //$(this).attr("data-itm", it);

    var styleCollector =
      "@media (min-width:320px){" +
      styleCollector0 +
      "}" +
      "@media (min-width:550px){" +
      styleCollector1 +
      "}" +
      "@media (min-width:768px){" +
      styleCollector2 +
      "}" +
      "@media (min-width:992px){" +
      styleCollector3 +
      "}" +
      "@media (min-width:1200px){" +
      styleCollector4 +
      "}";
    //$(this).append("<div class=\"ResStyleManager\"></div>")
    $(this)
      .find("style")
      .remove();
    $(this).append("<style>" + styleCollector + "</style>");
    ResCarouselSlide(this);
  });
  //console.log(styleCollector);
  //$("body").append("<div class=\"ResStyleManager\"></div>")
  //$('.ResStyleManager').html(null).append("<style>" + styleCollector + "</style>");
  var t1 = performance.now();
  console.log("Took", (t1 - t0).toFixed(4), "milliseconds to Size");
}

//this function used to move the items
function ResCarousel(Btn) {
  //var t0 = performance.now();
  var parent = $(Btn).parent(),
    slide = +parent.attr("data-slide"),
    itemsDiv = parent.find(".resCarousel-inner"),
    //divValueq = +parent.attr('data-value'),
    itemSpeed = +parent.attr("data-speed"),
    itemLoad = +parent.attr("data-load"),
    //animi = parent.attr("data-animator"),
    translateXval = "",
    currentSlide = "",
    itemLenght = itemsDiv.find(".item").length,
    itemWidth = itemsDiv.find(".item").outerWidth(),
    dataItm = +Math.round(itemsDiv.outerWidth() / itemWidth),
    cond = $(Btn).hasClass("leftRs"),
    divValue = Math.round(itemsDiv.scrollLeft() / itemWidth);
  //console.log(dataItm + "," + Math.abs(dataItmq));
  //console.log(divValue + "," + divValueq);
  //console.log(cond);
  //console.log(typeof + parent.attr("data-slide"))
  itemSpeed = !isNaN(itemSpeed) ? itemSpeed : 400;
  slide = slide < dataItm ? slide : dataItm;

  if (cond) {
    currentSlide = divValue - slide;
    translateXval = currentSlide * itemWidth;
    var MoveSlide = currentSlide + slide;
    //console.log(itemloop);
    if (divValue == 0) {
      currentSlide = itemLenght - slide;
      translateXval = currentSlide * itemWidth;
      currentSlide = itemLenght - dataItm;
      itemSpeed = 400;
      //console.log(currentSlide + "," + translateXval);
    } else if (slide >= MoveSlide) {
      currentSlide = translateXval = 0;
    }
  } else {
    currentSlide = divValue + slide;
    translateXval = currentSlide * itemWidth;
    var MoveSlide = currentSlide + slide;

    //console.log(itemLenght + "," + (MoveSlide + "," + slide + "," + dataItm));
    //console.log(itemLenght + "," + (MoveSlide - slide + dataItm));
    //console.log((divValue + dataItm) + "," + itemLenght);
    if (divValue + dataItm == itemLenght) {
      currentSlide = translateXval = 0;
      itemSpeed = 400;
    } else if (itemLenght <= MoveSlide - slide + dataItm) {
      currentSlide = itemLenght - slide;
      translateXval = currentSlide * itemWidth;
      currentSlide = itemLenght - dataItm;
    }
    // resCarouselAnimator(itemsDiv, currentSlide + 1, currentSlide + slide);
  }
  //console.log(slide + "," + itemWidth);
  parent.attr("data-animator") == "lazy" &&
    resCarouselAnimator(
      itemsDiv,
      cond ? 0 : 1,
      currentSlide + 1,
      currentSlide + dataItm,
      itemSpeed,
      slide * itemWidth
    );
  //console.log(itemsDiv.scrollLeft() + "," + translateXval)
  //console.log(itemSpeed);
  if (!isNaN(itemLoad)) {
    itemLoad = itemLoad >= slide ? itemLoad : slide;
    //console.log((itemLenght - itemLoad) <= currentSlide + dataItm);
    //console.log((itemLenght - itemLoad) + " ," + (currentSlide + dataItm) + " ," + (itemLenght - dataItm));
    itemLenght - itemLoad <= currentSlide + dataItm &&
      ResCarouselLoad1(itemsDiv);
  }
  itemsDiv.animate(
    {
      scrollLeft: translateXval
    },
    itemSpeed
  );
  parent.attr("data-value", currentSlide);

  //var t1 = performance.now();
  //console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate');
}

function ResCarouselLoad1(e) {
  //console.log(e.attr("id"));
  $("#" + e.attr("id")).trigger("ResCarouselLoad");
}

function resCarouselAnimator(parent, direction, start, end, speed, length) {
  //console.log(parent + "," + start + "," + end);
  var val = 5;
  if (direction == 0) {
    for (var i = start - 1; i < end + 1; i++) {
      val = val * 2;
    }
    val = -val;
  }
  //console.log(length);
  //if (direction == 1) {
  //    for (var i = start - 1; i < end + 1; i++) {
  //        length = length / 2
  //        console.log(length);
  //    }
  //    //val = val;
  //}
  //val = direction == 1 ? length : -length;

  for (var i = start - 1; i < end; i++) {
    val = direction == 0 ? val / 2 : val * 2;
    //console.log(val);
    //console.log(parent.find(".item").eq(i).find("h1").text());
    parent
      .find(".item")
      .eq(i)
      .css("transform", "translateX(" + val + "px)");
  }
  setTimeout(function() {
    parent.find(".item").attr("style", "");
  }, speed - 70);
}

//Controlar os collapses, quando abre um fecha outro.
/* $(document).click(function(e) {
	if (!$(e.target).is('.collapse multi-collapse')) {
        $('.collapse').collapse('hide');

    }
}); */

$(document).ready(function(e) {
  $(".collapse").on("show.bs.collapse", function() {
    //Executa coisas quando vai abrir o collapse
    var posx = $(".collapse").position().top;
    if (!$(e.target).is(".collapse multi-collapse")) {
      $(".collapse").collapse("hide");
    }
  });
  $(".collapse").on("hide.bs.collapse", function() {
    //Executa coisas quando vai fechar o collapse
    //$('.triangulo').css('display', 'none');//Esconder os triangulos abertos
  });
});

$(".information").click(function() {
  var ele = $(this)
    .parent()
    .parent()
    .parent()
    .parent()
    .find(".triangulo");
  if (ele.css("display") == "none") {
    $(".triangulo").css("display", "none"); //Esconder os triangulos abertos
    ele.css("display", "block"); //Mostra o triangulo selecionado
  } else {
    $(".triangulo").css("display", "none"); //Esconder os triangulos abertos
  }
});

//Debuga o que diabos eu to clicando meu odin
/*
$(document).click(function(e) {
    teste = $(e.target)
    alert(teste.html())
});
*/

// ===== Scroll to Top ====
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {
    // If page is scrolled more than 50px
    $("#return-to-top").fadeIn(200); // Fade in the arrow
  } else {
    $("#return-to-top").fadeOut(200); // Else fade out the arrow
  }
});
$("#return-to-top").click(function() {
  // When arrow is clicked
  $("body,html").animate(
    {
      scrollTop: 0 // Scroll to top of body
    },
    500
  );
});

$(document).ready(function() {
  // Transition effect for navbar
  $(window).scroll(function() {
    // checks if window is scrolled more than 500px, adds/removes solid class
    if ($(this).scrollTop() > 500) {
      $(".navbar").addClass("solid");
    } else {
      $(".navbar").removeClass("solid");
    }
  });
});

//NARUTOOOOOOOOOOOOOOOOOOOOO
//SUSUKEEEEEEEEEEEEEEEEEEEEE

/* JS pro menu de navegação principal */
let mainNavLinks = document.querySelectorAll("#navMain ul li a");
let mainSections = document.querySelectorAll(".container");

let lastId;
let cur = [];

// This should probably be throttled.
// Especially because it triggers during smooth scrolling.
// https://lodash.com/docs/4.17.10#throttle
// You could do like...
// window.addEventListener("scroll", () => {
//    _.throttle(doThatStuff, 100);
// });
// Only not doing it here to keep this Pen dependency-free.

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});
