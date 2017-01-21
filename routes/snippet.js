const express = require('express');
const router = express.Router();
const config = require(__dirname + '/../config');

router.get('/snippet/:id', function (req, res) {
    let snippet = db.get('snippets')
        .find({id: req.params.id})
        .value();

    res.render('snippet', {
        title: '<share_snippet />',
        modes: config.modes,
        snippet: snippet,
        fullUrl: req.protocol + '://' + req.get('host'),
        baseUrl: config.baseUrl
    });
});

router.get('/browse', function (req, res) {
    let snippets = db.get('snippets')
        .filter({type: 0})
        .sortBy('created')
        .take(9999)
        .value();

    res.render('browse', {title: '<share_snippet />', snippets: snippets, baseUrl: config.baseUrl});
});

module.exports = router;
