import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { User } from "src/user/entities/user.entity"
import {ApiProperty} from "@nestjs/swagger"
export class CreatePartyDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({description : "Title for party creat", type:"string", example : "Happy November"})
    title : string

 
    @ApiProperty({description : "Location for party creat", type:"string", example : "Amir Temur street 68"})
    @IsNotEmpty()
    location : string
 
    @ApiProperty({description : "Time for party creat", type:"string", example : "2023-19-10"})
    @IsNotEmpty()
    time : string

    @IsOptional()
    user? : User
}