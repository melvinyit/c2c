import { NgModule } from '@angular/core';
import {MatToolbarModule,MatCardModule,MatInputModule,MatFormFieldModule
  ,MatRadioModule,MatSelectModule,MatButtonModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

const MATERIALMODULE = [
  MatToolbarModule,MatCardModule,MatInputModule,MatFormFieldModule
  ,MatRadioModule,MatSelectModule,MatButtonModule,MatDatepickerModule,
  MatNativeDateModule ,FlexLayoutModule
  ];

@NgModule({
  declarations: [],
  imports: [MATERIALMODULE],
  exports: [MATERIALMODULE]
})
export class MaterialsModule { }
