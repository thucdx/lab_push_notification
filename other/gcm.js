// Push notification for Android
var gcm = require('node-gcm');
var sender = new gcm.Sender('AIzaSyAsg1PzI6_wJybitvOTHYWtx7SsezJgJGE');

var device_tokens = [ 
'eUkNBbz9JPI:APA91bEvvREylKnpzOOlUrBF0xp38ceNG8jaRgmQGvG4cr8uN-lIY6Ka5WUJbjFl0XWMt9fl9er87mcnXeWe7cDSNtrHh3P-odAqjROjwvV9GMMphTmMFVT7ovZUeqpAOhvUtYyTfkGw'
];

var message = new gcm.Message({
	data: { key1: 'msg1' },
	notification: {
		title: 'Hello world',
		body: 'Hello anh Thang'
	}
});

sender.send(message,  {registrationTokens: device_tokens}, function (err, response) {
	if (err) {
		console.log("error!");
		console.error(err);
	}
	else {
		console.log(response);
		console.log("OK !");	
	}
});