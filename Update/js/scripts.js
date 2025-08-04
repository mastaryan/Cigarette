//
$(function () {
  "use strict";

  /*----------------------------------------------------*/
  /* MOBILE DETECT FUNCTION
/*----------------------------------------------------*/
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  var windowVar = $(window);

  /////////////////////// ready
  $(document).on("ready", function () {
    var missionCarousel = $("#mission").find(".carousel.main ul");
    var tweetsCarousel = $("#tweets").find(".carousel.main ul");

    // Front slider.
    $(".front #top").height(windowVar.height());
    if (isMobile.any() == null) {
      $("body").addClass("support-fixed");
    }

    // Carousels.
    missionCarousel.carouFredSel({
      auto: {
        timeoutDuration: 8000,
      },
      responsive: true,
      prev: ".mission_prev",
      next: ".mission_next",
      width: "100%",
      scroll: {
        items: 1,
        duration: 1000,
        easing: "easeOutExpo",
      },
      items: {
        width: "2000",
        height: "variable", //  optionally resize item-height
        visible: {
          min: 1,
          max: 1,
        },
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true,
      },
    });

    tweetsCarousel.carouFredSel({
      auto: {
        timeoutDuration: 8000,
      },
      responsive: true,
      // prev: '.tweets_prev',
      // next: '.tweets_next',
      pagination: ".tweets_pag",
      width: "100%",
      scroll: {
        items: 1,
        duration: 1000,
        easing: "easeOutExpo",
      },
      items: {
        width: "2000",
        height: "variable", //  optionally resize item-height
        visible: {
          min: 1,
          max: 1,
        },
      },
      mousewheel: false,
      swipe: {
        onMouse: true,
        onTouch: true,
      },
    });

    windowVar.on("resize", updateSizes_vat).on("load", updateSizes_vat);
    function updateSizes_vat() {
      missionCarousel.trigger("updateSizes");
      tweetsCarousel.trigger("updateSizes");
    }
    updateSizes_vat();

    /*----------------------------------------------------*/
    // Sticky.
    /*----------------------------------------------------*/
    $("#top2").sticky({
      topSpacing: 0,
      getWidthFrom: "body",
      responsiveWidth: true,
    });

    /*----------------------------------------------------*/
    // PRELOADER CALLING
    /*----------------------------------------------------*/
    $(".onepage").queryLoader2({
      //barColor: "#fff",
      //backgroundColor: "#000",
      percentage: true,
      barHeight: 3,
      completeAnimation: "fade",
      minimumTime: 200,
    });

    /*----------------------------------------------------*/
    // PARALLAX CALLING
    /*----------------------------------------------------*/
    windowVar.on("load", function () {
      parallaxInit();
    });
    function parallaxInit() {
      var testMobile;
      testMobile = isMobile.any();

      if (testMobile == null) {
        $(".parallax .bg1").addClass("bg-fixed").parallax("50%", 0.5);
      }
    }
    parallaxInit();

    /*----------------------------------------------------*/
    // prettyPhoto
    /*----------------------------------------------------*/
    $("a[rel^='prettyPhoto']").prettyPhoto({
      animation_speed: "normal",
      theme: "dark",
      social_tools: false,
      allow_resize: true,
      default_width: 500,
      default_height: 344,
    });

    /*----------------------------------------------------*/
    // MENU SMOOTH SCROLLING
    /*----------------------------------------------------*/
    $(document).on(
      "click",
      ".navbar_ .nav a, .menu_bot a, .scroll-to",
      function (event) {
        //$(".navbar_ .nav a a").removeClass('active');
        //$(this).addClass('active');
        // var headerH = $('#top1').outerHeight();
        var headerH = $("#top2").outerHeight();
        var handb = $("html, body");
        if ($(this).attr("href") == "#home") {
          handb.animate(
            {
              scrollTop: 0 + "px",
              // scrollTop: $($(this).attr("href")).offset().top + 'px'
            },
            {
              duration: 1200,
              easing: "easeInOutExpo",
            }
          );
        } else {
          handb.animate(
            {
              scrollTop: $($(this).attr("href")).offset().top - headerH + "px",
              // scrollTop: $($(this).attr("href")).offset().top + 'px'
            },
            {
              duration: 1200,
              easing: "easeInOutExpo",
            }
          );
        }

        event.preventDefault();
      }
    );

    /*----------------------------------------------------*/
    // Appear
    /*----------------------------------------------------*/
    $(".animated").appear(function () {
      // console.log("111111111111");
      var elem = $(this);
      var animation = elem.data("animation");
      if (!elem.hasClass("visible")) {
        var animationDelay = elem.data("animation-delay");
        if (animationDelay) {
          setTimeout(function () {
            elem.addClass(animation + " visible");
          }, animationDelay);
        } else {
          elem.addClass(animation + " visible");
        }
      }
    });

    $(".yjsg-round-progress").appear(function () {
      var elem = $(this);
      var animationDelay = elem.data("animation-delay");
      if (animationDelay) {
        setTimeout(function () {
          $(elem).yjsgroundprogress();
        }, animationDelay);
      } else {
        $(elem).yjsgroundprogress();
      }
    });

    // Animate number
    $(".animated-number").appear(function () {
      var elem = $(this);
      var b = elem.text();
      var d = elem.data("duration");
      var animationDelay = elem.data("animation-delay");
      if (!animationDelay) {
        animationDelay = 0;
      }
      elem.text("0");

      setTimeout(function () {
        elem.animate(
          { num: b },
          {
            duration: d,
            step: function (num) {
              this.innerHTML = num.toFixed(0);
            },
          }
        );
      }, animationDelay);
    });
  });

  /////////////////////// load
  windowVar.on("load", function () {
    // if (!window.localStorage.getItem("password") || window.localStorage.getItem("password") !== "cigaretteracingky") {
    //   const password = "cigaretteracingky"; // Set your password here
    //   const userInput = prompt("Enter the password to access this page:");

    //   if (userInput !== password) {
    //     alert("Incorrect password. Access denied.");
    //     document.body.innerHTML = "<h1>Access Denied</h1>";
    //   } else {
    //     window.localStorage.setItem("password", userInput);
    //   }
    // }

    /*----------------------------------------------------*/
    // LOAD
    /*----------------------------------------------------*/
    //$('#load').fadeOut(2000).remove();
    $("#load").fadeOut(200, function () {
      $(this).remove();
    });
  });
});
