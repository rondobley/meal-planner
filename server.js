// Babel ES6/JSX Compiler
require('babel-register');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');


var Recipe = require('./models/recipe');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});
//mongoose.set('debug', true);

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * GET /api/recipes
 */
app.get('/api/recipes', function(req, res, next) {
    Recipe.find({})
        .exec(function(err, recipes) {
            if (err) return next(err);

            return res.send(recipes);
        });
});

/**
 * POST /api/recipes
 * Adds a new recipe to the database.
 */
app.post('/api/recipes', function(req, res, next) {
    var recipeTitle = req.body.recipeTitle;
    var recipe = new Recipe({
        title: recipeTitle,
        tags: []
    });

    recipe.save(function(err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate recipe
                return res.status(500).send({ err: err, succes: false, message: 'Recipe already exist!' });
            }

            // Some other error
            return res.status(500).send(err);
        }
        res.send({ message: recipeTitle + ' has been added successfully!' });
    });
});

/**
 * PUT /api/recipes
 * Update a recipe in database.
 */
app.put('/api/recipes', function(req, res, next) {
    var recipeId = req.body.recipeId;
    var recipeTitle = req.body.recipeTitle;

    Recipe.findOneAndUpdate({ _id: recipeId }, { $set: { title: recipeTitle } }, { new: true }, function(err, doc) {
        if (err) {
            // Some other error
            return res.status(500).send(err);
        }
        res.send(doc);
    });
});

/**
 * DELETE /api/recipes
 * Deletes a recipe from the database
 */
app.delete('/api/recipes', function(req, res, next) {
    var recipeId = req.body.recipeId;
    var recipeTitle = req.body.recipeTitle;

    Recipe.findByIdAndRemove(recipeId, function(err) {
        if (err) {
            // Some other error
            return res.status(500).send(err);
        }
        res.send({ message: recipeTitle + ' has been deleted successfully!' });
    });
});

/**
 * GET /api/recipes/:id
 * Returns a recipe
 */
app.get('/api/recipes/:title', function(req, res, next) {
    var title = req.params.title;
    Recipe.findOne({ title: title }, function(err, recipe) {
        if (err) return next(err);
        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found.' });
        }
        res.send(recipe);
    });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
