import { Injectable } from '@angular/core';
import { UserAccount } from './user-account';
import { UserAccountPosts } from './user-account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserAccountService {

  constructor(private http:HttpClient) { }

  getUserAccounts():Observable<UserAccount[]> {

    const url = "https://jsonplaceholder.typicode.com/users";

    return this.http.get<UserAccount[]>(url);
  }

  getUserAccountPosts():Observable<UserAccountPosts[]> {

    const url = "https://jsonplaceholder.typicode.com/posts";

    return this.http.get<UserAccountPosts[]>(url);
  }
}
