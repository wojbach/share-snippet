const express = require('express');
const router = express.Router();
const config = require(__dirname + '/../config');
const uuidV4 = require('uuid/v4');

router.get('/', function (req, res) {
    res.render('index', {
        title: '<share_snippet />',
        modes: config.modes,
        themes: config.themes,
        baseUrl: config.baseUrl
    });
});

router.get('/fork/:id', function (req, res) {
    let snippet = db.get('snippets')
        .find({id: req.params.id})
        .value();

    res.render('index', {
        title: '<share_snippet />',
        modes: config.modes,
        themes: config.themes,
        snippet: snippet,
        baseUrl: config.baseUrl
    });
});

router.post('/', function (req, res) {
    let post = req.body;
    post.id = uuidV4();
    post.type = parseInt(post.type);
    post.code = post.code.trim();
    post.created = new Date().toISOString();
    post.size = post.code.length;
    db.get('snippets')
        .push(req.body)
        .value();
    res.redirect('/snippet/' + post.id);
});

module.exports = router;
