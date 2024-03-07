import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateCustomerDto{
    @IsString()
    firstName: string;

    @IsString()
    lastName:string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password:string;

}