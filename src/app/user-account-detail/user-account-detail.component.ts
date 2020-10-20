import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { UserAccount } from '../user-account';
import { map, filter } from 'rxjs/operators';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-account-detail',
  templateUrl: './user-account-detail.component.html',
  styleUrls: ['./user-account-detail.component.css']
})
export class UserAccountDetailComponent implements OnInit {

  //for id for routing
  public selectedId;

  //for 
  public userAccountInfo = [];

  //set array data source
  userAccounts:Array<UserAccount>;
  

  constructor(private _userAccountService: UserAccountService, private router: Router, private route: ActivatedRoute) { 
    this.userAccounts = new Array<UserAccount>();
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

    //get specific useraccount info
    this._userAccountService.getUserAccounts()
    .pipe(map(data => {
      return data.find(data => this.selectedId === data.id);
    })).subscribe(data => {
      this.userAccountInfo = [data];
    });
  }
}
