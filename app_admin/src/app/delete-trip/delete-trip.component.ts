import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css',
})
export class DeleteTripComponent implements OnInit {
  constructor(private router: Router, private tripService: TripDataService) {}

  ngOnInit(): void {
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed the tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.tripService.deleteTrip(tripCode).subscribe({
      next: (value: any) => {
        console.log(`Deleted ${value.code}`)
        this.router.navigate(['']);
      },
      error: (error: any) => {
        console.error('Error: ' + error);
      },
    });
  }
}
