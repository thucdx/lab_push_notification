var apn = require('apn');
var options = {production: false, key: 'config/dev_cer.pem', cert: 'config/dev_cer.pem', passphrase: '1' };
var apnConnection = new apn.Connection(options);

module.exports = {
	notifyIos: function(device_token, message) {
		var myDevice = new apn.Device(device_token);
		var note = new apn.Notification();
		note.badge = 1;
		note.sound = "pinga.iff";
		note.alert = message;
		note.payload = {'messageFrom': 'XShop'};

		apnConnection.pushNotification(note, myDevice);
		return JSON.stringify({status: "push ios ok!"});
	},

	notifyAndroid: function(device_token, message) {
		return JSON.stringify({status: "not supported yet"});
	}
}

