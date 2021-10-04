import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditsComponent } from '../members/member-edits/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: MemberEditsComponent) : boolean 
  {
    if(component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost')
    }
    return true;
  }
}
