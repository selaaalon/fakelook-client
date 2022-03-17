import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { MapComponent } from '../components/map/map.component';
import { PostService } from '../services/post.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [MapComponent],
  imports: [
    CommonModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [PostService],
})
export class MapModule {}
