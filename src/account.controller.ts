import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './account.service';
import { AccountDto, IAccountWithAuth } from './dto/account.dto';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('account-create')
  async register(data: IAccountWithAuth) {
    try {
      const account = AccountDto.parse({
        name: data.name,
        personalDoc: data.personalDoc,
      });
      const auth = AuthDto.parse({
        email: data.email,
        password: data.password,
      });

      return await this.appService.register(account, auth);
    } catch (error) {
      throw error;
    }
  }
}
