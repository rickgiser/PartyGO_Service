const path = require('path');
const JWTSession = require('think-session-jwt');
const isDev = think.env === 'development';

module.exports = [
    {
        handle: 'meta',
        options: {
            logRequest: isDev,
            sendResponseTime: isDev
        }
    },
    {
        handle: 'resource',
        enable: isDev,
        options: {
            root: path.join(think.ROOT_PATH, 'www'),
            publicPath: /^\/(static|favicon\.ico)/
        }
    },
    {
        handle: 'trace',
        enable: !think.isCli,
        options: {
            debug: isDev
        }
    },
    {
        handle: 'payload',
        options: {}
    },
    {
        handle: 'router',
        options: {}
    },
    {
        handle: JWTSession,
        secret: 'secret',  // secret is reqired
        tokenType: 'cookie', // ['query', 'body', 'header', 'cookie'], 'cookie' is default
        tokenName: 'jwt', // if tokenType not 'cookie', this will be token name, 'jwt' is default
        sign: {
            // sign options is not required
        },
        verify: {
            // verify options is not required
        }
    },
    'logic',
    'controller'
];
