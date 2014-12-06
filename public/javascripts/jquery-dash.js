$(function(){
	
/*------------------------------------------------------------------
[Initialize]
------------------------------------------------------------------*/
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


  delay = 0;
  defaultInterval = 5000;
  var interval = defaultInterval;
  timerHandler = {};


/*------------------------------------------------------------------
[Read & Iterate JSON]
------------------------------------------------------------------*/
  setInterval(function(){
      $.getJSON('trillium/data', function (info) {
        data = info;
        var size = Number(data.length);
        rangeControl(size);
        $.each(data, function (key, value) {     
                iterateData(key, value);
            });
    }); 
  },10000);

  function iterateData(key, value){
      delay += interval;
      duration = interval / 5;

      //Convert Unix timestamp to DateTime
      var timestamp = new Date(value.timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = timestamp.getFullYear();
      var month = months[timestamp.getMonth()];
      var date = timestamp.getDate();
      var hour = timestamp.getHours();
      var min = timestamp.getMinutes();
      var sec = timestamp.getSeconds();

      if(key == value.timestamp) {
        timerHandler[key] = setTimeout(function(){
            //Display DateTime
            $(".hour").text(date + ', ' + month + ' ' + year + ' ' + hour + ':00');//data[key].date
            updateFlows(key, duration);
            updatetempGauges(key, duration);
          }, 500);
      } else {timerHandler[key] = setTimeout(function(){
          //Display DateTime
          $(".hour").text(date + ', ' + month + ' ' + year + ' ' + hour + ':00');//data[key].date
          updatetempGauges(key, duration);
          updateGhx(key);
        }, delay);
      } 
  }

/*------------------------------------------------------------------
[Range Control]
------------------------------------------------------------------*/

function rangeControl(size){
    $( "#slider-range" ).slider({
      range: true,
      min: 1,
      max: size,
      values: [1, size ],
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        refreshRange(ui.values[0], ui.values[1]);
      }
    });
    $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
}

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
          min = $("#slider-range").slider("option").values[0],
          max = $("#slider-range").slider("option").values[1],
          range = max - min,
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

      refreshRange(currentIndex, max);
  }

  function refreshRange(min, max) {
    var value = $("#slider").slider("value"),
        range = max - min,
        converter = 470;

    delay = 0;

    for (var key in timerHandler) {
      clearTimeout(timerHandler[key]);
    }

    for (rangeKey=min; rangeKey<=max; rangeKey++) {
      iterateData(rangeKey, min);
    }
  }

  function resetDraw() {
    $(".hour").text("Hour " + 0);
    for (var flowkey in flows) {
      flows[flowkey].redraw(0,0,0);
    }

    for (var tempkey in tempgauges) {
      tempgauges[tempkey].redraw(0,0,0);
    }

  }

});

/*------------------------------------------------------------------
[Count # of keys]
------------------------------------------------------------------*/

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};