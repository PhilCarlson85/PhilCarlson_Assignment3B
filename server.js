var express = require('express'),
    restaurants = require('./routes/restaurants');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/restaurants', restaurants.findAll);
app.get('/restaurants/:id', restaurants.findById);
app.post('/restaurants', restaurants.addRestaurant);
app.put('/restaurants/:id', restaurants.updateRestaurant);
app.delete('/restaurants/:id', restaurants.deleteRestaurant);

app.listen(3000);
console.log('Listening on port 3000...');