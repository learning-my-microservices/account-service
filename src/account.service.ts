import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/notification.rabbitmq';
import { AccountRepository } from './account.repository';
import { AccountDto, IAccountDto } from './dto/account.dto';
import { IAuthDto } from './dto/auth.dto';
import { AccountEntity } from './entities/account.entity';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AppService {
  constructor(
    private repository: AccountRepository,
    private rabbitmq: RabbitMQService,
  ) {}

  async register(account: IAccountDto, auth: IAuthDto): Promise<IAccountDto> {
    const savedAccount = await this.repository.register(
      account as AccountEntity,
      auth as AuthEntity,
    );

    const result = AccountDto.parse(savedAccount);

    await this.rabbitmq.emit({
      queue: 'account-create',
      payload: {
        accountId: result.id,
        title: 'account-create-success',
        message: 'account-create-message',
      },
    });

    return result;
  }
}
