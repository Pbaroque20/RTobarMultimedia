<?php

header("refresh: 5; url=index.html");

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Raphael Tobar - Multimedia Design</title>
    <link href="css/meyer_reset.css" rel="stylesheet" type="text/css" />
    <link href="css/send.css" rel="stylesheet" type="text/css" />
</head>
<body>

<?php
$to = "raphaeltobar@gmail.com";
$firstname = '';
$message = '';
$email = '';
if(isset($_POST['firstname'])){
    $firstname = $_POST['firstname'];
}
if(isset($_POST['lastname'])){
    $lastname = $_POST['lastname'];
}
if(isset($_POST['number'])){
    $phonenumber = $_POST['number'];
}
if(isset($_POST['email'])){
    $email = $_POST['email'];
}
if(isset($_POST['message'])){
    $message = $_POST['message'];
}
$rtrnTo = $to;


$mailSent = mail($to,$firstname . ' is interested in your service!',$message,$email,$rtrnTo);

if($mailSent){
    echo "<div class='notification'>Your e-mail has been sent!</div>";
} else {
    echo "<div class='notification'>Sorry! Please try again at a later time.</div>";
};

echo "<p class='return'>Redirecting in 5 seconds...</p>"

?>

</body>
</html>