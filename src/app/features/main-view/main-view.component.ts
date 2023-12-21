import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {AlbumService} from "../../core/services/album/album.service";
import {ArtistService} from "../../core/services/artist/artist.service";
import {AlbumDTO} from "../../core/interfaces/album/album-dto";
import {ArtistDTO} from "../../core/interfaces/artist/artist-dto";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  public albums: AlbumDTO[] = [];
  public artists: ArtistDTO[] = [];

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  ngOnInit() {
    this.albumService.getAlbumDetails(1).subscribe({
      next: (album: AlbumDTO) => {
        this.albums = [...this.albums, album];
      }
    })
    this.albumService.getAlbumDetails(2).subscribe({
      next: (album: AlbumDTO) => {
        this.albums = [...this.albums, album];
      }
    })

    this.artistService.getArtist(1).subscribe({
      next: (artist: ArtistDTO) => {
        this.artists = [...this.artists, artist];
      }
    })
    this.artistService.getArtist(2).subscribe({
      next: (artist: ArtistDTO) => {
        this.artists = [...this.artists, artist];
      }
    })

  }
}
