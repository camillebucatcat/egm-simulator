import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotMachineComponent } from './slot-machine.component';

const routes: Routes = [{ path: '', component: SlotMachineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotMachineRoutingModule { }
