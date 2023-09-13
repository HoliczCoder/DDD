import { Guard } from '../guard';
import { UnprocessableEntityException } from '@nestjs/common';
import { v4 } from 'uuid';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

type CommandMetaData = {
  readonly correlationId: string;

  readonly causationId?: string;

  readonly userId?: string;

  readonly timestamp: number;
};

export class Command {
  readonly id: string;

  readonly metadata: CommandMetaData;

  constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new UnprocessableEntityException(
        'Command props should not be empty',
      );
    }

    this.id = props.id || v4();
    this.metadata = {
      correlationId: props?.metadata?.correlationId,
      causationId: props?.metadata?.causationId,
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId,
    };
  }
}
