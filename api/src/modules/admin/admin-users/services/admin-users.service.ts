import { AdminUserTypeEnum } from '../../../../common/enums/admin/user-type.enum';
import { MailSendingService } from '../../../../common/services/mai-service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUserDto } from 'src/common/dto/admin-user.dto';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { AdminUserEntity } from 'src/common/entities/admin/users/admin-user.entity';
import { CustomException } from 'src/common/exceptions/customException';
import { ValidationException } from 'src/common/exceptions/validationException';
import { Connection, Equal, In, Like, Not, Raw, Repository } from 'typeorm';
import { AdminUserListDto } from '../dto/admin-user-list.dto';
import { CreateAdminUserDto } from '../dto/create-user.dto';
import { UpdateAdminUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { StatusChangeAdminUserDto } from '../dto/status-change-user.dto';
import { FileUploadService } from '../../../../common/services/file-upload.service';

@Injectable()
export class AdminUsersService {
  constructor (
    @InjectRepository(AdminUserEntity) private readonly adminUserRepository: Repository<AdminUserEntity>,
    private connection: Connection,
    private mailSendingService: MailSendingService,
    private readonly fileUploadService: FileUploadService
  ){}

  async findAll(filter: AdminUserListDto, pagination: PaginationDto, adminUser: AdminUserDto): Promise<[ AdminUserEntity[], number ]> {
    try {

      const whereCondition = {};
      //filter
      if (filter.status) whereCondition['status'] = Equal(filter.status);
      if (filter.user_type) whereCondition['user_type'] = Equal(filter.user_type);
      if (filter.full_name) whereCondition['full_name'] = Like(`%${filter.full_name}%`);
      if (filter.phone) whereCondition['phone'] = Equal(filter.phone);
      if (filter.email) whereCondition['email'] = Like(`%${filter.email}%`);
      whereCondition['user_type'] = Not(Equal(AdminUserTypeEnum.SUPER_ADMIN));

      const users = await this.adminUserRepository.find({
        where:{
          ...whereCondition,
        },
        order: { created_at: "DESC" },
        skip: pagination.skip,
        take: pagination.limit,
        relations:[]
      });

      const total  = await this.adminUserRepository.count({
        where: { ...whereCondition }
      });

      return [users, total];
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async create(createAdminUserDto: CreateAdminUserDto, adminUser: AdminUserDto) {
    try {
      const { name, phone, email, password, user_type, profile_pic } = createAdminUserDto;
      //find existing phone entry
      const findExistingPhone = await this.adminUserRepository.findOne({phone});
      if (findExistingPhone) {
        // throw an exception
        throw new ValidationException([{
          field: 'country_mobile_number',
          message: "Phone number already exists."
        }])
      }

      //find Existing Entry
      const findExistingEmail = await this.adminUserRepository.findOne({email});
      if (findExistingEmail) {
        // throw an exception
        throw new ValidationException([{
          field: 'email',
          message: "Email already  exists."
        }])
      }

      // Check profile pic exist or not
      if (profile_pic) {
        const isExistsProfile = this.fileUploadService.IsExistsTempFile(profile_pic);
        if (isExistsProfile == false){
          throw new ValidationException([{
            field: 'profile_pic',
            message: `${profile_pic} Doesn't exists.`
          }])
        } else {
          this.fileUploadService.moveTempFile(profile_pic);
        }
      }

      //Data store
      const hashedPassword = await bcrypt.hash(password, 12);
      let data = {
        name,
        phone,
        email,
        user_type: user_type,
        profile_pic,
        password:hashedPassword,
        created_by: adminUser.id
      }

      return await this.connection.transaction(async manager => {
        const addedUserData =  await manager.getRepository<AdminUserEntity>(this.connection.getMetadata(AdminUserEntity).tableName).save(data);
        return addedUserData;
      })
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async findAllList() {
    try {
      // All Active Data Fetch
      const expectedData = await this.adminUserRepository.findAndCount({ 'status':1 });

      // Return Fetched Data
      return expectedData;
    } catch (error) {
      throw new CustomException(error);
    }
  }


  async findOne(id: string): Promise<AdminUserEntity> {
    try {
      // Single User Fetch
      const expectedData = await this.adminUserRepository.findOne({
        where:{id},
        relations:[]
      });

      // User not found throw an error.
      if(!expectedData){
        throw new NotFoundException("No Data Found!");
      }
      return expectedData;
    } catch (error) {
      throw new CustomException(error);
    }

  }

  async update(id: string, updateAdminUserDto: UpdateAdminUserDto, adminUser:AdminUserDto): Promise<AdminUserEntity> {
    try {
      const whereCondition = {}
      whereCondition['phone'] = Equal(updateAdminUserDto.phone)
      whereCondition['id'] = Not(Equal(id))
      const findPhone = await this.adminUserRepository.findOne({where:{...whereCondition,}});
      if (findPhone) {
        // throw an exception
        throw new ValidationException([{
          field: 'phone',
          message: "Phone number already exists."
        }])
      }

      const whereConditionEmail = {};
      whereConditionEmail['email'] = Equal(updateAdminUserDto.email);
      whereConditionEmail['id'] = Not(Equal(id));
      const findEmail = await this.adminUserRepository.findOne({where:{...whereConditionEmail}});
      if (findEmail) {
        // throw an exception
        throw new ValidationException([{
          field: 'email',
          message: "Email already  exists."
        }])
      }

      // Check profile pic exist or not
      if (updateAdminUserDto.profile_pic) {
        const isExistsProfilePic = this.fileUploadService.IsExistsTempFile(updateAdminUserDto.profile_pic);
        if (isExistsProfilePic == false) {
          const isExistsUploadedProfilePic = this.fileUploadService.IsExistsUploadedFile(updateAdminUserDto.profile_pic);
          if (isExistsUploadedProfilePic == false) {
            throw new ValidationException([{
              field: 'profile_pic',
              message: `${updateAdminUserDto.profile_pic} Doesn't exists.`
            }])
          }
        } else {
          this.fileUploadService.moveTempFile(updateAdminUserDto.profile_pic);
        }
      }

      const findAdminUser = await this.adminUserRepository.findOne(id);
      await this.connection.transaction(async manager => {
        //update data
        await manager.getRepository<AdminUserEntity>(this.connection.getMetadata(AdminUserEntity).tableName).update(
          {
            id:id
          }, {
            name: updateAdminUserDto.full_name,
            phone: updateAdminUserDto.phone,
            email: updateAdminUserDto.email,
            user_type: updateAdminUserDto.user_type,
            profile_pic: updateAdminUserDto.profile_pic,
            updated_by:adminUser.id
          }
        );
      })
      // Updated row getting
      return await this.adminUserRepository.findOne(id);
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async status(id: string, statusChangeAdminUserDto: StatusChangeAdminUserDto, adminUser:AdminUserDto) {
    try {
      // Find user
      const expectedData = await this.adminUserRepository.findOne(id);

      // user not found throw an error.
      if(!expectedData){
        throw new NotFoundException("No Data Found!");
      }

      //update user Status
      await this.adminUserRepository.update(
        {
          id:id
        }, {
          status: statusChangeAdminUserDto.status,
          updated_by:adminUser.id
        }
      );

      // Updated user Fetch
      const user = await this.adminUserRepository.findOne(id);

      //return updated user
      return user;

    } catch (error) {
      throw new CustomException(error);
    }
  }

  async remove(id: string, adminUser:AdminUserDto) {
    try {

      // Find User
      const expectedData = await this.adminUserRepository.findOne({id:id});

      // User not found throw an error.
      if(!expectedData){
        throw new NotFoundException("No User Found!");
      }

      await this.connection.transaction(async manager => {
        //Update Deleted By
        await manager.getRepository<AdminUserEntity>(this.connection.getMetadata(AdminUserEntity).tableName).update(
          {
            id:id
          }, {
            deleted_by:adminUser.id
          }
        );

        //Soft Delete User
        await manager.getRepository<AdminUserEntity>(this.connection.getMetadata(AdminUserEntity).tableName).softDelete(id);
        return true;

      });


    } catch (error) {
      throw new CustomException(error);
    }
  }

  async finalDelete(id: string) {
    try {
      // Find Admin User Data
      const expectedData = await this.adminUserRepository.find({ where: { id }, withDeleted: true });

      // Data not found throw an error.
      if(!expectedData){
        throw new NotFoundException("No Data Found!");
      }

      //Delete data
      await this.adminUserRepository.delete(id);

      //Return
      return true;

    } catch (error) {
      throw new CustomException(error);
    }
  }
}
