$(function(){
	
	// Menu settings
  $('[data-toggle=offcanvas]').click(function() {
		$('.row-offcanvas-left').toggleClass('active');
    $('#menu-toggle').toggleClass('active');
    if($('#menu-toggle').hasClass('active')){
      $('#menu-glyph').removeClass('fa-bars');
      $('#menu-glyph').addClass('fa-arrow-left');
    } else {
      $('#menu-glyph').removeClass('fa-arrow-left');
      $('#menu-glyph').addClass('fa-bars');
    }

	});
  // var sidebarWidth = -Math.abs($('#sidebarWrap').width())
  // $('.row-offcanvas-left').css("-webkit-transform", "translate3d("+sidebarWidth+"px,0,0)");
  delay = 0;
  defaultInterval = 5000;
  var interval = defaultInterval;
  timerHandler = {};

/*------------------------------------------------------------------
[Read & Iterate JSON]
------------------------------------------------------------------*/

  $.getJSON('/assets/javascripts/data.json', function (info) {
      data = info
      $.each(data, function (key) {     
              iterateData(key);
          });
  }); 

  function iterateData(key){
      delay += interval;
      duration = interval / 5;
      console.log(duration);
      if(key == "1") {
        timerHandler[key] = setTimeout(function(){
            $(".hour").text("Hour " + key)
            updateFlows(1, duration);
            updatetempGauges(1, duration);
          }, 1000)
      } else {timerHandler[key] = setTimeout(function(){
          $(".hour").text("Hour " + key)
          updateFlows(key, duration);
          updatetempGauges(key, duration);
        }, delay)
      }
  };  

/*------------------------------------------------------------------
[Range Control]
------------------------------------------------------------------*/

$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  });

/*------------------------------------------------------------------
[Speed Control]
------------------------------------------------------------------*/

  $( "#slider" ).slider({
      value:0,
      min: -10,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        var newValue = ui.value;
        $( "#speed" ).val( newValue );
        refreshTimer(newValue);
      }
    });

  $( "#speed" ).val( $( "#slider" ).slider( "value" ) );

//Plus/Minus Controls
  $("#speed-plus").click(function() {
    var value = $("#slider").slider("value"),
        step = $("#slider").slider("option", "step"),
        newValue = value + step;
    refreshTimer(newValue);

    $("#slider").slider("value", value + step);
    $("#speed").val( $("#slider").slider("value")); 

    
  });

  $("#speed-minus").click(function () {
      var value = $("#slider").slider("value"),
          step = $("#slider").slider("option", "step"),
          newValue = value - step;
      refreshTimer(newValue);

      $("#slider").slider("value", value - step);
      $("#speed").val( $("#slider").slider("value")); 

          
  });

/*------------------------------------------------------------------
[Refresh Event Handler]
------------------------------------------------------------------*/

  function refreshTimer(newValue){
      var value = $("#slider").slider("value"),
          step = $("#slider").slider("option", "step"),
          min = $("#slider").slider("option","min"),
          max = $("#slider").slider("option","max"),
          converter = 470;
          delay = 0;

          if(newValue >= 0){
            if (value < newValue) {
              interval = -Math.abs(newValue) * converter;
            } else if (value > newValue) {
              interval = -Math.abs(newValue) * converter;
            }
          } else {
            if (value < newValue) {
              interval = Math.abs(newValue) * converter;
            } else if (value > newValue) {
              interval = Math.abs(newValue) * converter;
            }
          }          

          interval += defaultInterval;

      for (var key in timerHandler){
        clearTimeout(timerHandler[key])
        iterateData(key)
      }
  }

})