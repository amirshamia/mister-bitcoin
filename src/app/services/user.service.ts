import { Injectable } from '@angular/core';
import { User } from '../models/user.model.ts';
import { Observable, of ,from} from 'rxjs';
import { storageService } from './async-storage.service';

const ENTITY = 'user'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor() {
    }

    
         user = {
            name: "Ochoa Hyde",
            coins: 100,
            moves: []
        }
     
    
 updateBalance(value:number): boolean{
    if(this.user.coins-value<0) return false
    this.user.coins-=value
    return true
 }

    getUserObs(): Observable<User> {
        return of(this.user)
    }
}
