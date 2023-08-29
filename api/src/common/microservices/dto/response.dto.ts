class MsResponseFieldsErrorDto {
  count: number;
  errors: {
    field: string,
    message: string,
  }[]
}
class MsResponseSystemsErrorDto {
  count: number;
  errors: {
    message: string,
  }[]
}
export class MsResponseDto {
  error: {
    fields: MsResponseFieldsErrorDto,
    systems: MsResponseSystemsErrorDto
  };
  statusCode: number;
  status: boolean;
  message: string;
  payload: Record<string, unknown>;
  metaData: { page: number, totalPage: number, totalCount: number, limit: number, }

  constructor(partial: Partial<MsResponseDto>) {
    Object.assign(this, partial)
  }
}
