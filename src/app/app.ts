import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header-component/header-component';
import { WorkoutsComponent } from './workouts/workouts/workouts_component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, WorkoutsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('workout-tracker');
}
