var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('restaurants', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'restaurantdb' database");
        db.collection('restaurants', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'restaurants' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving restaurant: ' + id);
    db.collection('restaurants', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('restaurants', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addRestaurant = function(req, res) {
    var wine = req.body;
    console.log('Adding restaurant: ' + JSON.stringify(restaurant));
    db.collection('restaurants', function(err, collection) {
        collection.insert(restaurant, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateRestaurant = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating restaurant: ' + id);
    console.log(JSON.stringify(restaurant));
    db.collection('restaurants', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, restaurant, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating restaurant: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(restaurant);
            }
        });
    });
}

exports.deleteRestaurant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting restaurant: ' + id);
    db.collection('restaurants', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// take from mongoDB getting started site
//
var populateDB = function() {

    var restaurants = [
        {
            "address": {
                "building": "1007",
                "coord": [ -73.856077, 40.848447 ],
                "street": "Morris Park Ave",
                "zipcode": "10462"
            },
            "borough": "Bronx",
            "cuisine": "Bakery",
            "grades": [
                { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
                { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
                { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
                { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
                { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
            ],
            "name": "Morris Park Bake Shop",
            "restaurant_id": "30075445"
        }];

    db.collection('restaurants', function(err, collection) {
        collection.insert(restaurants, {safe:true}, function(err, result) {});
    });
};