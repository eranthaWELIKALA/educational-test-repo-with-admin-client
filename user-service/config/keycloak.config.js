const KcAdminClient = require('@keycloak/keycloak-admin-client').default;
const ErrorMessages = require('../utils/error-messages');
const getToken = require('../utils/getToken');
let kcAdminClient;

function initKeycloak(baseUrl, realmName) {
    if (kcAdminClient) {
        return kcAdminClient;
    }
    else {
        console.log("Initializing KCAdminClient...");
        kcAdminClient = new KcAdminClient();
        kcAdminClient.setConfig({
            baseUrl: baseUrl,
            realmName: realmName,
        });
        if (kcAdminClient) {
            console.log("KCAdminClient is successfully initialized...");
        }
        return kcAdminClient;
    }
}

function getKeycloak(authHeader) {
    try {
        if (!kcAdminClient) {
            throw new Error(ErrorMessages.KEYCLOAK_NOT_INITIALIZED);
        }
        kcAdminClient.setAccessToken(undefined);
        kcAdminClient.setAccessToken(getToken(authHeader));
        return kcAdminClient;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    initKeycloak,
    getKeycloak
};