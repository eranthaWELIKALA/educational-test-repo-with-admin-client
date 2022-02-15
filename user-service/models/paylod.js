class Payload {
    constructor(
        id
    )
}

class SendVerifyEmailPayload {
    constructor(
        id,
        clientId = undefined,
        redirectUri = undefined
    )
} 

class GroupsPayload {
    constructor(
        search = undefined
    )
}

class UsersPayload {
    constructor(
        enabled = undefined,
        emailVerified = undefined
    )
}