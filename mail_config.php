<?php
/**
 * Mail Configuration
 * Centralized SMTP configuration using environment variables
 * Supports Zoho Mail SMTP
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function getMailer() {
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = getenv('MAIL_HOST') ?: 'smtp.zoho.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = getenv('MAIL_USERNAME') ?: 'marketing@boostigital.com';
        $mail->Password   = getenv('MAIL_PASSWORD') ?: '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = getenv('MAIL_PORT') ?: 587;
        
        // Default sender
        $mail->setFrom(
            getenv('MAIL_FROM_ADDRESS') ?: 'marketing@boostigital.com',
            getenv('MAIL_FROM_NAME') ?: 'Boostigital'
        );
        
        // Character set
        $mail->CharSet = 'UTF-8';
        
        return $mail;
        
    } catch (Exception $e) {
        error_log("Mail configuration error: " . $e->getMessage());
        throw $e;
    }
}
