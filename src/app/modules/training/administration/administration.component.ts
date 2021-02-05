import { TopAction } from './../../../components/componentsheader/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  constructor() { }
  actions: TopAction[] = [
    {name: 'create', label: 'Create New', icon: 'plus'}
  ]

  welcome: boolean = true;
  newTraining: boolean = false;
  vendorWindow:boolean = false;
  trainingType: boolean = true;
  newTrainingType:boolean = false;
  trainingCategory:boolean = true;
  category = 'Internal';

  TrainingTypeData = '';
  TrainingVendorData = 'AAAA';

  addVendor="Add New Vendor"
  addType="Add Training Type"

  ngOnInit(): void {
    console.log('I am here');
  }

  get pagetitle() {
    return 'Training Administration';
  }

  addTraining(){
    this.newTraining = true;
    this.welcome = false
  }

  uploadVendor(){
    this.vendorWindow = true;
    this.newTraining = false;
    this.welcome = false;
  }

  addNewTraining(){
    this.newTrainingType = true;
    this.trainingType = false;
  }

  changed(data){

  }
}
