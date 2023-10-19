import {Component, OnDestroy, OnInit} from '@angular/core';
import {AudioService} from "../../services/audio/audio.service";
import {StreamState} from "../../interfaces/stream-state/stream-state";
import {SliderChangeEvent, SliderSlideEndEvent} from "primeng/slider";
import {SongDTO} from "../../interfaces/song/song-dto";
import {QueueService} from "../../services/queue/queue.service";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-bottom-component',
  templateUrl: './bottom-component.component.html',
  styleUrls: ['./bottom-component.component.scss']
})
export class BottomComponentComponent implements OnInit, OnDestroy {
  state!: StreamState;
  volume: number = this.audioService.volume

  files: SongDTO[] = [];
  currentFile?: SongDTO;
  currentFileIndex: number = 0;

  volumeIconHigh: string = "pi pi-volume-up";
  volumeIconLow: string = "pi pi-volume-down";
  volumeIconOff: string = "pi pi-volume-off";

  constructor(
    private audioService: AudioService,
    private queueService: QueueService,
  ) {}

  ngOnInit() {
    this.queueService.queueObservable.subscribe((files: SongDTO[]) => {
      this.files = files;
    })

    this.audioService.getState().subscribe(state => {
      this.state = state;
    })

    this.audioService.startPlaying.subscribe((index: number) => {
      if (index !== undefined) {
        this.openFile(index);
        this.play();
      }
    })
  }

  ngOnDestroy() {
    this.audioService.ngOnDestroy();
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe({})
  }

  openFile(index: number) {
    this.currentFileIndex = index;
    this.currentFile = this.files[this.currentFileIndex];
    this.playStream(this.currentFile.path);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  previous() {
    if (this.currentFileIndex !== 0) {
      this.currentFileIndex -= 1;
    }
    this.audioService.setCurrentFileIndex(this.currentFileIndex)

    this.openFile(this.currentFileIndex);
  }

  next() {
    if (this.currentFileIndex !== this.files.length - 1) {
      this.currentFileIndex += 1;
    }
    this.audioService.setCurrentFileIndex(this.currentFileIndex)

    this.openFile(this.currentFileIndex);
  }

  disableBackForwardButton() {
    return this.currentFile === undefined;
  }

  onSliderChangeEnd(change: SliderSlideEndEvent) {
    if (change.value === undefined){
      return;
    }
    this.audioService.seekTo(change.value);
  }

  onSliderValueChange(change: SliderChangeEvent) {
    if (change.value === undefined) {
      return;
    }
    this.audioService.seekTo(change.value);
  }

  setVolumeIcon() {
    if (this.audioService.volume === 0) {
      return this.volumeIconOff;
    } else if (this.audioService.volume > 0 && this.audioService.volume <= 0.5) {
      return this.volumeIconLow;
    } else {
      return this.volumeIconHigh;
    }
  }

  onVolumeChange(change: SliderChangeEvent) {
    if (change.value === undefined) {
      return;
    }
    this.audioService.volume = change.value;
  }

  toggleMuted() {
    this.audioService.muted = !this.audioService.muted;
  }

  setCurrentSongAlbumCover() {
    if (this.currentFile?.albumCoverUrl !== undefined)
      return `${environment.imgPath}/${this.currentFile.albumCoverUrl}`
    return;
  }

  setAlbumLink() {
    if (this.currentFile !== undefined)
      return `albums/${this.currentFile.albumId}`
    return;
  }

  setArtistLink(id: number) {
    if (this.currentFile !== undefined)
      return `artists/${id}`
    return;
  }
}
