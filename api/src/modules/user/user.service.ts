import { rmSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  createFileFromBase64,
  extFromBase64,
  hashPassword,
} from '@app/common/utils';
import { PUBLIC_FOLDER } from '@app/const';
import { CreateUserDto, UpdateUserDto } from '@app/dtos/user';
import { User } from '@app/models';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findUserWithPasswordByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }

    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('USER_NOT_FOUND');
    }

    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async create(data: CreateUserDto): Promise<User> {
    if (await this.userRepository.findOneBy({ email: data.email })) {
      throw new BadRequestException('USER_ALREADY_EXISTS');
    }

    const password = hashPassword(data.password);

    const photo = data.photo?.toString();

    delete data.photo;

    const user = await this.userRepository.save({ ...data, password });

    if (photo) {
      user.photo = await this.savePhoto(user, photo);
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const entity = await this.findOne(id);

    const photo = data.photo?.toString();

    delete data.photo;

    const user = await this.userRepository.save({
      ...entity,
      ...data,
      photo: entity.photo,
    });

    if (photo) {
      user.photo = await this.savePhoto(user, photo);
    }

    return user;
  }

  async savePhoto(user: User, photo: string) {
    const filepath = join(PUBLIC_FOLDER, 'images', 'users');
    const filename = this.saveFile(filepath, photo);
    await this.userRepository.update(user.id, { photo: filename });
    rmSync(join(filepath, user.photo));
    return filename;
  }

  private saveFile(filepath: string, content: string) {
    const ext = extFromBase64(content);
    const filename = `${uuidv4()}.${ext}`;

    createFileFromBase64(content, join(filepath, filename));

    return filename;
  }
}
