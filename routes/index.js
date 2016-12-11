const express = require('express');
const router = express.Router();
const config = require(__dirname + '/../config');
const uuidV4 = require('uuid/v4');

router.get('/', function (req, res) {
    res.render('index', {title: '<share_snippet />', modes: config.modes, themes: config.themes});
});

router.post('/', function (req, res) {
    var post = req.body;
    post.id = uuidV4();
    post.type = parseInt(post.type);
    post.code = post.code.trim();
    post.created = new Date();
    post.size = post.code.length;
    db.get('snippets')
        .push(req.body)
        .value();
    res.redirect('/snippet/' + post.id);
});

module.exports = router;
