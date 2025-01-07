import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

import { EventDetailsService } from '../../services/event-details.service';
import { EventDetails } from '../../models/history.model';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent implements OnInit {
  public eventDetails?: EventDetails;
  public eventIndex!: number;

  private route = inject(ActivatedRoute);
  private eventDetailsService = inject(EventDetailsService);
  private location = inject(Location);

  public ngOnInit(): void {
    const state = history.state;
    this.eventIndex = state.eventIndex;
    const eventId = this.route.snapshot.paramMap.get('id');
    this.eventDetailsService.getEventById(eventId!).subscribe({
      next: (val) => {
        this.eventDetails = val;
      },
    });
  }

  public goBack(): void {
    this.location.back();
  }
}
