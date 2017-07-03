const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const md5 = require('js-md5');
const crypto = require('crypto');
const file = 'users.json';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  next();
});


app.get('/api/users/me', (req, res) => {

  const users = jsonfile.readFileSync(file);
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(400).send({'error': 'Token was not providen'});
  }

  let currentUserIndex = users.findIndex((obj => obj['token'] === token.replace('Token ', '')));
  if (currentUserIndex > -1) {
    return res.send({user: users[currentUserIndex]});
  }
  res.status(400).send({'error': 'User, not found'});

});

app.post('/api/sign-up', (req, res) => {

  const request = req.body;
  if (request.password !== request.passwordConfirm) {
    return res.status(400).send({'error': 'Dude, fill the input'});
  }

  let items = jsonfile.readFileSync(file);
  request['id'] = items.length > 0 ? items[items.length - 1].id + 1 : 1;
  delete request['passwordConfirm'];
  delete request['acceptTerms'];
  request['token'] = crypto.createHash('md5').update(request['id'] + new Date().toDateString()).digest("hex");
  items.push(request);
  jsonfile.writeFileSync(file, items, {spaces: 2});

  res.send({'success': 'Dude, user was successfully created'});
});

app.post('/api/login/', (req, res) => {
  let users = jsonfile.readFileSync(file);
  const request = req.body;
  let user = users.filter((item, index) => {
    return request.password === item.password && request.username === item.username
  });

  if (!request.username || !request.password || user.length < 1) {
    return res.status(400).send({'error': 'Unable to login with provided credentials'});
  }
  res.send({'token': user[0]['token']});
});

app.put('/api/users/me', (req, res) => {

  const request = req.body;
  console.log(request);

  let users = jsonfile.readFileSync(file);

  let index = users.findIndex(obj => {
    if (obj.token == req.headers['authorization'].replace('Token ', '')) {
      console.log('found');
    }
    return obj.token == req.headers['authorization'].replace('Token ', '');
  });
  console.log(index)
  if (index === undefined) {
    return res.status(400).send({'error': 'User, not found'});
  }

  Object.keys(users[index]).map(key => {
    if (request[key]) {
      users[index][key] = request[key];
    }
  });

  jsonfile.writeFileSync(file, users, {spaces: 2});
  res.send({'success': 'User info was successfully updated'})
});

app.listen(process.env.PORT || 8080);
