import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { PhenomenaComponent } from './phenomena/phenomena.component';
import { SensorsComponent } from './sensors/sensors.component';
import { DevicesComponent } from './devices/devices.component';
import { PhenomenaDetailComponent } from './phenomena-detail/phenomena-detail.component';
import { PhenomenaFormComponent } from './phenomena-form/phenomena-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SensorsDetailComponent } from './sensors-detail/sensors-detail.component';
import { DevicesDetailComponent } from './devices-detail/devices-detail.component';
import { SensorsFormComponent } from './sensors-form/sensors-form.component';
import { DevicesFormComponent } from './devices-form/devices-form.component';
import { FormTemplateComponent } from './form-template/form-template.component';

let routes = [
  {path: '', component: LandingpageComponent},
  {path: 'phenomena', component: PhenomenaComponent},
  {path: 'phenomenon/:iri', component: PhenomenaDetailComponent},
  {path: 'phenomenonupdate/:iri', component: PhenomenaFormComponent},
  {path: 'sensors', component: SensorsComponent},
  {path: 'sensor/:iri', component: SensorsDetailComponent},
  {path: 'sensorupdate/:iri', component: SensorsFormComponent},
  {path: 'devices', component: DevicesComponent},
  {path: 'device/:iri', component: DevicesDetailComponent},
  {path: 'deviceupdate/:iri', component: DevicesFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingpageComponent,
    PhenomenaComponent,
    SensorsComponent,
    DevicesComponent,
    PhenomenaDetailComponent,
    PhenomenaFormComponent,
    SensorsDetailComponent,
    DevicesDetailComponent,
    SensorsFormComponent,
    DevicesFormComponent,
    FormTemplateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }