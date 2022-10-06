import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public rechercheVilles: string = "";
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }
  public chercherVilles(): void {
    this.weatherService.updateWeather(this.rechercheVilles).subscribe({
      error: err => console.error(err)
    });

  }
}
