import {IsNumber, IsOptional, IsString, Length} from "class-validator";

export class CreateLessonRequestDto {

    @IsString()
    @Length(2, 80)
    title: string;

    @IsString()
    @Length(2, 2000)
    @IsOptional()
    description?: string;

    @IsNumber()
    sectionId: number;

}
