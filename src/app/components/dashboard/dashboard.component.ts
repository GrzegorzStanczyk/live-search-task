import { Component } from '@angular/core';
import { StateFacadeService } from 'src/app/+state/state-facade.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public itemsList$ = this.state.itemsList$;

  constructor(private state: StateFacadeService) {}
}
