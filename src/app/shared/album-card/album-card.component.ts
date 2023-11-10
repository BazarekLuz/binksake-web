import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from "../../core/services/language/language.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AlbumDTO} from "../../core/interfaces/album/album-dto";

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent implements OnInit {
  @Input() name!: string;
  @Input() year!: string;
  @Input() imgSrc!: string;
  @Input() id!: number;

  public subheader: string = '';
  public albumImage!: string;
  public routerLink: string = '';

  constructor(
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.albumImage = `${environment.musicFilesUrl}/${this.imgSrc}`;
    this.subheader = this.year + " " + this.languageService.instant('album.album');
    this.routerLink = `/albums/${this.id}`;
  }

}
