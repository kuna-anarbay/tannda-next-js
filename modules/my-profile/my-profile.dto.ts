import {IsOptional, IsString, Length} from "class-validator";

export class UpdateProfileRequestDto {

    @IsString()
    @Length(1, 20)
    firstName: string;

    @IsString()
    @Length(1, 20)
    @IsOptional()
    lastName?: string;

}
