import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { WeatherNowComponent } from './weather-now/weather-now.component';
import { WeatherHourlyComponent } from './weather-hourly/weather-hourly.component';
import { HeaderComponent } from './header/header.component';
import { ToDatePipePipe } from './to-date-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    WeatherNowComponent,
    WeatherHourlyComponent,
    HeaderComponent,
    ToDatePipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
