import request from 'supertest';
import { server } from '../index';
import { Users, IUserData } from '../users';

const testUser1: IUserData = {
  username: 'testuser1',
  age: 30,
  hobbies: ['sport', 'music'],
};

describe('server', () => {
  // it('should add a user', async () => {
  //   const response = await request(server).post('/api/users').send(testUser1);
  //   expect(response.status).toBe(201);
  //   expect(response.type).toBe('text/json');
  //   expect(response.body).toEqual(testUser1);
  // });
  
  it('should return all users', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/json');
    expect(response.body).toEqual([]);
  });

  // it('should return a user', async () => {
  //   const response = await request(server).get('/api/users/' + Users.getAllUsers()[0].id);
  //   expect(response.status).toBe(200);
  //   expect(response.type).toBe('text/json');
  //   expect(response.body).toEqual(Users.getAllUsers()[0]);
  // });

  // it('should update a user', async () => {
  //   const response = await request(server).put('/api/users/' + Users.getAllUsers()[0].id).send({
  //     username: 'test',
  //     age: 20,
  //     hobbies: ['test', 'test2']
  //   });
  //   expect(response.status).toBe(201);
  //   expect(response.type).toBe('text/json');
  //   expect(response.body).toEqual(Users.getAllUsers()[0]);
  // });

  // it('should delete a user', async () => {
  //   const response = await request(server).delete('/api/users/' + Users.getAllUsers()[0].id);
  //   expect(response.status).toBe(200);
  //   expect(response.type).toBe('text/json');
  //   expect(response.body).toEqual(Users.getAllUsers()[0]);
  // });

  server.close();
});