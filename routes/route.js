var express = require('express');

var router = express.Router();

var userDAO = require('../dao/userDAO');
//var result = require('../model/result');

//服务器控制台反馈：Api to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//服务器控制台反馈：GET home page
router.get('/', function (req, res, next) {
    res.json({ message: 'Hello! welcome to our api!' });
});

// 接口方法 GET users?
router.get('/users?', function (req, res, next) {
    var page = Number(req.query.page);
    var pageSize = Number(req.query.pageSize);
    var pageStart = (page - 1) * pageSize;
    userDAO.totalRecord(function (val) {
        var totalRecord = val;
        console.log('GET users called');
        var totalPage = Math.floor((totalRecord + pageSize - 1) / pageSize);
        userDAO.list(pageStart, pageSize, function (users) {
            var result = {};
            result.page = page;
            result.pageSize = pageSize;
            result.totalRecord = totalRecord;
            result.totalPage = totalPage;
            result.data = users;
            res.json(result);
        });
    });
});

// 接口方法 GET users/id
router.get('/users/:id', function (req, res) {
    var id = req.params.id;
    console.log('GET users/id called, id: ' + id);
    userDAO.getById(id, function (user) {
        if (user == undefined) {
            var result = {};
            result.GET = 'No record with ID ' + id;
            res.json(result);
        };
        res.json(user);
    });
});

// 接口方法 DELETE users/id
router.delete('/users/:id', function (req, res) {
    var id = req.params.id;
    console.log('DELETE users/id called, id=' + id);
    userDAO.deleteById(id, function (success) {
        var result = {};
        result.DELETE = success
        res.json(result);
    });
});

// 接口方法 POST users
router.post('/users', function (req, res) {
    console.log('addUser called');
    var user = req.body;
    console.log(user);
    userDAO.add(user, function (success) {
        var result = {};
        result.POST = success;
        res.json(result);
    });
});

// 接口方法 PUT users 
router.put('/users/:id', function (req, res) {
    console.log('updateUser called');
    var user = req.body;
    user.id = req.params.id;
    console.log(user);
    userDAO.update(user, function (success) {
        var result = {};
        result.PUT = success
        res.json(result);
    });
});

// 接口方法 PATCH users
router.patch('/users/:id', function (req, res) {
    console.log('patchUser called');
    userDAO.getById(req.params.id, function (user) {
        var username = req.body.username;
        if (username) {
            user.username = username;
        }
        var password = req.body.password;
        if (password) {
            user.password = password;
        }
        console.log(user);
        userDAO.update(user, function (success) {
            var result = {};
            result.PATH = success
            res.json(result);
        });
    });
});

module.exports = router;