// IOS push - APNS
var apn = require('apn');
var options = {production: false, key: 'config/dev_cer.pem', cert: 'config/dev_cer.pem', passphrase: '1' };
var apnConnection = new apn.Connection(options);


// ANDROID push - GCM
var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAsg1PzI6_wJybitvOTHYWtx7SsezJgJGE');
// Server API Key
// AIzaSyAsg1PzI6_wJybitvOTHYWtx7SsezJgJGE
// Sender ID help
// 1052369659845

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

	notifyAndroid: function(device_tokens, message) {
		console.log(device_tokens);

		var push_message = new gcm.Message({
			data: {
				shop: 'Xshop',
				category: 'Price has changed'
			},

			notification: {
				title: '[XShop] Price has changed!',
				body: message
			}
		});

		sender.send(push_message,  {registrationTokens: device_tokens}, function (err, response) {
    		if (err) {
    			console.log("error!");
    			console.error(err);
    		}
    		else {
    			console.log(response);
    			console.log("OK !");	
    		}
		});

		return JSON.stringify({status: "push android ok!"});
	},

	notifyAll: function(subscribers, message) {
		// ios
		for (var i = 0; i < subscribers["ios"].length; ++i) {
			var token = subscribers["ios"][i];
			this.notifyIos(token, message);
		}

		// android
		this.notifyAndroid(subscribers["android"], message);

		return JSON.stringify({status: "done"});
	}
}

