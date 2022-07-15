import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { AuthService } from '../services/auth.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  isLoggedIn: Boolean = false;
  user: User = new User('', '', '', '', '', '', false, '');
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe({
      next: (data) => {
        this.isLoggedIn = data.isLoggedIn;
        this.user = data.user;
      },
    });
  }
}
