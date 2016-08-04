var express = require('express');
var path = require('path');
var product = require('./models/product');
var subscriber = require('./models/subscriber');
var app = express();
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

	if (device_token == null || os == null) {
		res.send(JSON.stringify({ status: "ERROR!"}));
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

