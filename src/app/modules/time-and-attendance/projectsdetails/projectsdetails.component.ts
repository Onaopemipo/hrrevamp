import { Component, OnInit } from '@angular/core';
import {Projecttasksclass, modelprojectTask } from '../../../_models/projecttask.model';
@Component({
  selector: 'ngx-projectsdetails',
  templateUrl: './projectsdetails.component.html',
  styleUrls: ['./projectsdetails.component.scss']
})
export class ProjectsdetailsComponent implements OnInit {
  title: string = 'Project XX';
  loading: boolean = true;
  todaysdate = new Date();
  newprjTask: Projecttasksclass[] = [];
  projecttasks: modelprojectTask[] = [
    {
      task_id: 1,
      task_name: 'Task Test 1',
      task_status_id: 0,
      task_content: 'Canvas is a very powerful tool in HTML/Javascript. You can draw/scribble on a designated area, resize it, change colors, put a picture in background and write on it etc. Canvas can even cater to PDF and other files, but we’ll stick to images for this post',
      task_timestamp: new Date(),
    },
    {
      task_id: 2,
      task_name: 'Task Test 2',
      task_status_id: 1,
      task_content: 'Facebook etc. image shares. Essentially, we create a Canvas in the app, and let the user draw on the Canvas. ',
      task_timestamp: new Date(),
    },
    {
      task_id: 3,
      task_name: 'Task Test 3',
      task_status_id: 1,
      task_content: 'Due to Ionic being platform agnostic, there are different types of Ionic Apps you can build for same functionality. Most popular ones are',
      task_timestamp: new Date(),
    }

  ];
  selectedProjectTask?: modelprojectTask;
  constructor() { }
  maptask() {
    this.projecttasks.forEach((value:modelprojectTask) => {
      this.newprjTask.push(new Projecttasksclass(value));
    })
    console.log(this.newprjTask);
    setTimeout(() => {
      this.loading = false;
    }, 3000);
}
  ngOnInit(): void {
    this.maptask();
   
 
  }
  changeSelectedTask(task: modelprojectTask) {
    this.selectedProjectTask = task;
  }
}
