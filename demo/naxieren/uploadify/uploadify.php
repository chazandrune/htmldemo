<?php
/*
Uploadify
Copyright (c) 2012 Reactive Apps, Ronnie Garcia
Released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

// Define a destination
$targetFolder = '/demo/naxieren'; // Relative to the root

$verifyToken = md5('unique_salt' . $_POST['timestamp']);

if (!empty($_FILES) && $_POST['token'] == $verifyToken) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$typeFile = substr(strrchr($_FILES['Filedata']["name"], '.'), 1);
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $targetFolder;
	$name=substr($_FILES['Filedata']["name"],0,strrpos($_FILES['Filedata']["name"],'.'));
	//$name=getName();
	session_start();
	$_SESSION["file_name"]=$name;
	$datename=date("Y-m-d");
	if(!is_dir($targetPath."/".$datename)){
		mkdir($targetPath."/".$datename,0777);
	}
	$name=$datename."/".$name;
	$targetFile = rtrim($targetPath,'/') . '/'. $name . "." .$typeFile;
	
	// Validate the file type
	$fileTypes = array('mp3','MP3','OGG','ogg','MAV','mav'); // File extensions
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	
	if (in_array($fileParts['extension'],$fileTypes)) {
		//move_uploaded_file($tempFile,$targetFile);
		move_uploaded_file($tempFile,iconv("UTF-8","gb2312", $targetFile)); 
		echo $name;
	} else {
		echo '2';
	}
}
function getName(){
		$a=array('q','w','e','r','t','y','u','i','o','p');
		$b=array('J','K','L','Z','X','C','V','B','N','M');
		$c=array('A','S','D','F','G','H');
		$d=array('a','s','d','f','g','h');
		$time=time();
		eval("\$bc=\"$time\";");
		$num=strlen($bc);
		$str="";
		for($i=0;$i<$num;$i++){
			$n=$bc{$i};
			if($n%2==0){
				$str.=$a[$n];
			}else{
				$str.=$b[$n];
			}
		}
		for($i=0;$i<3;$i++){
			$k=rand(0,11);
			if($k<=5){
				$str.=$c[$k];
			}else{
				$k=$k-6;
				$str.=$c[$k];
			}
		}
		return $str;
	}
?>