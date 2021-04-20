export interface searchQuery{
  jobCategory?: string,
  activityYear?: number,
  activityName?: string,
  departments?: any,
  status?: number,
  taskType?: number,
  taskProject?: string
  BaseYear?: any;
}
export interface projectionReport{
  id?: number,
  ID?: number,
  departmentId?: number,
  departmentName?: string,
  activityId?: number,
  activityName?: string,
  taskType?: number,
  jobCategory?: string,
  categoryTypeId?: number,
  categorytypeName?: string,
  NumberOfResource?: number,
  approvedNumberOfResource?: number,
  projectionYear?: number,
  requirementCost?: number,
  hrComments?: string,
  hrDecision?: number,
  status?: string,
  

  JroleId?: number,
  GradeId?: number
  jdeparmentId?: number,
  positionId?: number,
  allstring?: string,

  createdByName?: string,
  DateCreated?: string,
  deptmntName?: string,
  HeadofDepartmentName?: string,
  JobRoleId?: number,
  JobRoleName?: string,
  Allroles?:Array<any>,
  JobRoleCount?: number,
  ApprovedJobRoleCount?: number,
  newRequirement?: Array<any>,
  checked?: boolean;
  hrmodificationStatus?: string,
  requirementcompletedStatus?: string,
  AllbaseYearCount?: number,
  RoleCost?: number,
  EmployeeRoleCost?: number,
  Increament?: number,
  EmpCount?: number,
  baseyrPerRoleCost?: number

} 