const axios = require('axios');
const Endpoints = require('../config/resource-Endpoints');
const ErrorMessages = require('../utils/error-messages');
const keycloakConfig = require('../config/keycloak.config');
const { RequiredActionAlias } = require('@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation');


async function getGroupInfoList(req, res, next) {
    if (req.headers.authorization) {
        try {
            if (req.query.search) {
                var searchTerm = req.query.search;
                let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
                let payload = new GroupsPayload(searchTerm);
                let groups = await kcAdminClient.groups.find(payload);
                res.send(groups);
            }
            else {
                let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
                let groups = await kcAdminClient.groups.find();
                res.send(groups);
            }
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function getGroupInfoById(req, res, next) {
    if (req.headers.authorization) {
        try {
            var id = req.params.id;
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            var payload = Payload(id);
            let groups = await kcAdminClient.groups.findOne(payload);
            res.send(groups);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function createStudent(req, res, next) {
    if (req.headers.authorization) {
        try {
            var payload = req.body;
            payload.emailVerified = false;
            payload.enabled = true;
            payload.requiredActions = [RequiredActionAlias.VERIFY_EMAIL, RequiredActionAlias.UPDATE_PASSWORD];
            payload.groups = ['student'];
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let response = await kcAdminClient.users.create(payload);
            req.body.id = response.id;
            sendVerifyEmail(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function createTeacher(req, res, next) {
    if (req.headers.authorization) {
        try {
            var payload = req.body;
            payload.emailVerified = false;
            payload.enabled = true;
            payload.requiredActions = [RequiredActionAlias.VERIFY_EMAIL, RequiredActionAlias.UPDATE_PASSWORD];
            payload.groups = ['teacher'];
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let response = await kcAdminClient.users.create(payload);
            req.body.id = response.id;
            sendVerifyEmail(req, res, next);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function createUser(req, res, next) {
    if (req.headers.authorization) {
        try {
            var payload = req.body;
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let response = await kcAdminClient.users.create(payload);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function sendExecuteActionsEmail(req, res, next) {
    if (req.headers.authorization) {
        try {
            var id = req.body.id;
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            var payload = Payload(id);
            var body = req.body;
            let response = await kcAdminClient.users.executeActionsEmail(payload, body);
            res.send(response);
        }
        catch (error) {
            new Error(ErrorMessages.EXECUTE_ACTION_EMAIL_NOT_SENT)
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function sendVerifyEmail(req, res, next) {
    if (req.headers.authorization) {
        try {
            var id = req.body.id;
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let payload = new SendVerifyEmailPayload(id, process.env.IAMSERVER_CLIENT_NAME, `${encodeURIComponent(req.headers.origin)}`)
            let response = await kcAdminClient.users.sendVerifyEmail(payload);
            res.send(response);
        }
        catch (error) {
            new Error(ErrorMessages.VERIFY_EMAIL_NOT_SENT)
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function getGroupMemberInfoList(req, res, next) {
    if (req.headers.authorization) {
        try {
            var id = req.params.id;
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let payload = new Payload(id);
            let groupMembers = await kcAdminClient.groups.listMembers(payload);
            res.send(groupMembers);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function getUserInfoList(req, res, next) {
    if (req.headers.authorization) {
        try {
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let users = await kcAdminClient.users.find();
            res.send(users);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function getUserInfoListByStatus(req, res, next) {
    if (req.headers.authorization) {
        try {
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            if (req.query.enabled) {
                let payload = new UsersPayload(req.query.enabled);
                let users = await kcAdminClient.users.find(payload);
                res.send(users);
            }
            else {
                let users = await kcAdminClient.users.find();
                res.send(users);
            }
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function getUnverifiedUserInfoList(req, res, next) {
    if (req.headers.authorization) {
        try {
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let payload = new UsersPayload(undefined, false);
            let users = await kcAdminClient.users.find(payload);
            res.send(users);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function getUserInfoById(req, res, next) {
    if (req.headers.authorization) {
        try {
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let payload = new Payload(req.params.id);
            let users = await kcAdminClient.users.findOne(payload);
            res.send(users);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

async function updateUserById(req, res, next) {
    if (req.headers.authorization) {
        try {
            var id = req.params.id;
            let kcAdminClient = keycloakConfig.getKeycloak(req.headers.authorization);
            let payload = new Payload(id);
            var body = req.body;
            let response = await kcAdminClient.users.update(payload, body);
            res.send(response);
        }
        catch (error) {
            next(error);
        }
    }
    else {
        next(new Error(ErrorMessages.AUTH_HEADER_MISSING));
    }
}

module.exports = {
    getGroupInfoList,
    getGroupInfoById,

    createStudent,
    createTeacher,
    createUser,

    getGroupMemberInfoList,
    getUserInfoList,
    getUserInfoListByStatus,
    getUnverifiedUserInfoList,
    getUserInfoById,

    updateUserById,

    sendExecuteActionsEmail,
    sendVerifyEmail
}