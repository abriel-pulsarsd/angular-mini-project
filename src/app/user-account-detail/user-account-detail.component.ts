import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { UserAccount } from '../user-account';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-account-detail',
  templateUrl: './user-account-detail.component.html',
  styleUrls: ['./user-account-detail.component.css']
})
export class UserAccountDetailComponent implements OnInit {

  //id for routing
  public selectedId;

  //specific useraccountinfo
  public userAccountInfo = [];

  //array useraccountinfo data source
  userAccounts:Array<UserAccount>;
  
  constructor(private _userAccountService: UserAccountService, private router: Router, private route: ActivatedRoute) { 
    this.userAccounts = new Array<UserAccount>();
  }

  //get specific useraccount info
  getSpecificUserInfo() {
    this._userAccountService.getUserAccounts()
    .pipe(map(data => {
      return data.find(data => this.selectedId === data.id);
    })).subscribe(data => {
      this.userAccountInfo = [data];
    });
  }

  /*
  * Routing 
  */
  //on select User Account
  onSelect(UserAccount) {
    //this.router.navigate(['/user-account-list', UserAccount.id]);
    this.router.navigate(['/user-account-list', UserAccount.id, {id: UserAccount.id}], {relativeTo: this.route});
    this.getSpecificUserInfo();
  }
  
  //selected User Account
  isSelected(UserAccount) {
    return UserAccount.id === this.selectedId;
  }

  ngOnInit() {
    //routing
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
      //console.log(this.selectedId = id);
    });

    //fetch useraccounts info
    this._userAccountService.getUserAccounts().subscribe((data) => {
      this.userAccounts = data;
    });

    this.getSpecificUserInfo();
  }
}
