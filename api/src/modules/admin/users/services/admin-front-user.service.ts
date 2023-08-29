import { UserEntity } from '../../../../common/entities/front/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { CustomException } from 'src/common/exceptions/customException';
import { Connection, Equal, Like, Repository } from 'typeorm';
import { AdminTraineesListDto } from '../dto/admin-trainee-list.dto';

@Injectable()
export class AdminFrontUserService {
  constructor (
    @InjectRepository(UserEntity) private readonly adminTraineesRepository: Repository<UserEntity>,
    private connection: Connection,
  ){}

  async findAll(filter: AdminTraineesListDto, pagination: PaginationDto): Promise<[ UserEntity[], number ]> {
    try {
      const whereCondition = {};
      //filter
      if (filter.status) whereCondition['status'] = Equal(filter.status);
      if (filter.name) whereCondition['name'] = Like(`%${filter.name}%`);
      if (filter.phone) whereCondition['phone'] = Equal(filter.phone);
      if (filter.email) whereCondition['email'] = Like(`%${filter.email}%`);

      const Traineres = await this.adminTraineesRepository.find({
        order: { created_at: "DESC" },
        skip: pagination.skip,
        take: pagination.limit,
      });

      const total  = await this.adminTraineesRepository.count();
      return [Traineres, total];
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async findAllList() {
    try {
      // All Active Data Fetch
      const expectedData = await this.adminTraineesRepository.findAndCount({ 'status':1 });

      // Return Fetched Data
      return expectedData;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
