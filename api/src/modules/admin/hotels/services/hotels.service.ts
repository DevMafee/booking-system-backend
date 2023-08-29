import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserDto } from 'src/common/dto/admin-user.dto';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { AdminUserEntity } from 'src/common/entities/admin/users/admin-user.entity';
import { CustomException } from 'src/common/exceptions/customException';
import { ValidationException } from 'src/common/exceptions/validationException';
import { Connection, Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { CreateAdminUserDto } from '../dto/create-branch.dto';
import { UpdateAdminUserDto } from '../dto/update-branch.dto';
import * as bcrypt from 'bcrypt';
import { StatusChangeDto } from '../dto/status-change-user.dto';
import { FileUploadService } from '../../../../common/services/file-upload.service';
import { HotelEntity } from 'src/common/entities/hotel/user/hotel.entity';
import { AdminBranchsListDto } from '../dto/branch-list.dto';

@Injectable()
export class AdminHotelsService {
  constructor (
    @InjectRepository(HotelEntity) private readonly adminBranchsRepository: Repository<HotelEntity>,
    private connection: Connection,
  ){}

  async findAll(filter: AdminBranchsListDto, pagination: PaginationDto): Promise<[ HotelEntity[], number ]> {
    try {
      const whereCondition = {};
      //filter
      if (filter.status) whereCondition['status'] = Equal(filter.status);
      if (filter.name) whereCondition['name'] = Like(`%${filter.name}%`);
      if (filter.phone) whereCondition['phone'] = Equal(filter.phone);
      if (filter.email) whereCondition['email'] = Like(`%${filter.email}%`);

      const branches = await this.adminBranchsRepository.find({
        order: { created_at: "DESC" },
        skip: pagination.skip,
        take: pagination.limit,
      });

      const total  = await this.adminBranchsRepository.count();

      return [branches, total];
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async findAllList() {
    try {
      // All Active Data Fetch
      const expectedData = await this.adminBranchsRepository.findAndCount({ 'status':1 });

      // Return Fetched Data
      return expectedData;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
