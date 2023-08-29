export enum AdminUserTypeEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  CREDIT = "CREDIT",
  HR_ADMIN = "HR_ADMIN",
  GENERAL_EMPLOYEE = "GENERAL_EMPLOYEE",
}
const adminUserTypeSerial = Object.values(AdminUserTypeEnum);

export function adminUserSerialize(adminUserTypes: AdminUserTypeEnum[]){
  const userList = [];
  adminUserTypeSerial.forEach(user=>{
    if(adminUserTypes.includes(user)){
      userList.push(user)
    }
  })
  return userList;
}