<?php
header('Content-Type: text/plain');

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'needs_mail_errors.log');

// Load dependencies
require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/mail_config.php';

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Error: Invalid request method.");
}

// Validate required fields
$required = ['full-name', 'company-name', 'contact-email', 'service', 'message'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        die("Error: All required fields must be filled.");
    }
}

// Sanitize and validate email
$userEmail = filter_var($_POST['contact-email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email address.");
}

// Prepare email content
$fullName = htmlspecialchars($_POST['full-name']);
$companyName = htmlspecialchars($_POST['company-name']);
$contactNumber = isset($_POST['contact-number']) ? htmlspecialchars($_POST['contact-number']) : 'N/A';
$service = htmlspecialchars($_POST['service']);
$userMessage = htmlspecialchars($_POST['message']);
$language = isset($_POST['language']) ? $_POST['language'] : 'en';

$subject = "New Service Inquiry: " . $service;
$messageBody = "New Service Inquiry:\n\n";
$messageBody .= "Name: " . $fullName . "\n";
$messageBody .= "Company: " . $companyName . "\n";
$messageBody .= "Email: " . $userEmail . "\n";
$messageBody .= "Phone: " . $contactNumber . "\n";
$messageBody .= "Service: " . $service . "\n\n";
$messageBody .= "Message:\n" . $userMessage;

// Send email using Mailjet API
try {
    sendWithMailjet($subject, $messageBody, $userEmail, $fullName);
    
    // Log success
    error_log("Mailjet service inquiry email sent successfully from: " . $userEmail);
    
    echo $language === 'ar' 
        ? "تم الإرسال بنجاح! سنتواصل معك قريبًا." 
        : "Success! We'll contact you soon.";
    
} catch (Exception $e) {
    error_log("Mailjet error: " . $e->getMessage());
    
    echo $language === 'ar'
        ? "خطأ في الإرسال. يرجى المحاولة مرة أخرى."
        : "Error: Could not send message. Please try again later.";
}
?>