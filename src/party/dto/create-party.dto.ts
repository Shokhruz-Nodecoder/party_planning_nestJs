import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { User } from "src/user/entities/user.entity"

export class CreatePartyDto {
    @IsNotEmpty()
    @IsString()
    title : string

    @IsNotEmpty()
    location : string

    @IsNotEmpty()
    time : string

    @IsOptional()
    user? : User
}