var flip_btn = $('a#play_flip_btn');
var flip_graphic = $('#hand');
var times_flip_graphic_played = 1;
var result_display = $('#result');

var bit_source_select = ""; 

sessionStorage.setItem("hotbits_flip_data","");
sessionStorage.setItem("hotbits_flips","")
sessionStorage.setItem("js_flips","");


$(document).ready(function(){
	// Get hot bits when first loaded
	// Handle server failure or maximum requests
	// Store the bits in sessionStorage
	get_hot_bits();
	update_user_management();
});

$(window).on('unload',function(){
	if(localStorage.username !== undefined){
		localStorage.setItem("hotbits_flips",sessionStorage.hotbits_flips);
		localStorage.setItem("js_flips",sessionStorage.js_flips);
	}
});

// Flip User interface // 
flip_btn.on('click',function(){
	update_display(bit_source_select);
});

flip_graphic.on('animationend',reset);

$('#username_display').append("<a id='toggle_user_tools' href='#'>Hide tools</a>");

$('#toggle_user_tools').on('click',function(){
	$('#username_tools').slideToggle();
	if(!$(this).hasClass('hide')){
		$(this).html('Show user tools');
	}else{
		$(this).html('Hide user tools');
	}
	$(this).toggleClass('hide');
});

$('#toggle_bit_source').on('click',function(e){
	//console.log(e.target.id);
	if(e.target.id === 'choose_hotbits'){
		$(this).find("#source_display").toggleClass('hotbits');
	}else{
		//$(this).find("#source_display").toggleClass('js');
	}
});

// User management // 
$('#save_username').on('click',function(){
	var current_user = $('#username').val();
	if(localStorage.username==undefined){ 
		localStorage.setItem("username",current_user);
		update_user_management();
	}
});

$('#update_username').on('click',function(){
	var new_name_field = $('#new_username');
	var new_name = new_name_field.val();
	localStorage.username = new_name;
	$('#username_display span').html(new_name);
	new_name_field.val('');

});


$('#clear_data').on('click',function(){
	localStorage.removeItem('hotbits_flips');
	localStorage.removeItem('js_flips');
});

$('#delete_user').on('click',function(){
	localStorage.clear();
	$('#signup').show();
	$('#username_display').hide();
});

$('#choose_hotbits').on('click',function(){
	bit_source_select = "hotbits";
});

$('#choose_js').on('click',function(){
	bit_source_select = "javascript";
});

// Helper functions // 

// Retrieves bits from HotBits server // 
var get_hot_bits = function(){
	$.get('get_hot_bits.php',function(data){
		var hotbits = $.trim(data["random-data"]);
		hotbits = hotbits.replace(/\s+/g, ',');
		var hotbits_session = '';
		hotbits = hotbits.split(',');
		hotbits.forEach(function(val){
			hotbits_session += parseInt(val,16).toString(2);
		});
		sessionStorage.hotbits_flip_data = hotbits_session;

	},"json").done(function(data){
		if(data["random-data"] !== undefined){
			bit_source_select = "hotbits";
		}else{
			bit_source_select = "javascript";
		}
	});

}	

/* 
	Starts the CSS animation 
	Gets data from localStorage to process as a coin flip
	-or- makes a flip with the JavaScript random number generator
	Displays the result of the flip 
*/ 
function update_display(source){
	result_display.fadeOut();
	flip_graphic.css('animation-play-state','running');
	var response = "";	
	if(source == "hotbits"){	
		current_flip = sessionStorage.hotbits_flip_data.slice(0,1);	
		sessionStorage.hotbits_flips += current_flip;
		if(Number(current_flip)){
			response = "Heads";
		}else{
			response = "Tails";
		}
		result_display.fadeIn().html("Hot Bits: " +current_flip);
		sessionStorage.hotbits_flip_data = sessionStorage.hotbits_flip_data.slice(1);
		
	}else if(source == "javascript"){	
		
		if(Math.random()>.500000){
			response = "js Heads";
			sessionStorage.js_flips += "1";
		}else{
			response = "js Tails";
			sessionStorage.js_flips += "0";
		}
	}
	result_display.fadeIn().html(response);
}

// Allows the CSS3 animation to be replayed 
function reset(e){
	if(e.type === "animationend"){
		times_flip_graphic_played++;
		flip_graphic.css(
			{'animation-iteration-count':String(times_flip_graphic_played),
			 'animation-play-state':'paused'
			}
		);
	}
}

// Changes the visibility of the user management fields 
function update_user_management(){
	var name = localStorage.username;
	if(name!==undefined){
		$('#signup').hide();
		$('#username_display').show();
		$('#username_display span').html(name);
	}else{
		$('#username_display').hide();
	}
}



			
			