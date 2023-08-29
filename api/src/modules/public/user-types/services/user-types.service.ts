import {Injectable} from '@nestjs/common';
import { AdminUserTypeEnum } from 'src/common/enums/admin/user-type.enum';
import {CustomException} from 'src/common/exceptions/customException';

@Injectable()
export class UserTypesService {
  async findAllList() {
    try {

      // All Active Countries Fetch
      const expectedData = AdminUserTypeEnum;
      let result = Object.keys(expectedData).map(function(key) {
        return {
          id: key,
          value: expectedData[key]
        };
      });
      // Return Fetched Countries
      return result;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
