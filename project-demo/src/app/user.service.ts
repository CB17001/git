import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';

interface User {
    email: string,
    uid: string
}

@Injectable()
export class UserService {
    private user: User;
    private userSubject = new BehaviorSubject(this.user);

    constructor() {}

    

    setUser(user: User) {
        this.user = user
    }

    getUID() {
        return this.user.uid
    }
}