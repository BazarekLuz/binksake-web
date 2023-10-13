import {Component, OnInit} from '@angular/core';
import {AudioService} from "../../services/audio/audio.service";
import {StreamState} from "../../interfaces/stream-state/stream-state";
import {StreamService} from "../../services/stream/stream.service";
import {SliderChangeEvent, SliderSlideEndEvent} from "primeng/slider";
import {SongDTO} from "../../interfaces/song/song-dto";
@Component({
  selector: 'app-bottom-component',
  templateUrl: './bottom-component.component.html',
  styleUrls: ['./bottom-component.component.scss']
})
export class BottomComponentComponent implements OnInit {
  // todo change strategy of picking audios to play
  state!: StreamState;
  volume: number = this.audioService.volume

  files: SongDTO[] = []
  currentFile: any = []
  currentFileIndex: number = 0;

  volumeIconHigh: string = "pi pi-volume-up";
  volumeIconLow: string = "pi pi-volume-down";
  volumeIconOff: string = "pi pi-volume-off";

  constructor(
    private audioService: AudioService,
    private streamService: StreamService,
  ) {}

  ngOnInit() {
    this.streamService.files$.subscribe((files: SongDTO[]) => {
      this.files = files;
    })

    this.audioService.getState().subscribe(state => {
      this.state = state;
    })

    this.audioService.startPlaying.subscribe((index: number) => {
      if (index !== undefined) {
        this.openFile(index);
      }
    })
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {})
  }

  openFile(index: number) {
    this.currentFileIndex = index;
    this.currentFile = this.files[this.currentFileIndex];
    this.audioService.stop();
    this.playStream(this.currentFile.path);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  previous() {
    if (this.currentFileIndex !== 0) {
      this.currentFileIndex -= 1;
    }
    this.openFile(this.currentFileIndex);
  }

  next() {
    if (this.currentFileIndex !== this.files.length - 1) {
      this.currentFileIndex += 1;
    }

    this.openFile(this.currentFileIndex);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
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
    } else if ((this.audioService.volume <= 50) && (this.audioService.volume > 0)) {
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
}
