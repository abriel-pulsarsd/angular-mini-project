import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort'; 
import { MatTableDataSource } from '@angular/material/table'; 
import  { MatPaginator } from '@angular/material/paginator';
import { UserAccountService } from '../user-account.service';
import { UserAccount } from '../user-account';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-account-list',
  templateUrl: './user-account-list.component.html',
  styleUrls: ['./user-account-list.component.css']
})

export class UserAccountListComponent implements AfterViewInit, OnInit {
  //set id for routing
  public selectedId;

  //set user accounts data table
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource; 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  //set array data source
  data:Array<UserAccount>;
  
  constructor(private _userAccountService: UserAccountService, private router: Router, private route: ActivatedRoute) { 
    this.data = new Array<UserAccount>();
  }
  
  ngOnInit(): void {
    //routing
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });

    //user accounts data source
    this._userAccountService.getUserAccounts()
    .pipe(map(data => {
      return new MatTableDataSource(data);
    })).subscribe(data => {
      this.dataSource = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }); 
  }
  ngAfterViewInit() {}

  //data source
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  //data source
  getDataFromAPI() {
    //throw new Error('Not implemented yet');
    //user accounts data source
    // this._userAccountService.getUserAccounts().subscribe((data) => {
    //   console.log(data);
    //   this.data = data;
    // }); 
  }
  //data source
  logData(row) {
   //console.log(row);
   throw new Error('Not implemented yet');
  }

  /*
  * Routing 
  */
  //on select User Account
  onSelect(UserAccount) {
    this.router.navigate([UserAccount.id], {relativeTo: this.route});
  }
  //selected User Account
  isSelected(UserAccount) {
    return UserAccount.id === this.selectedId;
  }
}
