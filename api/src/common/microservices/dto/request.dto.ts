import { v4 as uuidv4 } from 'uuid';
export class MsRequestDto {
  _request_id: string;
  data: Record<string, any>
  constructor(partial: Record<string, any>) {
    Object.assign(this, partial)
    this._request_id = uuidv4()
  }
}

