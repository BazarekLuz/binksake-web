import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {
  @Input() public name!: string;
  @Input() public id!: number;

  public routerLink: string = '';

  ngOnInit() {
    this.routerLink = `/playlists/${this.id}`;
  }
}
