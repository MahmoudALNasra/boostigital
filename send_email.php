<?php
header('Content-Type: text/plain');

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'mail_errors.log');

// Load PHPMailer
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/mail_config.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    error_log("Invalid request method");
    die("Error: Invalid request method.");
}

// Validate required fields
$required = ['full-name', 'contact-email'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        error_log("Missing required field: $field");
        die("Error: Name and email are required.");
    }
}

// Sanitize and validate email
$userEmail = filter_var($_POST['contact-email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email address.");
}

// Prepare email content
$fullName = htmlspecialchars($_POST['full-name']);
$companyName = isset($_POST['company-name']) ? htmlspecialchars($_POST['company-name']) : 'N/A';
$contactNumber = isset($_POST['contact-number']) ? htmlspecialchars($_POST['contact-number']) : 'N/A';

$subject = "New Contact from " . $fullName;
$messageBody = "New Contact Form Submission:\n\n";
$messageBody .= "Name: " . $fullName . "\n";
$messageBody .= "Email: " . $userEmail . "\n";
$messageBody .= "Company: " . $companyName . "\n";
$messageBody .= "Phone: " . $contactNumber . "\n";

// Send email using PHPMailer
try {
    $mail = getMailer();
    
    // Recipients
    $mail->addAddress('info@boostigital.com', 'Boostigital Info');
    $mail->addReplyTo($userEmail, $fullName);
    
    // Content
    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body    = $messageBody;
    
    $mail->send();
    
    // Log success
    error_log("Email sent successfully from: " . $userEmail);
    echo "Success! We'll contact you soon.";
    
} catch (Exception $e) {
    error_log("PHPMailer error: " . $mail->ErrorInfo);
    die("Error: Could not send message. Please try again later.");
}
?>
