import { Component } from '@angular/core';
import { FirebaseAppModule } from '@angular/fire/app';
import { FirestoreModule } from '@angular/fire/firestore';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgbPopoverModule, FirestoreModule, FirebaseAppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parking';
}
