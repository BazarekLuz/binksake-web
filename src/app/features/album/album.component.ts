import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlbumService} from "../../core/services/album/album.service";
import {SongDTO} from "../../core/interfaces/song/song-dto";
import {AlbumDTO} from "../../core/interfaces/album/album-dto";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

  public albumDetails!: AlbumDTO;
  public songs: SongDTO[] = [];
  private albumId!: number;

  public imageUrl: string = ''

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.albumId = params['id'];
    })

    this.albumService.getAlbumDetails(this.albumId).subscribe((album: AlbumDTO) => {
      this.albumDetails = album;
      this.imageUrl = `${environment.imgPath}/${this.albumDetails.imgUrl}`
    });

    this.albumService.getAlbumSongs(this.albumId).subscribe((songs: SongDTO[]) => {
      this.songs = songs;
    })



  }

  ngOnDestroy() {

  }
}
