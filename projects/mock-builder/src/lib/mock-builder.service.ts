import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { http, HttpResponse } from 'msw';
import { addNewRequestHandler, deleteRequestHandler } from './utils/mock-service-worker';
import { RequestMock } from './models/request.mock';
import { RequestType } from './models/request.type';

@Injectable({
  providedIn: 'root'
})
export class MockBuilderService {
  private savedMockSource: Subject<RequestMock[]> = new Subject<RequestMock[]>();
  private savedMocks: RequestMock[] = [];
  savedMocks$ = this.savedMockSource.asObservable();

  constructor(private http: HttpClient) {}

  addMock(mock: RequestMock) {
    try {
      this.enableInterceptionForMock(mock);
      this.savedMocks.push(mock);
      this.savedMockSource.next(this.savedMocks);
    } catch (error) {
      console.log(error);
    }
  }

  removeMock(mockId: string) {
    try {
      this.disableInterceptionForMock(mockId);
      this.savedMocks.splice(
        this.savedMocks.findIndex((savedMock) => savedMock.id === mockId),
        1
      );
      this.savedMockSource.next(this.savedMocks);
    } catch (error) {
      console.log(error);
    }
  }

  private getMSWMethod(type: RequestType) {
    let method;
    switch(type) {
      case RequestType.GET:
        method = http.get;
        break;
      case RequestType.PUT:
        method = http.put;
        break;
      case RequestType.POST:
        method = http.post;
        break;
      case RequestType.DELETE:
        method = http.delete;
        break;
    }
    return method
  }

  enableInterceptionForMock(mock: RequestMock) {
    const method = this.getMSWMethod(mock.type);
    addNewRequestHandler(mock.id, method(mock.url, () => {
      return HttpResponse.json(JSON.parse(mock.body));
    }));
  }

  disableInterceptionForMock(mockId: string) {
    deleteRequestHandler(mockId);
  }

  testMock(mock:RequestMock): Observable<any> {
    let apiCall: Observable<any>;
    switch(mock.type) {
      case RequestType.GET:
        apiCall = this.http.get(mock.url);
        break;
      case RequestType.PUT:
        apiCall = this.http.put(mock.url, {});
        break;
      case RequestType.POST:
        apiCall = this.http.post(mock.url, {});
        break;
      case RequestType.DELETE:
        apiCall = this.http.delete(mock.url);
        break;
    }
    return apiCall;
  }
}
