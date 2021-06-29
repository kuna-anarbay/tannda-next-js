import {IsArray, IsEnum, IsOptional, IsString} from "class-validator";
import {PresenceStatus} from "../../models/presence";


export class PresenceRequestDto {
    @IsArray()
    relations: number[];

    @IsEnum(PresenceStatus)
    status: PresenceStatus;

    @IsString()
    @IsOptional()
    note?: string;
}
