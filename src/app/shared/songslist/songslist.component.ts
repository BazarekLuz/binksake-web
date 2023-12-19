import {Component, Input, OnInit} from '@angular/core';
import {QueueService} from "../../core/services/queue/queue.service";
import {AudioService} from "../../core/services/audio/audio.service";
import {SongDTO} from "../../core/interfaces/song/song-dto";

@Component({
  selector: 'app-songslist',
  templateUrl: './songslist.component.html',
  styleUrls: ['./songslist.component.scss']
})
export class SongslistComponent {
  @Input()
  public songs: SongDTO[] = [];

  constructor(
  private queueService: QueueService,
  private audioService: AudioService,
  ) {}

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
}
