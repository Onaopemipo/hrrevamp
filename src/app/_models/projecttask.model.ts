import { IStatus, MyColor } from 'app/components/status/models';
export interface modelprojectTask {
  task_id: number;
  task_name: string;
  task_timestamp: Date;
  task_status_id: number;
  task_content: string;
}

export enum taskstatus {
  INCOMPLETE, COMPLETE
}

export class Projecttasksclass implements IStatus {

  pTaskObj: modelprojectTask;

  constructor(taskObj: modelprojectTask) {
    this.pTaskObj = taskObj;
  }
  get status() {
    return this.pTaskObj.task_status_id;
}
  getStatusLabel() {
    if (this.pTaskObj.task_status_id === taskstatus.INCOMPLETE) return 'Incomplete';
    if (this.pTaskObj.task_status_id === taskstatus.COMPLETE) return 'Complete';

  }
  getStatusColor() {
    if (this.pTaskObj.task_status_id  === 0) return new MyColor(242, 153, 74);
    if (this.pTaskObj.task_status_id === 1) return new MyColor(0, 153, 74);
    return new MyColor(242, 0, 74);
 }
}
