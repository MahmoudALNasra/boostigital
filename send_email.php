<?php
header('Content-Type: text/plain');

// Enable error logging
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'mail_errors.log');

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

// Prepare email
$to = "info@boostigital.com";
$subject = "New Contact from " . htmlspecialchars($_POST['full-name']);
$message = "New Contact Form Submission:\n\n";
$message .= "Name: " . htmlspecialchars($_POST['full-name']) . "\n";
$message .= "Email: " . htmlspecialchars($_POST['contact-email']) . "\n";
$message .= "Company: " . (isset($_POST['company-name']) ? htmlspecialchars($_POST['company-name']) : 'N/A') . "\n";
$message .= "Phone: " . (isset($_POST['contact-number']) ? htmlspecialchars($_POST['contact-number']) : 'N/A') . "\n";

// Sanitize and validate email
$userEmail = filter_var($_POST['contact-email'], FILTER_SANITIZE_EMAIL);
if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    die("Error: Invalid email address.");
}

$headers = [
    'From' => 'noreply@boostigital.com',
    'Reply-To' => $userEmail,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=utf-8'
];

// Try sending
try {
    $mailSent = mail($to, $subject, $message, $headers);
    
    if (!$mailSent) {
        error_log("Mail function returned false");
        $lastError = error_get_last();
        error_log("Last error: " . print_r($lastError, true));
        die("Error: Could not send message. Please try again later.");
    }
    
    // Verify with a test file
    file_put_contents('mail_test.txt', "To: $to\nSubject: $subject\n\n$message");
    echo "Success! We'll contact you soon.";
    
} catch (Exception $e) {
    error_log("Mail exception: " . $e->getMessage());
    die("Error: System error occurred. Please contact support.");
}
?>
