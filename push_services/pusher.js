var apn = require('apn');
var options = {production: false, key: 'config/dev_cer.pem', cert: 'config/dev_cer.pem', passphrase: '1' };
var apnConnection = new apn.Connection(options);

module.exports = {
	notifyAll: function(subscribers, message) {
		// ios
		for (var i = 0; i < subscribers["ios"].length; ++i) {
			var token = subscribers["ios"][i];
			notifyIos(token, message);
		}

		// android
		for (var i = 0; i < subscribers["android"].length; ++i) {
			var token = subscribers["android"][i];
			console.log("[Android] Going to notify " + token)
			// notifyIos(token, message);
		}

		return JSON.stringify({status: "done"});
	},

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

