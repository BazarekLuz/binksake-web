import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {
  @Input() public id!: number;
  @Input() public name!: string;
  @Input() public imgSrc!: string;

  public artistImage!: string;
  public routerLink: string = '';

  constructor() {}

  ngOnInit() {
    this.artistImage = `${environment.imgPath}/${this.imgSrc}`;
    this.routerLink = `/artists/${this.id}`
  }
}
