var btn = $('a#play_flip_btn');
var flipper = $('#hand');
var result_display = $('#result');
var times_flipper_played = 1;
var response;
sessionStorage.setItem("flips","");


btn.on('click',function(){
	get_hot_bits();
	flipper.css('animation-play-state','running');
	result_display.fadeOut();
});

flipper.on('animationend',reset);

var get_hot_bits = function(){
	$.get('get_hot_bits.php',function(data){
			var my_flip = $.trim(data["random-data"]);
			response = "Hex: "+my_flip;
			flip = parseInt(my_flip,16);
			response += (" Int: "+my_flip+" Heads or Tails");

			if(my_flip>=128){
				response += ": heads";
			}else{
				response += ": tails";
			}

		},"json").done(function(data){
			if(data["random-data"] !== undefined){
				result_display.fadeIn().html(response);
			}else{
				
				if(Math.random()>=.500000){
					response = "Heads";
					sessionStorage.flips+="1";
					
				}else{
					response = "Tails";
					sessionStorage.flips+="0";
				}
				//console.log(sessionStorage);
				result_display.fadeIn().html(response);
			}
		});
}	


function reset(e){
	
	if(e.type === "animationend"){
		times_flipper_played++;
		flipper.css(
			{'animation-iteration-count':String(times_flipper_played),
			 'animation-play-state':'paused'
			}
		);
	}

	
}

			
			