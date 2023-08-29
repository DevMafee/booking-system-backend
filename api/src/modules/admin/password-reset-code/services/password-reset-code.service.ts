import { PasswordResetsEntity } from '../../../../common/entities/shared/password-reset/password-resets.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Equal, Repository } from 'typeorm';
import { CustomException } from 'src/common/exceptions/customException';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { RoleListDto } from "../dto/password-reset-codes-list.dto";

@Injectable()
export class PasswordResetService {
  constructor (
    @InjectRepository(PasswordResetsEntity) private readonly passwordResetRepository: Repository<PasswordResetsEntity>,
    private connection: Connection,
  ){}
  async findAll() {
    try {
      const resetcodes = {}

      //find Password Reset Codes for Company
      resetcodes['company_codes'] = await this.passwordResetRepository.query(`
                        SELECT p.id, p.user_type, p.reset_code, p.is_used, c.full_name, c.mobile_number as mobile_number 
                        FROM password_resets as p, company_users as c 
                        WHERE p.userId=c.id AND p.user_type = 1 AND is_used = 0 ORDER BY p.created_at DESC`)
      
      //find Password Reset Codes for Admin
      resetcodes['admin_codes'] = await this.passwordResetRepository.query(`
                        SELECT p.id, p.user_type, p.reset_code, p.is_used, a.full_name, a.phone as mobile_number 
                        FROM password_resets as p, admin_users as a 
                        WHERE p.userId=a.id AND p.user_type = 2 AND is_used = 0 ORDER BY p.created_at DESC`)

      // Return Fetched Password Reset Codes
      return resetcodes;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
