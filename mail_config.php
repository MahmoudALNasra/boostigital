<?php
/**
 * Mail Configuration
 * Centralized email configuration.
 * Supports:
 *   - Zoho SMTP via PHPMailer (getMailer) – kept for future use
 *   - Mailjet HTTP API (sendWithMailjet) – used now to avoid SMTP port blocks
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Mailjet\Resources;

/**
 * Existing PHPMailer SMTP helper (Zoho) – currently not used in production
 */
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

/**
 * Send an email via Mailjet HTTP API.
 * Reads credentials and defaults from environment variables:
 *   MAILJET_API_KEY, MAILJET_API_SECRET,
 *   MAILJET_FROM_EMAIL, MAILJET_FROM_NAME,
 *   MAILJET_TO_EMAIL (fallback if no explicit to address given)
 */
function sendWithMailjet(string $subject, string $textBody, string $replyToEmail = null, string $replyToName = null) {
    // Load .env first so getenv() has values in both CLI and FPM
    $envPath = __DIR__ . '/.env';
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) {
                continue;
            }
            if (strpos($line, '=') === false) {
                continue;
            }
            list($name, $value) = explode('=', $line, 2);
            putenv(trim($name) . '=' . trim($value));
        }
    }

    $apiKey    = getenv('MAILJET_API_KEY') ?: '';
    $apiSecret = getenv('MAILJET_API_SECRET') ?: '';
    $fromEmail = getenv('MAILJET_FROM_EMAIL') ?: 'marketing@boostigital.com';
    $fromName  = getenv('MAILJET_FROM_NAME') ?: 'Boostigital';
    $toEmail   = getenv('MAILJET_TO_EMAIL') ?: 'info@boostigital.com';
    $toName    = getenv('MAILJET_TO_NAME') ?: 'Boostigital Info';

    if (empty($apiKey) || empty($apiSecret)) {
        throw new Exception('Mailjet API credentials are not configured.');
    }

    $mj = new \Mailjet\Client($apiKey, $apiSecret, true, ['version' => 'v3.1']);

    $payload = [
        'Messages' => [[
            'From' => [
                'Email' => $fromEmail,
                'Name'  => $fromName,
            ],
            'To' => [[
                'Email' => $toEmail,
                'Name'  => $toName,
            ]],
            'Subject'  => $subject,
            'TextPart' => $textBody,
        ]],
    ];

    if ($replyToEmail) {
        $payload['Messages'][0]['ReplyTo'] = [
            'Email' => $replyToEmail,
            'Name'  => $replyToName ?: $replyToEmail,
        ];
    }

    $response = $mj->post(Resources::$Email, ['body' => $payload]);

    if (!$response->success()) {
        $status = $response->getStatus();
        $data   = $response->getData();
        error_log('Mailjet send failed. Status: ' . $status . ' Response: ' . json_encode($data));
        throw new Exception('Mailjet API error.');
    }
}
