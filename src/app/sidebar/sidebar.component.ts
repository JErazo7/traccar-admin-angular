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
 
  addRowData(device){
    this.traccarService.createDevice(device)
    .subscribe((data)=>{
      this.dataSource.push(data) 
      this.table.renderRows()     
    })
  }

  updateRowData(device){
    this.traccarService.updateDevice(device)
    .subscribe((data)=>{
      this.dataSource = this.dataSource.filter((value,key)=>{
        if(value.id == data.id){
          value.name = data.name,
          value.status = data.status,
          value.uniqueId = data.uniqueId
        }
        return true;
      });
    })
  }
  deleteRowData(device){
    this.traccarService.deleteDevice(device.id)
    .subscribe(()=>{
      this.dataSource = this.dataSource.filter((value,key)=>{
        return value.id != device.id;
      });
    })
    
  }
}
