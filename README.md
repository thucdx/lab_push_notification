### Introduction
Project for push notification workshop

Xshop is a famous icecream shop. There are many different tasty flavours. But there is one big problem: the price is literally too high. To solve this, ThucDX - shop's owner, want to develop a feature that allow potential customer to subsribe to 'price change'. So that whenever a price of an icecream changed, customer will be notified via his/her smartphone. 


### Start server

#### npm & node
To start server, you need to install `npm` and `node`. Please use google to install them first.

#### dependency
To install all necessary depencies for project
```
npm install
```

#### running up
```
npm start
```

### API Guide

#### Products list
Request
```
GET /products
```

Response
list of products. For example
```JSON
{
    items : [
        {
            "id": 1,
            "name": "product name 01",
            "description": "description",
            "price": 50000,
            "image": "http://abc.com/x.jpg"
        },

        {
            "id": 1,
            "name": "product name 01",
            "description": "description",
            "price": 50000,
            "image": "http://abc.com/x.jpg"
        }
    ]
}

```

#### Get product detail
Request
```
GET /products/:productId
```

Response
```JSON
{
    "id": 1,
    "name": "product name 01",
    "description": "description",
    "price": 50000,
    "image": "http://abc.com/x.jpg"
}
```

#### Update product detail

```
POST   /products/:productId
{
    "id": id,
    "name": "new_name",
    "image": "new_image_url",
    "price": "new_price"
}
```

#### Subscribe

Request
```JSON
PUSH /subscribe
{
    "device_token": "your_device_token",
    "os": 1
}
```

os : 1 - ios, 2 - android

#### Get subscriber list
```
GET /subscribers
```
