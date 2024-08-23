import { RequestType } from './request.type';
import { v4 as uuidGeneration } from 'uuid';

export class RequestMock {
  id: string;
  type: RequestType;
  url: string;
  body: string;


  constructor(type: RequestType, url: string, body: string) {
    this.id = uuidGeneration();
    this.type = type;
    this.url = url;
    this.body = body;
  }
}
