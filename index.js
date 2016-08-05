var express = require('express');
var path = require('path');
var product = require('./models/product');
var subscriber = require('./models/subscriber');
var pusher = require('./push_services/pusher');
var bodyParser = require('body-parser');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Just hello page
app.get('/hello', function(req, res) {
	res.render('hello', {name: 'thucdx'});
});

// Get list of all products
app.get('/products', function(req, res) {
	res.json(product.getAll());
});

// Get product detail by id
app.get('/products/:productid', function(req, res) {
	res.json(product.get(req.params.productid));
});

// Change product details
app.post('/products/:productid', function(req, res) {
	var curProduct = product.get(req.params.productid);
	var newDetail = curProduct;

	if (req.body.name != undefined) {
		newDetail.name = req.body.name;
	}

	if (req.body.image != undefined) {
		newDetail.image = req.body.image;
	}

	if (req.body.description != undefined) {
		newDetail.description = req.body.description;
	}

	if (req.body.price != undefined) {
		var curPrice = curProduct.price;
		newDetail.price = req.body.price;

		if (newDetail.price != curPrice) {
			var message = "[Price changed] " + curProduct.name + " :" + curPrice + " -> " + newDetail.price;
			console.log(message);
			pusher.notifyAll(subscriber.getAll(), message);		
		}
	}

	res.json(
		product.updateById(req.params.productid, newDetail)
	);
});

// Get list of subscribers
app.get('/subscribers', function(req, res) {
	res.json(subscriber.getAll());
});

// Subscribe
app.post('/subscribe', function(req, res) {
	var device_token = req.body.device_token;
	var os = req.body.os;

	if (device_token == undefined || os == undefined || (os != 1 && os != 2)) {
		res.send(JSON.stringify({ status: "ERROR!" }));
		return;
	}

	subscriber.subscribe(device_token, os);
	res.send(JSON.stringify({status: "GOT: " + device_token + " " + os }));
});

app.listen(3000, function() {
	console.log('Server is up and listening to port 3000');
})

