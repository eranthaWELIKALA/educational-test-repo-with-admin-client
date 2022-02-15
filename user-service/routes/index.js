var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const adminFeaturesController = require('../controllers/adminFeatureController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send("Keycloak IAM Service")
});

router.route('/token').post(userController.getAccessToken);

router.route('/user-info').post(userController.getUserInfo);

router.route('/logout').post(userController.logout);


// Groups READ
router.route('/group').get(adminFeaturesController.getGroupInfoList);

// Group READ
router.route('/group/:id').get(adminFeaturesController.getGroupInfoById);


// Students/ Teachers READ
router.route('/group-members/:id').get(adminFeaturesController.getGroupMemberInfoList);


// Student Create
router.route('/student').post(adminFeaturesController.createStudent);

// Student READ
router.route('/student/:id').get(adminFeaturesController.getUserInfoById);

// Student UPDATE
router.route('/student/:id').put(adminFeaturesController.updateUserById);


// Teacher CREATE
router.route('/teacher').post(adminFeaturesController.createTeacher);

// Teacher READ
router.route('/teacher/:id').get(adminFeaturesController.getUserInfoById);

// Teacher UPDATE
router.route('/teacher/:id').put(adminFeaturesController.updateUserById);


// User CREATE
router.route('/user').post(adminFeaturesController.createUser);

// Users READ
router.route('/user').get(adminFeaturesController.getUserInfoList);

// User READ
router.route('/user/:id').get(adminFeaturesController.getUserInfoById);

// User UPDATE
router.route('/user/:id').put(adminFeaturesController.updateUserById);

module.exports = router;
