import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { UserAccount } from '../user-account';
import { UserAccountPosts } from '../user-account';
import { filter, map } from 'rxjs/operators';
import  * as L from 'leaflet';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-account-detail',
  templateUrl: './user-account-detail.component.html',
  styleUrls: ['./user-account-detail.component.css']
})
export class UserAccountDetailComponent implements OnInit, AfterViewInit {

  //id for routing
  public selectedId;

  //specific useraccountinfo
  public userAccountInfo = [];
  public userAccountInfoPosts = [];

  //array useraccountinfo & posts
  public userAccounts:Array<UserAccount>;
  public userAccountPosts:Array<UserAccountPosts>;

  //toggle edit
  public isDisableEditFieldsAndBtns = false;
  
  //btn
  public btnfieldRequired = false;

  //success
  public successfullySaved = false; 

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

  //leaflet map
  private map; 

  opened = false;

  constructor(
    private _userAccountService: UserAccountService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { 
    this.userAccounts = new Array<UserAccount>();
    this.userAccountPosts = new Array<UserAccountPosts>();
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
    this.getSpecificUserInfoPosts();

    this.isDisableEditFieldsAndBtns = true;
    this.btnfieldRequired = true;
  }

  ngAfterViewInit() {
    //lmap
    this.initMap(51.505, -0.09);
  }

  //get specific useraccount info
  private getSpecificUserInfo() {
    this._userAccountService.getUserAccounts()
    .pipe(map(userAccounts => {
      return userAccounts.filter(
        //return data.find(data => this.selectedId === data.userId);
        userAccount => userAccount.id === this.selectedId
      )
    })).subscribe(data => {
      this.userAccountInfo = data;
      //lmap
      this.userAccountInfo.forEach((lmap) => {
        //this.initMap(51.505, -0.09);
        this.userMap(lmap.address.geo.lat, lmap.address.geo.lng);
      });
    });
  }

  //get specific useraccount info posts
  private getSpecificUserInfoPosts() {
    this._userAccountService.getUserAccountPosts()
    .pipe(map(posts => {
      return posts.filter(
        post => post.userId === this.selectedId
      )
    })).subscribe(selectedUserPosts => {
      this.userAccountInfoPosts = selectedUserPosts;
      console.log(this.userAccountInfoPosts);
    });
  }

  /*
  * Routing 
  */
  //on select User Account
  public onSelect(UserAccount) {
    //this.router.navigate(['/user-account-list', UserAccount.id]);
    this.router.navigate(['/user-account-list', UserAccount.id, {id: UserAccount.id}], {relativeTo: this.route});

    this.getSpecificUserInfo();
    this.getSpecificUserInfoPosts();

    //validation set to default states
    this.validateDefault();
    this.isDisableEditFieldsAndBtns = true;
    this.btnfieldRequired = true;
    this.successfullySaved = false;
  }
  
  //selected User Account
  public isSelected(UserAccount) {
    return UserAccount.id === this.selectedId;
  }

  //btn toggle edit
  public btnToggleEditFields() {
    this.isDisableEditFieldsAndBtns = !this.isDisableEditFieldsAndBtns;
  }

  //btn cancel
  public btnCancel() {
    this.getSpecificUserInfo();
  }

  public btnOnSubmit() {
    this.userAccountInfo.forEach((userInfo) => {
      console.log('****** Successfully Saved~! *******')
      console.log('ID: ' + userInfo.id);
      console.log('Name: ' + userInfo.name);
      console.log('Username: ' + userInfo.username);
      console.log('Email: ' + userInfo.email);
      console.log('Company Name: ' + userInfo.company.name);
      console.log('Company Catch Phrase: ' + userInfo.company.catchPhrase);
      console.log('Company BS: ' + userInfo.company.bs);
      console.log('Street: ' + userInfo.address.street);
      console.log('Suite: ' + userInfo.address.suite);
      console.log('Zip Code: ' + userInfo.address.zipcode);
      console.log('Phone: ' + userInfo.phone);
      console.log('Website: ' + userInfo.website);
      console.log('***********************************')

      this.successfullySaved = true;
    });

  }

  private userMap(geoLat: number, geoLng: number): void { 
    this.map.setView([geoLat, geoLng], 15);
    
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    L.marker([geoLat, geoLng]).addTo(this.map)
    .bindPopup(geoLat + ' ' + geoLng)
    .openPopup();

    tiles.addTo(this.map);
  }

  private initMap(geoLat: number, geoLng: number): void {
    this.map = L.map('map').setView([geoLat, geoLng], 15);
    this.userMap(geoLat, geoLng);
  }

  /* Validation - Todo */
  private validateDefault() {
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

  public validateName(value: string) {
    if(value.length <= 0) {     
      this.validate.nameReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.nameReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
      if(value.length < 5) {
        this.validate.nameMin = true;
        this.btnfieldRequired = true;
        this.successfullySaved = false;
      } else {
        this.validate.nameMin = false
        this.btnfieldRequired = false;
      }
    }
  }
  public validateUname(value: string) {
    if(value.length <= 0) {     
      this.validate.unameReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.unameReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
      if(value.length < 5) {
        this.validate.unameMin = true;
        this.btnfieldRequired = true;
        this.successfullySaved = false;
      } else {
        this.validate.unameMin = false
        this.btnfieldRequired = false;
      }
    }
  }

  public validateEmail(value: string) {
    if(value.length <= 0) {     
      this.validate.emailReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.emailReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }

  public validateCompanyName(value: string) {
    if(value.length <= 0) {     
      this.validate.companyNameReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.companyNameReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validateCompanyPhrase(value: string) {
    if(value.length <= 0) {     
      this.validate.companyPhraseReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.companyPhraseReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validateCompanyBs(value: string) {
    if(value.length <= 0) {     
      this.validate.companyBsReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.companyBsReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public  validateAddressStreet(value: string) {
    if(value.length <= 0) {     
      this.validate.streetReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.streetReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validateAddressSuite(value: string) {
    if(value.length <= 0) {     
      this.validate.suitReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.suitReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validateAddressCity(value: string) {
    if(value.length <= 0) {     
      this.validate.cityReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.cityReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validateAddressZipcode(value: string) {
    if(value.length <= 0) {     
      this.validate.zipcodeReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.zipcodeReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validatePhone(value: string) {
    if(value.length <= 0) {     
      this.validate.phoneReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.phoneReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  public validateWebsite(value: string) {
    if(value.length <= 0) {     
      this.validate.websiteReq = true;
      //disable submit btn
      this.btnfieldRequired = true;
      this.successfullySaved = false;
    } else { 
      this.validate.websiteReq = false;
      //enable submit btn
      this.btnfieldRequired = false;
    }
  }
  

}
