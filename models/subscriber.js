var subscribers = {ios: [], android: []};

// 1: ios, 2: android
module.exports = {
	subscribe: function(device_token, os) {
		// new {"device_token": device_token, "os": os});
		if (os == 2) {
			if (subscribers["android"].indexOf(device_token) < 0) {
				subscribers["android"].push(device_token);
			}
		} else if (os == 1) {
			if (subscribers["ios"].indexOf(device_token) < 0) {
				subscribers["ios"].push(device_token);
			}
		}

		return JSON.stringify({status : "added to list"});
	},

	getAll: function() {
		return subscribers;
	}
}

