const express = require('express'),
      path = require('path'),
      fs = require('fs');

const app = express();
var staticRoot = __dirname + '/dist/';

// Run the app by serving the static files
// in the dist directory
app.use(express.static(staticRoot));
// app.use('/login', express.static(__dirname + '/dist'));
// app.use('/signup', express.static(__dirname + '/dist'));
// app.get('*', express.static(__dirname + '/dist'));

app.use(function(req, res, next){
  // if the request is not html then move along
  var accept = req.accepts('html', 'json', 'xml');
  if(accept !== 'html'){
    return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== ''){
    return next();
  }

  res.sendFile(path.join(staticRoot, 'index.html'));
  // fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

//  Set the environment variables we need.
const ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
const port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

// Start the app by listening on the default
app.listen(port, ipaddress, () => {
  console.log('Server started');
  console.log('To see webpage, visit http://localhost:' + port);
  console.log('To shutdown, press <CTRL> + C at anytime.');
});
