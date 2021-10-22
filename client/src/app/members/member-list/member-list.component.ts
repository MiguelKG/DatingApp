import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value: 'male', display: 'Males'}, {value:'female', display: 'Females'}];

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams)
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }


  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event : any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  minAge(){
    var minAge = this.userParams.minAge;
    var maxAge = this.userParams.maxAge;

    if(minAge > 99){
      this.userParams.minAge = 99
    }
    if(minAge < 18){
      this.userParams.minAge = 18
    }
    if(minAge > maxAge) {
      this.userParams.minAge = maxAge;
    }
  }

  maxAge(){
    var minAge = this.userParams.minAge;
    var maxAge = this.userParams.maxAge;
    
    if(maxAge > 99){
      this.userParams.maxAge = 99
    }
    if(maxAge < 18){
      this.userParams.maxAge = 18
    }
    if(maxAge < minAge) {
      this.userParams.maxAge = minAge;
    }
  }
}
