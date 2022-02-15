const axios = require('axios');
const Endpoints = require('../config/resource-Endpoints');
const ErrorMessages = require('../utils/error-messages');

async function getAccessToken(req, res, next) {
    console.log(req.body);
    var url = Endpoints['token_endpoint']
    var params = new URLSearchParams(req.body);
    var payload = params.toString();
    var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    var options = { headers: headers };
    await axios.post(url, payload, options)
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            next(error);
        });
}

async function getUserInfo(req, res, next) {
    var url = Endpoints['userinfo_endpoint'];
    var payload = {};
    var headers = { 'Authorization': req.headers.authorization };
    var options = { headers: headers };
    if (req.headers.authorization) {
        await axios.post(url, payload, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function logout(req, res, next) {
    var url = Endpoints['end_session_endpoint'];
    var payload = {};
    var headers = { 'Authorization': req.headers.authorization }
    var options = { headers: headers }
    if (req.headers.authorization) {
        await axios.post(url, payload, options)
            .then(function (response) {
                res.send(response.data)
            })
            .catch(function (error) {
                next(error);
            });
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

module.exports = {
    getAccessToken, getUserInfo, logout
}