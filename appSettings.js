
const appSettings = {
    appCredentials: {
        clientId: "609ed5a0-8f4e-4410-9b70-8fa13c5aca37",
        tenantId: "48f7027d-fb62-4fe6-89a7-cf89d27f2267",
        clientSecret: "4-50FjAeExWoJnS2_DWWMY_G~s0iWW84E~"
    },
    authRoutes: {
        redirect: "/redirect",
        error: "/error", // the wrapper will redirect to this route in case of any error.
        unauthorized: "/unauthorized" // the wrapper will redirect to this route in case of unauthorized access attempt.
    },
    remoteResources: {
        graphAPI: {
            endpoint: "https://graph.microsoft.com/v1.0/me",
            scopes: ["user.read"]
        }
    }
}

module.exports = appSettings;
