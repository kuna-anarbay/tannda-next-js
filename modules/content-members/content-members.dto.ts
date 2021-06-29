import {IsArray, IsEnum, IsOptional} from "class-validator";
import {ContentStatus} from "../../models/content";

export class ContentStatusRequestDto {
    
    @IsArray()
        // @IsNumber({}, { each: true })
    ids: number[];

    @IsEnum(ContentStatus)
    status: ContentStatus;
}
