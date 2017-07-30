var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');
var fileUpload = require('express-fileupload');

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

function BD() {
    var connection = mysql.createConnection({
        user: 'root',
        password: 'rpqb123',
        host: 'localhost',
        database: 'Ey'
    });
    return connection;
}

router.post("/user/serviceprovider", function(req, res) {
    var objBD = BD();
    console.log(req.body.email)
    objBD.connect();
    var user = {
        serviceprovider: req.body.serviceprovider,
        company: req.body.company,
        monthly: req.body.monthly,
        location: req.body.location,
        cost_mbps_day: req.body.cost_mbps_day
    };
    //console.log(user.username)
    objBD.query('INSERT INTO  SET ?', user, function(error) {
        return res.json({
            message: 'success',
            error: false
        });
    });
});
router.post("/user/company", cors(), function(req, res) {
    var objBD = BD();
    objBD.connect();
    console.log(req.body);
    var user = {
        company: req.body.company,
        monthly: req.body.monthly,
        location: req.body.location,
        cost_mbps_day: req.body.cost_mbps_day
    };
    //console.log(user.username)
    objBD.query('INSERT INTO  SET ?', user, function(error) {
        return res.json({
            message: 'success',
            error: false
        });
    });
});

router.get('/user/cn', cors(), function(req, res) {
    var objBD = BD();
    objBD.connect();
    objBD.query('SELECT DISTINCT cn FROM telecommdata', function(error, results, fields) {

        var resultsset = JSON.parse(JSON.stringify(results));
        return res.json({
            resultsset
        })
    })

});




module.exports = router;