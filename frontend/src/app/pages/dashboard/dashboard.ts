import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  storageUnits: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.getStorageUnits().subscribe((data) => {
      this.storageUnits = data;
    });
  }
}