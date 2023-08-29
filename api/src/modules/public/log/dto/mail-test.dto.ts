import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class MailTestDto {
  @ApiProperty({type: String, description:'Message', required:true})
  message: string;

  @ApiProperty({type: String, description:'receiver_email', required:true})
  receiver_email: string;
}
