import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'first1',
      lastName: 'last1',
      password: 'pass1',
      email: 'user1@test.ua',
      token: '12345678901',
    },
    {
      id: 2,
      firstName: 'first2',
      lastName: 'last2',
      password: 'pass2',
      email: 'user2@test.ua',
      token: '12345678902',
    },
    {
      id: 3,
      firstName: 'first3',
      lastName: 'last3',
      password: 'pass3',
      email: 'user3@test.ua',
      token: '12345678903',
    },
  ];

  getAll(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.users.length + 1,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      password: createUserDto.password,
      email: createUserDto.email,
      token: null,
    };

    this.users.push(user);

    return user;
  }

  updateUser(id: number, params: object): User[] {
    this.users = this.users.map((user) => {
      if (id === user.id) {
        for (const [key, value] of Object.entries(params)) {
          user[key] = value;
        }
      }

      return user;
    });

    return this.users;
  }

  // TODO: Just for tests
  deleteUser(id: number): User | User[] {
    const index = this.users.findIndex((user) => id === user.id);

    if (index !== -1) {
      const deleteUser = this.users[index];

      this.users.splice(index, 1);
      return deleteUser;
    }

    return this.users;
  }
}
