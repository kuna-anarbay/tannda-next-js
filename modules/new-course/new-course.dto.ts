import {IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class NewCourseRequestDto {

    @IsString()
    @MinLength(2)
    @MaxLength(80)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(2000)
    @IsOptional()
    description?: string;
}
