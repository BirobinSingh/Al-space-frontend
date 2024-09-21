import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  data: any[] = []; // Ensure data is an array

  constructor(private router :Router,private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getData().subscribe(response => {
        this.data = response; 
        console.log(this.data);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
