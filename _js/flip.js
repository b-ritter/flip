var btn = $('a#play_flip_btn');
var flipper = $('#hand');
var result_display = $('#result');
var times_flipper_played = 1;
var response = "";
sessionStorage.setItem("flips","");


btn.on('click',function(){
	get_hot_bits();
	flipper.css('animation-play-state','running');
	result_display.fadeOut();
});

flipper.on('animationend',reset);

var get_hot_bits = function(){
	$.get('get_hot_bits.php',function(data){
		var my_flips = $.trim(data["random-data"]);
		my_flips = parseInt(my_flips,16).toString(2);
		current_flip = Number(my_flips.slice(-1));
	},"json").done(function(data){
			if(data["random-data"] !== undefined){				
				result_display.fadeIn().html("Hot Bits: " +current_flip);
			}else{
				
				if(Math.random()>.500000){
					response = "js Heads";
				}else{
					response = "js Tails";
				}
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

			
			