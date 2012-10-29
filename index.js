var connect = require('connect'),
    http    = require('http'),
    url     = require('url'),
    port    = 3000;

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  // query string parser
  .use(function(req, res, next) {
    var qs;

    qs = url.parse(req.url, true);
    req.query = qs.query;

    next();
  })
  .use(function(req, res, next) {
    var delay;

    if (req.url.indexOf('/resources') === 0) {
      delay = (req.query.delay) ? (parseInt(req.query.delay, 10) || 1) : 1;

      // custom hack for the static middleware to work properly
      req.url = req.url.replace('/resources', '');

      // make sure the static middleware doesn't cache anything
      res.setHeader('Last-Modified', 'Wed, 24 Oct 1970 11:04:33 GMT');
      res.setHeader('ETag', 'Wed, 24 Oct 1970 11:04:33 GMT');

      return setTimeout(function() {
          connect.static('resources')(req, res, next);
      }, delay)
    }
    next();
  })
  // uncomment the following 2 lines for session support
  // .use(connect.cookieParser())
  // .use(connect.session({ secret: 'my secret here' }))
  .use(function(req, res) {
    // redirect to index.html every other request
    res.statusCode = 301;
    res.setHeader('Location', '/resources/index.html');
    res.end('Redirecting to /resources/index.html');
  });

http.createServer(app).listen(port);
console.log('Server started on port ' + port);
