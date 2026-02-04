<?php

$fn = isset($_POST['firstname']) ? trim($_POST['firstname']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
#$ln = $_POST['lastname'];
#$phone = $_POST['number'];

$invalidfirst = "You must enter a valid first name";
$invalidemail = "You must enter a valid e-mail";

$n_regex = "/^[^\d\W]+$/i";
$mail_regex = '/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/';

if (!isset($_POST['firstname']) || $fn === '') {
    echo $invalidfirst;
} elseif (!preg_match($n_regex, $fn)) {
    echo $invalidfirst;
} elseif (!isset($_POST['email']) || $email === '') {
    echo $invalidemail;
} elseif (!preg_match($mail_regex, $email)) {
    echo $invalidemail;
} else {
    echo "valid";
}

/*if (!isset($ln)){
    echo "You must enter a valid last name";
} else {
    trim(preg_match_all($n_regex,$fn));
    if(!trim(preg_match_all($n_regex,$fn));){
        echo()
    }
    }*/

?>