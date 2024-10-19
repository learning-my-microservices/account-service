import { Injectable } from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { EntityManager, Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
  ) {}

  async register(
    account: AccountEntity,
    auth: AuthEntity,
  ): Promise<AccountEntity> {
    return await this.accountRepository.manager.transaction(
      async (entityManager: EntityManager) => {
        const acc = this.accountRepository.create(account);
        const savedAccount = await entityManager.save(acc);

        const savedAuth = this.authRepository.create({
          ...auth,
          account: savedAccount.id,
        });
        await entityManager.save(savedAuth);
        return savedAccount;
      },
    );
  }
}
