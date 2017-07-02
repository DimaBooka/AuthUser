const express = require('express');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const md5 = require('js-md5');
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
  request['token'] = md5(request['id']);
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

app.patch('/api/users/:id', (req, res) => {

  const request = req.body;
  console.log(request);
  if (!request.content || typeof request.status !== 'boolean') {
    return res.status(400).send({'error': 'Dude, not all data was provided'});
  }

  let items = jsonfile.readFileSync(file);

  let index = items.findIndex((obj => obj.id == req.params.id));
  items[index].content = request.content;
  items[index].status = request.status;
  jsonfile.writeFileSync(file, items, {spaces: 2});
  res.send({'success': 'Dude, item was successfully updated'})
});

app.listen(process.env.PORT || 8080);
