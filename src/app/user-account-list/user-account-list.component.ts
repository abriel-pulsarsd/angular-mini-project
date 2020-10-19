import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort'; //data filter
import { MatTableDataSource } from '@angular/material/table'; //sorting data Table
import  { MatPaginator } from '@angular/material/paginator'; // data Table pagination
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-user-account-list',
  templateUrl: './user-account-list.component.html',
  styleUrls: ['./user-account-list.component.css']
})
export class UserAccountListComponent implements AfterViewInit {

  displayedColumns: string[] = ['userId', 'name', 'email'];
  dataSource = new MatTableDataSource(this._userAccountService.getUserAccounts());

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _userAccountService: UserAccountService) { }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
                    //MatTableDataSource has a property called filter
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  logData(row) {
    console.log(row);
  }

}
