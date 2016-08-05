<?php

// Put your device token here (without spaces):
$deviceToken = 'c77477eeac54c1dd4c196e9baf29a5b3f051b3e0a7bb5ed9be14bef062005533';

// Put your private key's passphrase here:
$passphrase = '1';

// Put your alert message here:
$message = $argv[1]; 
$url = $argv[2];

if (!$message || !$url)
    exit('Example Usage: $php newspush.php \'Breaking News!\' \'http://www.dantri.com.vn\'' . "\n");

////////////////////////////////////////////////////////////////////////////////

$ctx = stream_context_create();
stream_context_set_option($ctx, 'ssl', 'local_cert', 'dev_cer.pem');
stream_context_set_option($ctx, 'ssl', 'passphrase', $passphrase);
var_dump('start connect to APNS');
// Open a connection to the APNS server
$fp = stream_socket_client(
  'ssl://gateway.sandbox.push.apple.com:2195', $err,
  $errstr, 60, STREAM_CLIENT_CONNECT|STREAM_CLIENT_PERSISTENT, $ctx);

if (!$fp)
  exit("Failed to connect: $err $errstr" . PHP_EOL);

echo 'Connected to APNS' . PHP_EOL;

// Create the payload body
$body['aps'] = array(
  'alert' => array(
      'loc-key'=> 'IC_MSG',
      'loc-args' => array('Viet'),
      'content' => "New message"
    ),
  'sound' => 'notes_of_the_optimistic.caf',
  'link_url' => $url,
  'category' => 'INCOMING_CALL'
  );
$body['extension_id'] = '10073';
$body['call-type'] = '2';

// Encode the payload as JSON
$payload = json_encode($body);

// Build the binary notification
$msg = chr(0) . pack('n', 32) . pack('H*', $deviceToken) . pack('n', strlen($payload)) . $payload;
var_dump($payload);
// Send it to the server
$result = fwrite($fp, $msg, strlen($msg));

if (!$result) {
  echo 'Message not delivered' . PHP_EOL;
  var_dump($result);
}
else {
  echo 'Message successfully delivered' . PHP_EOL;
  var_dump($result);
}

// Close the connection to the server
fclose($fp);
