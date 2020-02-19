import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
    name: string;
    state: number;
  }
  
  
const ELEMENT_DATA: PeriodicElement[] = [
    {name: 'Hydrogen', state: 1.0079, },
    {name: 'Helium', state: 4.0026, },
    {name: 'Lithium', state: 6.941, },
    {name: 'Beryllium', state: 9.0122,},
    {name: 'Boron', state: 10.811, },
    {name: 'Carbon', state: 12.0107, },
    {name: 'Nitrogen', state: 14.0067, },
    {name: 'Oxygen', state: 15.9994, },
    {name: 'Fluorine', state: 18.9984, },
    { name: 'Neon', state: 20.1797, },
  ];
  
@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent {
    displayedColumns: string[] = ['select', 'name', 'state'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row `;
  }
}
