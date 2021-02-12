import { TemplateRef } from "@angular/core";

export interface TableData {
    page: number;
    data: object[];
}

export enum ColumnTypes {
    Text, Status, Date
}

export interface TableColumn {
    name: string;
    title: string;
    type: ColumnTypes;
    template?: TemplateRef<any>;
    colors?: {};
}

