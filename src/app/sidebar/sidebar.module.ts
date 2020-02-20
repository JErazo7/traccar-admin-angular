import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';



@NgModule({
    imports: [ RouterModule, CommonModule, MatTableModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule],
    declarations: [ SidebarComponent,  DialogBoxComponent ],
    exports: [ SidebarComponent ],
    entryComponents: [
        DialogBoxComponent
      ],
})

export class SidebarModule {}
