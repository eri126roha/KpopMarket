import { Component ,OnInit } from '@angular/core';
import { MerchandiseService } from '../services/merch.service';
@Component({
  selector: 'app-listmerchs',
  templateUrl: './listmerchs.component.html',
  styleUrl: './listmerchs.component.css'
})
export class ListmerchsComponent implements OnInit {
  merchs: any[] = [];

  constructor(private merchService: MerchandiseService) {}

  ngOnInit(): void {
    this.fetchMerchs();
  }

  fetchMerchs(): void {
    this.merchService.getMerchs().subscribe(
      (data) => {
        this.merchs = data;
      },
      (error) => {
        console.error('Error while lising Merchs', error);
      }
    );
  }
  getMerchs(): void {
    this.merchService.getMerchs().subscribe((data: any[]) => {
      this.merchs = data;
    });
  }
  onDeleteMerch(merchId: string): void {
    if (confirm('Do you really want to delete this merch ?')) {
      this.merchService.deleteMerch(merchId).subscribe(() => {
        alert('Merch successfully deleted');
        this.getMerchs(); // Mettre à jour la liste après la suppression
      }, error => {
        console.error('Error while deleting the merch', error);
        alert('An error occured in the deleting process.');
      });
    }
  }
}
