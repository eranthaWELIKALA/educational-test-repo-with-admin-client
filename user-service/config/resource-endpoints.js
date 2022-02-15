const IAMSERVER = process.env.IAMSERVER;
const IAMSERVER_ADDR = (process.env.IAMSERVER_ADDR || 'http://localhost:8080');
const IAMSERVER_REALM_NAME = (process.env.IAMSERVER_REALM_NAME || 'test-realm');

const keycloak = {
    issuer: `${IAMSERVER_ADDR}/auth/realms/${IAMSERVER_REALM_NAME}`,
    authorization_endpoint: `${IAMSERVER_ADDR}/auth/realms/${IAMSERVER_REALM_NAME}/protocol/openid-connect/auth`,
    token_endpoint: `${IAMSERVER_ADDR}/auth/realms/${IAMSERVER_REALM_NAME}/protocol/openid-connect/token`,
    introspection_endpoint: `${IAMSERVER_ADDR}/auth/realms/${IAMSERVER_REALM_NAME}/protocol/openid-connect/token/introspect`,
    userinfo_endpoint: `${IAMSERVER_ADDR}/auth/realms/${IAMSERVER_REALM_NAME}/protocol/openid-connect/userinfo`,
    admin_features: {
        group_endpoint: `${IAMSERVER_ADDR}/auth/admin/realms/${IAMSERVER_REALM_NAME}/groups`,
        user_endpoint: `${IAMSERVER_ADDR}/auth/admin/realms/${IAMSERVER_REALM_NAME}/users`,
    },
    end_session_endpoint: `${IAMSERVER_ADDR}/auth/realms/${IAMSERVER_REALM_NAME}/protocol/openid-connect/logout`,
}

const custom_service = {

}

const ENDPOINTS = {
    keycloak,
    custom_service
}

module.exports = ENDPOINTS[IAMSERVER];