import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { TimelineViewComponent } from './components/timeline-view/timeline-view.component';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { MapComponent } from './components/map/map.component';
// import { MapModule } from './modules/map.module';
import { PopupPostComponent } from './components/popup-post/popup-post.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TagPeopleComponent } from './components/tag-people/tag-people.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AddTagsComponent } from './components/add-tags/add-tags.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AddDescriptionComponent } from './components/add-description/add-description.component';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { AngularCesiumModule, AngularCesiumWidgetsModule } from 'angular-cesium';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    MainPageComponent,
    MapViewComponent,
    TimelineViewComponent,
    PostComponent,
    AddPostComponent,
    PopupPostComponent,
    SideBarComponent,
    TagPeopleComponent,
    AddTagsComponent,
    DateFilterComponent,
    AddDescriptionComponent,
    AddCommentComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // MapModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    HttpClientModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
