import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditsComponent } from '../members/member-edits/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) {}

  canDeactivate(component: MemberEditsComponent) : Observable<boolean> | boolean
  {
    if(component.editForm.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }
}
