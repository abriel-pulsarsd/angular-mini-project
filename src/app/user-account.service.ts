import { Injectable } from '@angular/core';
import { UserAccount } from './user-account';

const USER_ACCOUNTS: UserAccount[] = [
  {userId: 1, name: 'Bruno Sparks', email: 'brunosparks@gmail.com'},
    {userId: 2, name: 'Stanley Day', email: 'stanleyday@gmail.com'},
    {userId: 3, name: 'Jace Pope', email: 'jacepop@gmail.com'},
    {userId: 4, name: 'Brenton Strickland', email: 'brentonst@gmail.com'},
    {userId: 5, name: 'Clarence Miles', email: 'clarencemiles@gmail.com'},
    {userId: 6, name: 'Kianna Rollin', email: 'kiannarollin@gmail.com'},
    {userId: 7, name: 'George Park', email: 'georgepark7@gmail.com'},
    {userId: 8, name: 'Johnny Hardin', email: 'johnnyhardin@gmail.com'},
    {userId: 9, name: 'Alvin Brooks', email: 'alvinbrooks@gmail.com'},
    {userId: 10, name: 'Aubree Finley', email: 'aubreefinley@gmail.com'},
    {userId: 11, name: 'Allan Stokes', email: 'allanstokes@gmail.com'},
    {userId: 12, name: 'Pierce Duke', email: 'pierceduke@gmail.com'},
    {userId: 13, name: 'Lewis Kerr', email: 'lewiskerr@gmail.com'},
    {userId: 14, name: 'Maleah Howard', email: 'maleahhoward@gmail.com'},
    {userId: 15, name: 'Corey Hubbard', email: 'coreyhubbard@gmail.com'},
];

@Injectable({
  providedIn: 'root'
})

export class UserAccountService {

  constructor() { }

  getUserAccounts() {
    return USER_ACCOUNTS;
  }
}
