import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuditIdParamDto {
    @ApiProperty({type: String, description:'Audit ID', required:true})
    @IsString()
    @IsNotEmpty()
    audit_id: string;
}
