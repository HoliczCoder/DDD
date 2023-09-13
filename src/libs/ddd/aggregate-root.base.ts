import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from './domain-event.base';
import { BaseIdentityEntity } from './entity.base';
import { LoggerPort } from '../ports/logger.port';

export abstract class AggregateRoot extends BaseIdentityEntity {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(
    logger: LoggerPort,
    eventEmmiter: EventEmitter2,
  ): Promise<void> {
    await Promise.all(
      this.domainEvents.map(async (event) => {
        logger.debug(
          `"${event.constructor.name}" event published for aggregate ${this.constructor.name} : ${this.id}`,
        );
        return eventEmmiter.emitAsync(event.constructor.name, event);
      }),
    );
    this.clearEvents();
  }
}
