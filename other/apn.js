// Push notification for iOS
var apn = require('apn');

// Config apnConnection
var pem = 'config/dev_cer.pem';
var options = { production: false, key: pem, cert: pem, passphrase: '1' };
var apnConnection = new apn.Connection(options);

// Device to push
var device_token = 'c77477eeac54c1dd4c196e9baf29a5b3f051b3e0a7bb5ed9be14bef062005533';
var myDevice = new apn.Device(device_token);

// Message to send
var note = new apn.Notification();
note.badge = 1;
note.sound = "pinga.iff";
note.alert = "Hello from XShop owner";
note.payload = {'messageFrom': 'XShop'};

// Push
apnConnection.pushNotification(note, myDevice);