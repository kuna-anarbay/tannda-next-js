import {IsArray, IsEnum} from "class-validator";
import {ContentStatus} from "../../models/content.entity";

export class ContentStatusRequestDto {

    @IsArray()
        // @IsNumber({}, { each: true })
    ids: number[];

    @IsEnum(ContentStatus)
    status: ContentStatus;
}
