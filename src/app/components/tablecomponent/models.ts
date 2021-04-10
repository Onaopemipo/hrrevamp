import { TemplateRef } from '@angular/core';

export interface TableData {
    page: number;
    data: object[];
}

export enum ColumnTypes {
    Text, Status, Date, Link
}

export interface TableColumn {
    name: string;
    title: string;
    type?: ColumnTypes;
    template?: TemplateRef<any>;
    colors?: {};
    link_name?: string;
}

export interface TableAction {
  label: string;
  name: string;
}

export interface TableActionEvent<T=any> {
    name: string;
    data: T;
}

export enum ACTIONS { EDIT = '1', DELETE = '2' , VIEW = '3'}
