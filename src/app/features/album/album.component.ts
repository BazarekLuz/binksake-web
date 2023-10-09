import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlbumService} from "../../core/services/album/album.service";
import {SongDTO} from "../../core/interfaces/song/song-dto";
import {AlbumDTO} from "../../core/interfaces/album/album-dto";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ArtistDTO} from "../../core/interfaces/artist/artist-dto";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

  public albumDetails!: AlbumDTO;
  public songs: SongDTO[] = [];
  public artists: ArtistDTO[] = [];
  public albumDate?: Date;
  private albumId!: number;

  private dateFormat = 'dd/MM/yyyy';
  public imageUrl: string = ''

  public albumDetailsLoading: boolean = true;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.albumId = params['id'];
    })

    this.albumService.getAlbumDetails(this.albumId).subscribe((album: AlbumDTO) => {
      this.albumDetails = album;
      this.albumDate = new Date(album.dateCreated)
      this.imageUrl = `${environment.imgPath}/${this.albumDetails.imgUrl}`
      this.albumDetailsLoading = false;
    });

    this.albumService.getAlbumArtists(this.albumId).subscribe((artistDTO: ArtistDTO[]) => {
      this.artists = artistDTO;
    })

    this.albumService.getAlbumSongs(this.albumId).subscribe((songs: SongDTO[]) => {
      this.songs = songs;
    })
  }

  ngOnDestroy() {

  }
}
