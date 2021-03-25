import { MyTalentPoolEmployee, TalentPoolService } from './../services/talent-pool.service';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from 'app/components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-testpool',
  templateUrl: './testpool.component.html',
  styleUrls: ['./testpool.component.scss']
})
export class TestpoolComponent implements OnInit {
  testPoolTable: TableColumn [] = [
    {name: 'name', title: 'Name'},
    {name: 'department', title: 'Department'},
    {name: 'unit', title: 'Unit/Division'},
    {name: 'position', title: 'Position'},
  ];

channel: { source: string, label: string, status: boolean }[] = [
  {source: 'database', label: 'Employee Database',  status: true},
  {source: 'portal', label: 'Recruitment Portal', status: false},
  {source: 'external', label: 'External Source',  status: false},
];

selectedChannel: string = 'database';

 newCandidate: boolean = true;
 pageTitle:string = '';
 candidateModel: MyTalentPoolEmployee = new MyTalentPoolEmployee;

  constructor(private router: ActivatedRoute, private poolservice: TalentPoolService) { }

  ngOnInit(): void {
    console.log(this.channel)
    this.pageTitle = this.router.snapshot.paramMap.get("title")
  }

  goback(){

  }


  addCandidate(){
    this.newCandidate = !this.newCandidate;
  }

  async addCandidateToPool(){
   const data = await this.poolservice.addToPool(1,this.candidateModel).toPromise()
   if(data.isSuccessful){
    console.log('Hey Boss', data.message)
   }
  }

onChangeChannel($value){
  console.log($value)
  // this.channel.forEach(element => {
  //   if(element.source == $value) {
      // element.status = true;
      // this.channel.status = true;
      this.selectedChannel = $value;
    // }
    // else
    // console.log('This is my value', this.channel)
    // return this.channel;

  // });
}

}
