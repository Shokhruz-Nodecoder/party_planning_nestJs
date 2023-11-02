import { IsEmail, MinLength, IsString } from "class-validator"

export class CreateUserDto {
   @IsEmail()
   email : string

   @IsString()    
   @MinLength(6, {message : "Password must be at least 6 characters"})
   password : string
}
