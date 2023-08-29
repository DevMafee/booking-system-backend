type DataType = string | number | boolean | null;
type SheetsType = {
  data: DataType[][];
};
type HeaderType = {
  id: string,
  title: string;
};
export class CsvDownloadDto{
  headers: HeaderType[];
  sheets: SheetsType[];
  fileName?: string;
  constructor(partial: Partial<CsvDownloadDto>) {
    Object.assign(this, partial)
  }
}