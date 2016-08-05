### 1. Introduction
Project for push notification workshop.

![XShop icream](http://www.funzine.hu/wp-content/uploads/2014/05/140508_fagyizok-848x296.jpg)

`XShop` is a famous icecream shop. There are many different tasty flavours. But there is one big problem: the price is literally too high. To solve this, ThucDX - shop's owner, want to develop a feature that allow potential customer to subsribe to 'price change'. So that whenever a price of an icecream changed, customer will be notified via his/her smartphone. The feature should works for both Android and iOS clients

### 2. Running up

Project has been written in NodeJS

#### npm & node
To start server, you need to install `npm` and `node`. Please use google to install them first.

#### dependency
To install all necessary dependencies for project
```
npm install
```

#### running up
```
npm start
```

### 3. What to do
Project was almost done. The notification pushing was left for you. In particular, you need to fill out the configuration and write some code to `push_service/pusher.js`

Some hints:
- iOS: `apn` module is used to communicate with `APNS` (Apple Push Nofitication Service). Checkout an example in `other/apn.js`
- Android: `node-gcm` module is used to communcate with `GCM` (goolge cloud message). Checkout an example in `other/gcm.js`
- For those who is `php-aholic`, check out: `other/newspush-1.php`

### 4. Definition of Done
You are required to finish server code for either `Android` or `iOS`. Though both are warmly welcome :-)

Test case
> Step 1. Client (Android app / iOS app) subscribe to 'price change' by POST a JSON message to `/subscribe`

You could verify your tokens key was added by making a GET request to `/subscribers`

> Step 2. Server make change to 'price' of any product by making POST request to `/products/:productId`

You could verify price changed by making a GET request to `/products`

> WHAT TO EXPECT (IMPORTANT!):
Client receives a notification that details about pricing changed

> HINT: you should use `PostMan`(Chrome extension) or `curl` (unix utility) to make request to server

### 5. API Guide
#### Products list
Request
```
GET /products
```

Response
list of products. For example
```JSON
[
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
    "price": new_price
}
```

#### Subscribe

Request
```JSON
POST /subscribe
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
