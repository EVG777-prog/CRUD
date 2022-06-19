import http from 'http';
import { Users } from './users.js';
import * as uuid from 'uuid';
import { IUserData, IUser } from './users.js';

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(Users.getAllUsers()));

  } else if (req.url?.match(/\/api\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/) && req.method === 'GET') {
    const userId = req.url.split('/').pop() as string;
    if (uuid.validate(userId)) {
      const user = Users.getUserById(userId);
      if (user) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify({ message: 'Invalid user id' }));
    }
 
  } else if (req.url === '/api/users' && req.method === 'POST') {
    const body: Uint8Array[] = [];

    req
      .on('data', (chunk) => body.push(chunk))
      .on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const newUser: IUserData = JSON.parse(parsedBody);
        if (newUser.username && newUser.age && newUser.hobbies) {
          const resultUser: IUser = Users.addUser(newUser);
          res.writeHead(201, { 'Content-Type': 'text/json' });
          res.end(JSON.stringify(resultUser));
        } else {
          res.writeHead(400, { 'Content-Type': 'text/json' });
          res.end(JSON.stringify({ message: 'Invalid user data' }));
        }
      });

  } else if (req.url?.match(/\/api\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/) && req.method === 'PUT') {
    const userId = req.url.split('/').pop() as string;
    if (uuid.validate(userId)) {
      const body: Uint8Array[] = [];
      req
        .on('data', (chunk) => body.push(chunk))
        .on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const newUser: IUserData = JSON.parse(parsedBody);
          if (newUser.username && newUser.age && newUser.hobbies) {
            const resultUser: IUser = Users.updateUser(userId, newUser);
            res.writeHead(201, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify(resultUser));
          } else {
            res.writeHead(400, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify({ message: 'Invalid user data' }));
          }
        });
    } else {
      res.writeHead(400, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify({ message: 'Invalid user id' }));
    }

  } else if (req.url?.match(/\/api\/users\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/) && req.method === 'DELETE') {
    const userId = req.url.split('/').pop() as string;
    if (uuid.validate(userId)) {
      const result = Users.deleteUser(userId);
      if (result) {
          res.writeHead(204, { 'Content-Type': 'text/json' });
          res.end(JSON.stringify({ message: 'Deleted successfuly' }));
      } else {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }

    } else {
      res.writeHead(400, { 'Content-Type': 'text/json' });
      res.end(JSON.stringify({ message: 'Invalid user id' }));
    }
 
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify({ message: 'Not found' }));
  }

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
