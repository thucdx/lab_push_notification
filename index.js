var express = require('express');
var path = require('path');
var product = require('./models/product');
var subscriber = require('./models/subscriber');
var default_token = 'c77477eeac54c1dd4c196e9baf29a5b3f051b3e0a7bb5ed9be14bef062005533';
var app = express();
var pusher = require('./push_services/pusher');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/hello', function(req, res) {
	res.render('hello', {name: 'thucdx'});
});

app.get('/products', function(req, res) {
	res.json(product.getAll());
});

app.get('/products/:productid', function(req, res) {
	res.json(product.get(req.params.productid));
});

app.post('/products/:productid', function(req, res) {
	var cur_product = product.get(req.params.productid);
	var last_price = cur_product.price;
	var new_price = req.body.price;

	if (new_price != last_price) {
		console.log(pusher.notifyIos(default_token, "[Price changed] " + cur_product.name + " :" + last_price + " -> " + new_price));
	}

	res.json(
		product.updateById(req.params.productid, {
			id: req.body.id,
			name: req.body.name,
			image: req.body.image,
			description: req.body.description,
			price: req.body.price
		})
	);
});

app.get('/subscribers', function(req, res) {
	res.json(subscriber.getAll());
});

app.post('/subscribe', function(req, res) {
	var device_token = req.body.device_token;
	var os = req.body.os;

	if (device_token == null || os == null || (os != 1 && os != 2)) {
		res.send(JSON.stringify({ status: "ERROR!" }));
		return;
	}

	subscriber.subscribe(device_token, os);
	res.send(JSON.stringify({status: "GOT IT " + device_token + " " + os }));
});

// ADMIN
app.get('/admin', function(req, res) {
	res.render('admin', {products: product.getAll});
});

app.post('/admin', function(req, res) {

});

app.listen(3000, function() {
	console.log('Server is up and listening to port 3000');
})

