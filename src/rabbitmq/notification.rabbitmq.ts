import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IRabbitMQDto } from 'src/dto/rabbitmq-payload.dto';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  async emit({
    queue,
    payload,
  }: {
    queue: string;
    payload: IRabbitMQDto;
  }): Promise<any> {
    this.client.emit(queue, payload);
  }
}
