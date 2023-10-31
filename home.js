$(document).ready(function () {
    var slideCount = $("#slider ul.image_slider_ul li").length;
    var slideWidth = $("#slider ul.image_slider_ul li").width();
  
    $("#slider ul.image_slider_ul").css({ marginLeft: -slideWidth });
  
    $("#slider ul.image_slider_ul li:last-child").prependTo(
      "#slider ul.image_slider_ul"
    );
  
    function moveLeft() {
      $("#slider ul.image_slider_ul").animate(
        {
          left: +slideWidth,
        },
        1000,
        function () {
          $("#slider ul.image_slider_ul li:last-child").prependTo(
            "#slider ul.image_slider_ul"
          );
          $("#slider ul.image_slider_ul").css("left", "");
        }
      );
    }
  
    function moveRight() {
      $("#slider ul.image_slider_ul").animate(
        {
          left: -slideWidth,
        },
        2000,
        function () {
          $("#slider ul.image_slider_ul li:first-child").appendTo(
            "#slider ul.image_slider_ul"
          );
          $("#slider ul.image_slider_ul").css("left", "");
        }
      );
    }
  
    var navDots = [];
  
    for (var i = 0; i < slideCount; i++) {
      navDots[i] = '<li currentSlide="' + i + '"></li>';
      $(".indicator").append(navDots[i]);
    }
  
    var count = 0;
    $("ul.indicator li").eq(count).addClass("active");
  
    slideCountforindicators = slideCount - 1;
    $("button.control_prev").click(function () {
      moveLeft();
  
      $("ul.indicator li").eq(count).removeClass("active");
      count--;
      if (count < 0) {
        count = slideCountforindicators;
      }
  
      $("ul.indicator li").eq(count).addClass("active");
    });
  
    $("button.control_next").click(function () {
      moveRight();
  
      $("ul.indicator li").eq(count).removeClass("active");
      count++;
      if (count > slideCountforindicators) {
        count = 0;
      }
  
      $("ul.indicator li").eq(count).addClass("active");
    });
  
    //   Automatic Slider
  
    setInterval(function () {
      if ($("#slider").is(":hover")) {
        //   moveRight();
      } else {
        // if {
        moveRight();
        $("ul.indicator li").eq(count).removeClass("active");
        count++;
        if (count > slideCountforindicators) {
          count = 0;
        }
  
        $("ul.indicator li").eq(count).addClass("active");
      }
    }, 5000);
  });
  
  $(document).ready(function () {
    var scrollLink = $(".scroll");
  
    scrollLink.click(function (e) {
      e.preventDefault();
      $("body,html").animate(
        {
          scrollTop: $(this.hash).offset().top,
        },
        800
      );
    });
  
})