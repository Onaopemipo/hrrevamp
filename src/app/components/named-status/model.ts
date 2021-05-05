import { MyColor } from 'app/components/status/models';


export interface INamedStatus {
  getNamedStatusLabel(): string;
  getNamedStatusColor(): MyColor;
}
