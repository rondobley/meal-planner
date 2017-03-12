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
var Tag = require('./models/tag');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

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
    var recipeTags = req.body['recipeTags[]'];

    Recipe.findOneAndUpdate({ _id: recipeId }, { $set: { title: recipeTitle, tags: recipeTags } }, { new: true }, function(err, doc) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate recipe
                return res.status(500).send({ err: err, succes: false, message: 'Recipe already exist!' });
            }

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
 * GET /api/recipes/:title
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

/**
 * GET /api/recipes/search/tag/:tag
 * Returns a recipe
 */
app.get('/api/recipes/search/tag/:tags', function(req, res, next) {
    var tags = req.params.tags;
    var seacrhArray = tags.split(" ");
    Recipe.find({ tags: { "$in" : seacrhArray } }, function(err, recipe) {
        if (err) return next(err);
        if (!recipe) {
            return res.status(404).send({ message: 'No dishes found.' });
        }
        res.send(recipe);
    });
});

/**
 * GET /api/tags
 */
app.get('/api/tags', function(req, res, next) {
    Tag.find({})
        .exec(function(err, recipes) {
            if (err) return next(err);

            return res.send(recipes);
        });
});

/**
 * POST /api/tags
 * Adds a new tag to the database.
 */
app.post('/api/tags', function(req, res, next) {
    var tagValue= req.body.tag;
    var tag = new Tag({
        tag: tagValue
    });

    tag.save(function(err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate tag
                return res.status(500).send({ err: err, succes: false, message: 'Tag already exist!' });
            }

            // Some other error
            return res.status(500).send(err);
        }
        res.send({ message: tagValue + ' has been added successfully!' });
    });
});

/**
 * PUT /api/tags
 * Update a tag in database.
 */
app.put('/api/tags', function(req, res, next) {
    var tagId = req.body.tagId;
    var tagValue = req.body.tagValue;

    Tag.findOneAndUpdate({ _id: tagId }, { $set: { tag: tagValue } }, { new: true }, function(err, doc) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate tag
                return res.status(500).send({ err: err, succes: false, message: 'Tag already exist!' });
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
app.delete('/api/tags', function(req, res, next) {
    var tagId = req.body.tagId;
    var tagValue = req.body.tagValue;

    Tag.findByIdAndRemove(tagId, function(err) {
        if (err) {
            // Some other error
            return res.status(500).send(err);
        }
        res.send({ message: tagValue + ' has been deleted successfully!' });
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
