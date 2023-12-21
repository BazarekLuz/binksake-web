import {Component, Input, OnInit} from '@angular/core';
import {QueueService} from "../../core/services/queue/queue.service";
import {AudioService} from "../../core/services/audio/audio.service";
import {SongDTO} from "../../core/interfaces/song/song-dto";
import {PlaylistService} from "../../core/services/playlist/playlist.service";
import {AuthService} from "../../core/services/auth/auth.service";
import {PlaylistDTO} from "../../core/interfaces/playlist/playlist-dto";

@Component({
  selector: 'app-songslist',
  templateUrl: './songslist.component.html',
  styleUrls: ['./songslist.component.scss']
})
export class SongslistComponent implements OnInit {
  @Input() public songs: SongDTO[] = [];
  @Input() public playlistId: number | null = null;
  public playlists: PlaylistDTO[] = [];

  constructor(
  private queueService: QueueService,
  private audioService: AudioService,
  private playlistService: PlaylistService,
  private authService: AuthService,
  ) {}

  ngOnInit() {
    let id = this.authService.getUserId()
    if (id) {
      this.playlistService.getUserPlaylists(id).subscribe({
        next: (playlists: PlaylistDTO[]) => {
          this.playlists = playlists;
        }
      })
    }
  }

  private zeroPad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  onDoubleClickSong(index: number) {
    this.queueService.setQueue(this.songs);
    this.audioService.onStartPlaying(index);
    this.audioService.play();
  }

  public formatTime(timeString: string): string {
    const parts = timeString.split(':');
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    const formattedSeconds = this.zeroPad(seconds);

    return `${minutes}:${formattedSeconds}`
  }

  addSong(playlistId: number, songId: number) {
    this.playlistService.addSongToPlaylist(playlistId, songId).subscribe({
      next: () => {}
    })
  }

  removeSong(playlistId: number, songId: number) {
    this.playlistService.removeSongFromPlaylist(playlistId, songId).subscribe({
      next: () => {
        this.ngOnInit();
      }
    })
  }
}
