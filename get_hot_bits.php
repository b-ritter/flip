<?php
	
	$xml = simplexml_load_file(
		"https://www.fourmilab.ch/cgi-bin/Hotbits?nbytes=1&fmt=xml&npass=1&lpass=8&pwtype=3"
	);
	
	$json_string = json_encode($xml);
	echo $json_string;
?>