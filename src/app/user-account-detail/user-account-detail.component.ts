import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { UserAccount } from '../user-account';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {FormControl, Validators} from '@angular/forms';

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

  //toggle edit
  isDisableEditFieldsAndBtns = false;

  //
  btnfieldRequired = false;

  //
  public valRequiredName = false;
  public valMin = false;

  //states
  public validate = {
    //name
    nameReq: false,
    nameMin: false,
    //uname
    unameReq: false,
    unameMin: false,
    //email
    emailReq: false,
    //company name
    companyNameReq: false,
    //company phrase
    companyPhraseReq: false,
    //company bs
    companyBsReq: false,
    //street
    streetReq: false,
    //suite
    suitReq: false,
    //city
    cityReq: false,
    //zipcode
    zipcodeReq: false,
    //phone
    phoneReq: false,
    //website
    websiteReq: false,
  }

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
    this.validateDefault();
    this.isDisableEditFieldsAndBtns = true;
  }
  
  //selected User Account
  isSelected(UserAccount) {
    return UserAccount.id === this.selectedId;
  }

  //btn toggle edit
  btnToggleEditFields() {
    this.isDisableEditFieldsAndBtns = !this.isDisableEditFieldsAndBtns;
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

    this.isDisableEditFieldsAndBtns = true;
  }

  /* Validation - Todo */

  validateDefault() {
    this.validate.nameReq = false;
    this.validate.nameMin = false;
    this.validate.unameReq = false;
    this.validate.unameMin = false;
    this.validate.emailReq = false;
    this.validate.companyNameReq = false;
    this.validate.companyPhraseReq = false;
    this.validate.companyBsReq = false;
    this.validate.streetReq = false;
    this.validate.suitReq = false;
    this.validate.cityReq = false;
    this.validate.zipcodeReq = false;
    this.validate.phoneReq = false;
    this.validate.websiteReq = false;
  }

  validateName(value: string) {
    if(value.length <= 0) {     
      this.validate.nameReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.nameReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
      if(value.length < 5) {
        this.validate.nameMin = true;
        this.btnfieldRequired = true;
      } else {
        this.validate.nameMin = false
        this.btnfieldRequired = false;
      }
    }
  }
  validateUname(value: string) {
    if(value.length <= 0) {     
      this.validate.unameReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.unameReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
      if(value.length < 5) {
        this.validate.unameMin = true;
        this.btnfieldRequired = true;
      } else {
        this.validate.unameMin = false
        this.btnfieldRequired = false;
      }
    }
  }
  
  validateEmail(value: string) {
    if(value.length <= 0) {     
      this.validate.emailReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.emailReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateCompanyName(value: string) {
    if(value.length <= 0) {     
      this.validate.companyNameReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.companyNameReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateCompanyPhrase(value: string) {
    if(value.length <= 0) {     
      this.validate.companyPhraseReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.companyPhraseReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateCompanyBs(value: string) {
    if(value.length <= 0) {     
      this.validate.companyBsReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.companyBsReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateAddressStreet(value: string) {
    if(value.length <= 0) {     
      this.validate.streetReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.streetReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateAddressSuite(value: string) {
    if(value.length <= 0) {     
      this.validate.suitReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.suitReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateAddressCity(value: string) {
    if(value.length <= 0) {     
      this.validate.cityReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.cityReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateAddressZipcode(value: string) {
    if(value.length <= 0) {     
      this.validate.zipcodeReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.zipcodeReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validatePhone(value: string) {
    if(value.length <= 0) {     
      this.validate.phoneReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.phoneReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  validateWebsite(value: string) {
    if(value.length <= 0) {     
      this.validate.websiteReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
    } else { 
      this.validate.websiteReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  

}
