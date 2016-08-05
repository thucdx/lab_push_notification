var apn = require('apn');
var device_token = 'c77477eeac54c1dd4c196e9baf29a5b3f051b3e0a7bb5ed9be14bef062005533';
var pem = 'config/dev_cer.pem';
var options = { production: false, key: pem, cert: pem, passphrase: '1' };
var apnConnection = new apn.Connection(options);
var myDevice = new apn.Device(device_token);

var note = new apn.Notification();
note.badge = 1;
note.sound = "pinga.iff";
note.alert = "Hello from XShop owner";
note.payload = {'messageFrom': 'XShop'};

apnConnection.pushNotification(note, myDevice);