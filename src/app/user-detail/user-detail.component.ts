import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user,model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userID!: number;
  userDetail!:User
  constructor(private activateRoute: ActivatedRoute, private api:ApiService){

  }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(val=>{
      this.userID = val['id'];
      this.fetchUserDetails(this.userID)
    })
  }

  fetchUserDetails(userID: number){
    this.api.getRegisteredUser(userID)
    .subscribe(res=>{
      this.userDetail = res;
      console.log(this.userDetail)
    })
  }
}
