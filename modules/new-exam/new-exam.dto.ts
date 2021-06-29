import {IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {QuestionType} from "../../models/question.entity";
import {Type} from "class-transformer";

export class CreateExamRequestDto {

    @IsString()
    @Length(2, 80)
    title: string;

    @IsString()
    @Length(2, 2000)
    @IsOptional()
    description?: string;

    @IsNumber()
    sectionId: number;

    @IsNotEmpty()
    @IsArray()
    @Type(() => CreateQuestionRequestDto)
    questions: CreateQuestionRequestDto[];
}

export class CreateQuestionRequestDto {

    @IsString()
    title: string;


    @IsEnum(QuestionType)
    type: QuestionType;


    @IsArray()
    @Type(() => CreateQuestionOptionRequestDto)
    options: CreateQuestionOptionRequestDto[];


    @IsNumber()
    points: number;

}

export class CreateQuestionOptionRequestDto {

    @IsString()
    title: string;

    @IsBoolean()
    correct: boolean;
}
