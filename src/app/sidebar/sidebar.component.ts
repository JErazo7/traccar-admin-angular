import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
 
export interface Dispositivos {
    name: string;
    state: string;
  }
  
  const ELEMENT_DATA: Dispositivos[] = [
    {name: 'Bus 1', state:'on'},
    {name: 'Bus 2',state:'on'},
    {name: 'Bus 3',state:'on'},
    {name: 'Bus 4',state:'off'}
  ];
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
  dispositivos: Dispositivos[];
  displayedColumns: string[] = ['name', 'state','action'];
  
  dataSource = ELEMENT_DATA;
  selection = new SelectionModel<Dispositivos>(true, []);

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Crear'){
        this.addRowData(result.data);
      }else if(result.event == 'Actualizar'){
        this.updateRowData(result.data);
      }else if(result.event == 'Eliminar'){
        this.deleteRowData(result.data);
      }
    });
  }
 
  addRowData(row_obj){
    console.log(row_obj)
    this.dataSource.push({
      name:row_obj.name,
      state: 'on'
    });
    this.table.renderRows();    
  }

  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.name == row_obj.name){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.name != row_obj.name;
    });
  }
}
