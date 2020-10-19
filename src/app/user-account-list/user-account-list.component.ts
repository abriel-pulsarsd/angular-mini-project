import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort'; //data filter
import { MatTableDataSource } from '@angular/material/table'; //sorting data Table
import  { MatPaginator } from '@angular/material/paginator'; // data Table paginator
import { UserAccountService } from '../user-account.service';
import { UserAccount } from '../user-account';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-account-list',
  templateUrl: './user-account-list.component.html',
  styleUrls: ['./user-account-list.component.css']
})

export class UserAccountListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource; 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data:Array<UserAccount>;
  
  constructor(private _userAccountService: UserAccountService) { 
    this.data = new Array<UserAccount>();
  }
  
  ngAfterViewInit() {}

  ngOnInit() {
    this._userAccountService.getUserAccounts()
    .pipe(map(data => {
      return new MatTableDataSource(data);
    })).subscribe(dataSource => {
      this.dataSource = dataSource;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }); 
  }

  applyFilter(filterValue: string) {
                    //MatTableDataSource has a property called filter
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  getDataFromAPI() {
    throw new Error('Not implemented yet');
  }

  logData(row) {
    console.log(row);
  }

}
