import { NgModule } from '@angular/core';
import {MatToolbarModule,MatCardModule,MatInputModule,MatFormFieldModule
  ,MatRadioModule,MatSelectModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule
  ,MatIconModule,MatMenuModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';

const MATERIALMODULE = [
  MatToolbarModule,MatCardModule,MatInputModule,MatFormFieldModule
  ,MatRadioModule,MatSelectModule,MatButtonModule,MatDatepickerModule,
  MatNativeDateModule ,FlexLayoutModule,MatIconModule,MatMenuModule,MatPaginatorModule
  ];

@NgModule({
  declarations: [],
  imports: [MATERIALMODULE],
  exports: [MATERIALMODULE]
})
export class MaterialsModule { }
