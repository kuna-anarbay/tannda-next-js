import {IsArray, IsDate, IsNumber} from "class-validator";
import {CreateAnswerRequestDto} from "../answer/answer.dto";
import {Type} from "class-transformer";

export class SubmissionRequestDto {
    @IsArray()
        // @IsNumber()
    relations: number[];


    @IsDate()
    availableFrom?: Date;


    @IsDate()
    availableTo?: Date;

    @IsNumber()
    duration: number;
}

export class SubmitRequestDto {

    @IsArray()
    @Type(() => CreateAnswerRequestDto)
    answers: CreateAnswerRequestDto[];

}
