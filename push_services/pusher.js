// IOS push - APNS
var apn = require('apn');

/*
[FOR IOS]

TODO: config option to create a APN connection
You need to include your project KEY PEM, CERT PEM, and PASSPHRASE

Hint: https://github.com/argon/node-apn#connectings
*/
var options = {};
var apnConnection = new apn.Connection(options);


// ANDROID push - GCM
var gcm = require('node-gcm');

/*
[FOR ANDROID]

TODO: Enter the server api key you get from google cloud message
HINT: https://developers.google.com/cloud-messaging/android/start 	
*/

var sender = new gcm.Sender('YOUR_SERVER_API_KEY');

module.exports = {
	
	notifyIos: function(device_token, message) {
		var myDevice = new apn.Device(device_token);
		var note = new apn.Notification();
		// [FOR IOS] Prepare your note to push to ios client
		// TODO: add more properties to note
		// HINT: https://github.com/argon/node-apn#sending-a-notification
		note.badge = 1;

		
		// Push
		apnConnection.pushNotification(note, myDevice);
		return JSON.stringify({status: "push ios ok!"});
	},

	notifyAndroid: function(device_tokens, message) {
		console.log(device_tokens);

		// [FOR ANDROID] Prepare data before pushing to Android client
		// TODO: add more pair of key&value
		// HINT: https://www.npmjs.com/package/android-gcm
		var push_message = new gcm.Message({
			data: {
			},

			notification: {
				// TODO: Add more properties
			}
		});

		// Push
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

