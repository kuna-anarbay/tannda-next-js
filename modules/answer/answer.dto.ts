import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateAnswerRequestDto {

    @IsNotEmpty()
    @IsNumber()
    questionId: number;


    @IsString()
    @IsOptional()
    text: string;


    @IsArray()
    options: number[];

}
