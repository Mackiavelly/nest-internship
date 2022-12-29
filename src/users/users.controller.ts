import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from './users.interface';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  get(): User[] {
    return this.userService.getAll();
  }

  // @Post()
  // create(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ): Book {
  //   return this.bookService.createBook(title, description);
  // }
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    return this.userService.updateUser(id, {
      firstName,
      lastName,
      password,
      email,
    });
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
