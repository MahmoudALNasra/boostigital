<?php
header('Content-Type: text/plain');

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'needs_mail_errors.log');

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

// Prepare email content
$to = "info@boostigital.com";
$subject = "New Service Inquiry: " . htmlspecialchars($_POST['service']);
$message = "New Service Inquiry:\n\n";
$message .= "Name: " . htmlspecialchars($_POST['full-name']) . "\n";
$message .= "Company: " . htmlspecialchars($_POST['company-name']) . "\n";
$message .= "Email: " . htmlspecialchars($_POST['contact-email']) . "\n";
$message .= "Phone: " . (isset($_POST['contact-number']) ? htmlspecialchars($_POST['contact-number']) : 'N/A') . "\n";
$message .= "Service: " . htmlspecialchars($_POST['service']) . "\n\n";
$message .= "Message:\n" . htmlspecialchars($_POST['message']);

$headers = [
    'From' => 'noreply@boostigital.com',
    'Reply-To' => $_POST['contact-email'],
    'X-Mailer' => 'PHP/' . phpversion()
];

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo $_POST['language'] === 'ar' 
        ? "تم الإرسال بنجاح! سنتواصل معك قريبًا." 
        : "Success! We'll contact you soon.";
} else {
    echo $_POST['language'] === 'ar'
        ? "خطأ في الإرسال. يرجى المحاولة مرة أخرى."
        : "Error: Could not send message. Please try again later.";
}
?>