import {IsString} from "class-validator";

export class EditSectionRequestDto {
    @IsString()
    title: string;
}