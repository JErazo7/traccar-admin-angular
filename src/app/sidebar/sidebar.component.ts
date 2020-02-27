import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {ViewChild } from '@angular/core';
import { MatDialog, MatTable } from '@angular/material';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { TraccarService } from 'app/services/traccar.service';
import { Device } from 'app/models/device';
 
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {

  displayedColumns: string[] = ['name', 'status','action'];
  
  dataSource: Device[];
  selection = new SelectionModel<Device>(true, []);

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, protected traccarService: TraccarService) {}

  ngOnInit() {
    this.traccarService.getDevices()
      .subscribe(
        (data)=>{
          this.dataSource = data
        })
  }
  
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
