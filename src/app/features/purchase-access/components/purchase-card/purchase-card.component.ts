import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, takeWhile, timer } from 'rxjs';

@Component({
  selector: 'app-purchase-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-card.component.html',
  styles: ``
})
export class PurchaseCardComponent {

  initialTime = 10 * 60;

  time$ = timer(0, 1000).pipe(
    map(tick => this.initialTime - tick),
    takeWhile(seconds => seconds >= 0),
    map(totalSeconds => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return { minutes, seconds };
    })
  );
}
