
const { ServerConfig  , Logger} = require('./config');
const express = require('express');
const cors = require('cors');
const ratelimit = require('express-rate-limit');

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});
app.get('/ping-cors', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ status: 'CORS ACTIVE', commit: '01343c5', time: new Date().toISOString() });
});
const apiRoutes = require('./routes');
const { createProxyMiddleware } = require('http-proxy-middleware');


const flightServiceUrl = process.env.FLIGHT_SERVICE_URL || 'http://localhost:3000';
const bookingServiceUrl = process.env.BOOKING_SERVICE_URL || 'http://localhost:4000';

const limiter = ratelimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 15 requests per `window` (here, per 15 minutes)
    // standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    // legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(
    '/flightService',
    createProxyMiddleware({
        target: flightServiceUrl,
        changeOrigin: true,
        pathRewrite: {
            '^/flightService': '', // Remove the /flightService prefix when forwarding the request
        },
        on: {
            proxyRes: (proxyRes, req, res) => {
                proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
                proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS, PATCH';
                proxyRes.headers['access-control-allow-headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token';
                proxyRes.headers['access-control-allow-credentials'] = 'true';
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
            },
        },
    })
);

app.use(
    '/bookingService',
    createProxyMiddleware({
        target: bookingServiceUrl,
        changeOrigin: true,
        pathRewrite: {
            '^/bookingService': '', // Remove the /bookingService prefix when forwarding the request
        },
        on: {
            proxyRes: (proxyRes, req, res) => {
                proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
                proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS, PATCH';
                proxyRes.headers['access-control-allow-headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token';
                proxyRes.headers['access-control-allow-credentials'] = 'true';
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
            },
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Server is running on port ${ServerConfig.PORT}`);
    Logger.info(`Server is running on port ${ServerConfig.PORT}`,{});/*ctrl+s to save and check the logs*/ 
})


/*
the flow is 
/api routes  -> /v1 routes - > /airplanes routes ->
 controllers -> services(business logic) -> 
 repositories(generally they only interact with the DBs) -> models
*/