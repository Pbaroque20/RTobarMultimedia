<?php

$fn = $_POST['firstname'];
#$ln = $_POST['lastname'];
#$phone = $_POST['number'];
#$email = $_POST['email'];
$invalidfirst = "You must enter a valid first name";

$n_regex = "/^[^\d\W]+$/i";
$fnmatch = preg_match_all($n_regex,$fn);


$mail_regex = "/([\w\d]+(\.)?){1,}@[\w\d]+\.[\w\d]{3}/";

if (isset($fn)){
    if ((preg_match($fnmatch)))
    echo "valid";
    $fn = trim($vfn);
} else {
    echo $invalidfirst;
}



/*if (!isset($ln)){
    echo "You must enter a valid last name";
} else {
    trim(preg_match_all($n_regex,$fn));
    if(!trim(preg_match_all($n_regex,$fn));){
        echo()
    }
    }

if (!isset($email)){
echo "You must enter a valid e-mail";
} else {
    trim(preg_match_all($mail_regex,$fn))
}*/

?>