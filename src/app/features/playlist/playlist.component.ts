import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AudioService} from "../../core/services/audio/audio.service";
import {QueueService} from "../../core/services/queue/queue.service";
import {PlaylistService} from "../../core/services/playlist/playlist.service";
import {PlaylistDTO} from "../../core/interfaces/playlist/playlist-dto";
import {SongDTO} from "../../core/interfaces/song/song-dto";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  private playlistId!: number;
  public playlist!: PlaylistDTO;
  public songs: SongDTO[] = [];

  public playlistDetailsLoading: boolean = true;
  constructor(
    private playlistService: PlaylistService,
    private queueService: QueueService,
    private audioService: AudioService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.playlistId = params['id'];
    })

    this.playlistService.getPlaylist(this.playlistId).subscribe({
      next: (playlist: PlaylistDTO) => {
        this.playlist = playlist;
        this.playlistDetailsLoading = false;
      }
    })

    this.playlistService.getPlaylistSongs(this.playlistId).subscribe({
      next: (songs: SongDTO[]) => {
        this.songs = songs;
      }
    })
  }
}
