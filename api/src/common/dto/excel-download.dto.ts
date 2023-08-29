type DataType = string | number | boolean | null;
type SheetsType = {
  name: string,
  data: DataType[][];
};
export class ExcelDownloadDto{
  sheets: SheetsType[];
  fileName?: string;
  constructor(partial: Partial<ExcelDownloadDto>) {
    Object.assign(this, partial)
  }
}