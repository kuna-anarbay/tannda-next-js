import {IsEnum, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {QuestionType} from "../../models/question.entity";

export class CreateAssignmentRequestDto {

    @IsString()
    @Length(2, 80)
    title: string;

    @IsString()
    @Length(2, 2000)
    @IsOptional()
    description?: string;

    @IsNumber()
    sectionId: number;

    @IsEnum(QuestionType)
    questionType: QuestionType;
}
