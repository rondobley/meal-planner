// Babel ES6/JSX Compiler
require('babel-register');

var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var favicon = require('serve-favicon');


var mongoose = require('mongoose');

var passport = require('passport');
var flash = require('connect-flash');

var configDb = require('./config/database');

var Dish = require('./models/dish');
var Tag = require('./models/tag');

mongoose.connect(configDb.database);
mongoose.connection.on('error', function () {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

require('./config/passport')(passport);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// required for passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect(301, '/');
}


app.all('/dish*', isLoggedIn);
app.all('/api/*', isLoggedIn);


/**
 * /api
 */
/**
 * GET /api/dishes
 */
app.get('/api/dishes', function (req, res, next) {
    Dish.find({})
        .exec(function (err, dish) {
            if (err) return next(err);

            return res.send(dish);
        });
});

/**
 * GET /api/dishes/search/tag/:tag
 * Returns found dishes
 */
app.get('/api/dishes/search/tag/:tags', function (req, res, next) {
    var tags = req.params.tags;
    var seacrhArray = tags.split(" ");
    Dish.find({tags: {"$in": seacrhArray}}, function (err, dishes) {
        if (err) return next(err);
        if (!dishes) {
            return res.status(404).send({message: 'No dishes found.'});
        }
        res.send(dishes);
    });
});

/**
 * /api/dish
 */
/**
 * GET /api/dish/:name
 * Returns a dish
 */
app.get('/api/dish/:name', function (req, res, next) {
    var name = req.params.name;
    Dish.findOne({name: name}, function (err, dish) {
        if (err) return next(err);
        if (!dish) {
            return res.status(404).send({message: 'Dish not found.'});
        }
        res.send(dish);
    });
});

/**
 * POST /api/dish
 * Adds a new dish to the database.
 */
app.post('/api/dish', function (req, res, next) {
    var dishName = req.body.dishName;
    var dish = new Dish({
        name: dishName,
        tags: []
    });

    dish.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate dishes
                return res.status(500).send({err: err, success: false, message: 'Dish already exist!'});
            }

            // Some other error
            return res.status(500).send(err);
        }
        res.send({message: dishName + ' has been added successfully!'});
    });
});

/**
 * PUT /api/dish
 * Update a dish in database.
 */
app.put('/api/dish', function (req, res, next) {
    var dishId = req.body.dishId;
    var dishName = req.body.dishName;
    var dishTags = req.body['dishTags[]'];
    if (typeof dishTags == 'undefined') {
        dishTags = [];
    }

    Dish.findOneAndUpdate({_id: dishId}, {$set: {name: dishName, tags: dishTags}}, {new: true}, function (err, doc) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate dishes
                return res.status(500).send({err: err, success: false, message: 'Dish already exist!'});
            }

            // Some other error
            return res.status(500).send(err);
        }
        res.send(doc);
    });
});

/**
 * DELETE /api/dish
 * Deletes a dish from the database
 */
app.delete('/api/dish', function (req, res, next) {
    var dishId = req.body.dishId;
    var dishName = req.body.dishName;

    Dish.findByIdAndRemove(dishId, function (err) {
        if (err) {
            // Some other error
            return res.status(500).send(err);
        }
        res.send({message: dishName + ' has been deleted successfully!'});
    });
});

/**
 * /api/tags
 */
/**
 * GET /api/tags
 */
app.get('/api/tags', function (req, res, next) {
    Tag.find({})
        .exec(function (err, dish) {
            if (err) return next(err);

            return res.send(dish);
        });
});

/**
 * POST /api/tags
 * Adds a new tag to the database.
 */
app.post('/api/tags', function (req, res, next) {
    var tagValue = req.body.tag;
    var tag = new Tag({
        tag: tagValue
    });

    tag.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate tag
                return res.status(500).send({err: err, success: false, message: 'Tag already exist!'});
            }

            // Some other error
            return res.status(500).send(err);
        }
        res.send({message: tagValue + ' has been added successfully!'});
    });
});

/**
 * PUT /api/tags
 * Update a tag in database.
 */
app.put('/api/tags', function (req, res, next) {
    var tagId = req.body.tagId;
    var tagValue = req.body.tagValue;

    Tag.findOneAndUpdate({_id: tagId}, {$set: {tag: tagValue}}, {new: true}, function (err, doc) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate tag
                return res.status(500).send({err: err, succes: false, message: 'Tag already exist!'});
            }

            // Some other error
            return res.status(500).send(err);
        }
        res.send(doc);
    });
});

/**
 * DELETE /api/tags
 * Deletes a tag from the database
 */
app.delete('/api/tags', function (req, res, next) {
    var tagId = req.body.tagId;
    var tagValue = req.body.tagValue;

    Tag.findByIdAndRemove(tagId, function (err) {
        if (err) {
            // Some other error
            return res.status(500).send(err);
        }
        res.send({message: tagValue + ' has been deleted successfully!'});
    });
});

/**
 * App pages
 */
/*
app.post('/', passport.authenticate('local-login', {
    successRedirect : '/dishes', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the login page if there is an error
    failureFlash : true // allow flash messages
}));
*/

app.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: req.loginMessage});
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.send({success: true});
        });
    })(req, res, next);
});

app.get('/', function(req, res, next) {
    if(req.user) {
        res.status(302).redirect('/dishes');
    } else {
        return next();
    }
});

app.get('/logout', function (req, res, next) {
    req.logout();
    res.status(302).redirect('/');
});

app.use(function (req, res) {
    Router.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', {html: html});
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
