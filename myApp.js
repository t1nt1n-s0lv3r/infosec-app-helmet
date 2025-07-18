const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet());


app.use( helmet.hidePoweredBy());


app.use(helmet.xssFilter());

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());

app.use(
  helmet({
    frameguard: { action: 'deny' }, // configure
    contentSecurityPolicy: {        // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
      },
    },
    dnsPrefetchControl: false,      // disable
    noCache: true,                  // enable
    hsts: { maxAge: 90 * 24 * 60 * 60, force: true }, // configure
  })
);























module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
