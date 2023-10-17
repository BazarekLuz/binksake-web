import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AlbumService} from "../../core/services/album/album.service";
import {SongDTO} from "../../core/interfaces/song/song-dto";
import {AlbumDTO} from "../../core/interfaces/album/album-dto";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {ArtistDTO} from "../../core/interfaces/artist/artist-dto";
import {AudioService} from "../../core/services/audio/audio.service";
import {QueueService} from "../../core/services/queue/queue.service";

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

  public imageUrl: string = ''

  public albumDetailsLoading: boolean = true;

  constructor(
    private albumService: AlbumService,
    private queueService: QueueService,
    private route: ActivatedRoute,
    private audioService: AudioService
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

  public formatTime(timeString: string): string {
    const parts = timeString.split(':');
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    const formattedSeconds = this.zeroPad(seconds);

    return `${minutes}:${formattedSeconds}`
  }

  private zeroPad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  onDoubleClickSong(index: number) {
    this.queueService.setQueue(this.songs);
    this.audioService.onStartPlaying(index);
    this.audioService.play();
  }
}
