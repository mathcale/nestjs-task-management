import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

export enum UserErrors {
  DUPICATED_USERNAME = '23505',
}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
    });

    await this.save(user);
  }
}
