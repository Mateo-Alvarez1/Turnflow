import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnHistoryDto } from './create-turn-history.dto';

export class UpdateTurnHistoryDto extends PartialType(CreateTurnHistoryDto) {}
