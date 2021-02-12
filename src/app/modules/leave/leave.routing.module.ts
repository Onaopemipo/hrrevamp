import { Route } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LeavePlanComponent } from "./leave-plan/leave-plan.component";

const routes: Routes = [
    {
        path: '',
        component: LeavePlanComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class LeaveRoutingModule {}