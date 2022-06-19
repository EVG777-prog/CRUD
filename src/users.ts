import * as uuid from 'uuid';

interface IUserData {
  username: string;
  age: number,
  hobbies: string[],
}

interface IUser extends IUserData {
  id: string;
}

class Users {
  static users: IUser[] = [
    {
      id: '1',
      username: 'max',
      age: 30,
      hobbies: ['Sports', 'Cooking'],
    },
    {
      id: '2',
      username: 'sergey',
      age: 33,
      hobbies: ['Sports'],
    },
  ];

  static getAllUsers() {
    return this.users;
  }

  static getUserById(id: string) {
    return this.users.find(user => user.id === id);
  }

  static addUser(user: IUserData) {
    const newUser: IUser = {
      id: uuid.v4(),
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    };
    this.users.push(newUser);
    return newUser;
  }

  static updateUser(id: string, user: IUserData) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...user,
      };
    }
    return this.users[userIndex];
  }

  static deleteUser(id: string) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return true;
    } else {
      return false;
    }
  }
}

export { Users, IUserData, IUser };