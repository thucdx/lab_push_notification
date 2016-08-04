var sample_products = require('./sample_products');
var products = sample_products;

module.exports =  {
	getAll: function() {
		console.log(products);
		console.log(products.length);
		return products;
	},

	get: function(productId) {
		for (var i = products.length - 1; i >= 0; i--) {
			if (products[i].id == productId) {
				return products[i];
			}
		}

		return "{}";
	},

	updateById: function(productId, productDetail) {
		for (var i = 0; i < products.length; ++i) 
			if (products[i].id == productId) {
				products[i] = productDetail;
				return JSON.stringify({status: "updated ok"});
			}

		return JSON.stringify({status: "product not found"});
	},

	update: function(productDetail) {
		return updateById(productDetail.id, productDetail);
	}
};

