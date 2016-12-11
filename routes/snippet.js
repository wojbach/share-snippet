const express = require('express');
const router = express.Router();
const config = require(__dirname + '/../config');

router.get('/snippet/:id', function (req, res) {
    var snippet = db.get('snippets')
        .find({ id: req.params.id })
        .value();

    res.render('snippet', {title: '<share_snippet />', snippet: snippet, fullUrl: req.protocol + '://' + req.get('host')});
});

router.get('/browse', function (req, res) {
    var snippets = db.get('snippets')
        .filter({type: 0})
        .sortBy('created')
        .take(9999)
        .value();

    res.render('browse', {title: '<share_snippet />', snippets: snippets});
});

module.exports = router;
