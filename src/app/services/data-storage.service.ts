import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {
  private storage:any;
  constructor() {
   }
   saveData(storage:any):string{
      this.storage = storage;
      return 'saved';
   }
   retreiveData():any{
     return this.storage;
   }

}
