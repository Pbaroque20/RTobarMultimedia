<?php

header("refresh: 5; url=index.html");

?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>TobarMediaDesign</title>
    <link href="css/meyer_reset.css" rel="stylesheet" type="text/css" />
    <link href="css/send.css" rel="stylesheet" type="text/css" />
</head>
<body>

<?php
$to = "contact@tobarmediadesign.com";
$firstname = '';
$lastname = '';
$phonenumber = '';
$email = '';
$message = '';

if (isset($_POST['firstname'])) {
    $firstname = trim($_POST['firstname']);
}
if (isset($_POST['lastname'])) {
    $lastname = trim($_POST['lastname']);
}
if (isset($_POST['number'])) {
    $phonenumber = trim($_POST['number']);
}
if (isset($_POST['email'])) {
    $email = trim($_POST['email']);
}
if (isset($_POST['message'])) {
    $message = trim($_POST['message']);
}

$subject = $firstname ? ($firstname . ' is interested in your service!') : 'Contact form submission';

$body = "Name: " . $firstname . " " . $lastname . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . $phonenumber . "\n\n";
$body .= "Message:\n" . $message;

$headers = "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "From: " . $to . "\r\n";
if ($email) {
    $headers .= "Reply-To: " . $email . "\r\n";
}

$mailSent = mail($to, $subject, $body, $headers);

if($mailSent){
    echo "<div class='notification'>Your e-mail has been sent!</div>";
} else {
    echo "<div class='notification'>Sorry! Please try again at a later time.</div>";
};

echo "<p class='return'>Redirecting in 5 seconds...</p>"

?>

</body>
</html>