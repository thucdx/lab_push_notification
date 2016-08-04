var subscribers = []

module.exports = {
	subscribe: function(device_token, os) {
		subscribers.push({"device_token": device_token, "os": os});
		return JSON.stringify({status : "added to list"});
	},

	getAll: function() {
		return subscribers;
	}
}

