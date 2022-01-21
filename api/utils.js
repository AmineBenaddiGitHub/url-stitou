export function getFaunaError(error) {
    const { code, description } = error.requestResult.responseContent.errors[0];
    let status;
    switch (code) {
        case 'instance not found':
            status = 404;
            break;
        case 'instance not unique':
            status = 409;
            break;
        case 'permission denied':
            status = 403;
            break;
        case 'unauthorized':
        case 'authentication failed':
            status = 401;
            break;
        default:
            status = 500;
    }
    return { code, description, status };
}

export const whitelistedOrigins = [
    "http://localhost:3000",
    "https://url-stitou.pages.dev",
    "https://url-stitou-functions.aminbe.workers.dev"
];

export function appHeaders(origin) {
    return {
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': origin,
        'Content-Type': 'application/json',
    }
};

export function isAuthorizedOrigin(request) {
    const originURL = request.headers.get("Origin");
    const isAuthorized = whitelistedOrigins.find(allowedOrigin => allowedOrigin.includes(originURL));
    return isAuthorized ? isAuthorized : "https://url-stitou-functions.aminbe.workers.dev";
};