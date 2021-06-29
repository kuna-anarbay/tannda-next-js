import {IsNumber, IsOptional, IsString} from 'class-validator';

export class GradeRequestDto {
    @IsNumber()
    relationId: number;

    @IsNumber()
    points: number;

    @IsString()
    @IsOptional()
    note?: string;
}
