import {Component, OnInit} from '@angular/core';
import {AudioService} from "../../services/audio/audio.service";
import {StreamState} from "../../interfaces/stream-state/stream-state";
import {StreamService} from "../../services/stream/stream.service";
import {SliderChangeEvent, SliderSlideEndEvent} from "primeng/slider";
@Component({
  selector: 'app-bottom-component',
  templateUrl: './bottom-component.component.html',
  styleUrls: ['./bottom-component.component.scss']
})
export class BottomComponentComponent implements OnInit {

  // todo change strategy of picking audios to play
  // files: Array<any> = [];
  // currentFile: any = [];
  state!: StreamState;

  files = this.streamService.files;
  currentFile: any = []

  constructor(
    private audioService: AudioService,
    private streamService: StreamService,
  ) {
  }

  ngOnInit() {
    this.streamService.getFiles().subscribe(files => {
      this.files = files;
    })

    this.audioService.getState().subscribe(state => {
      this.state = state;
    })
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {

    })
  }

  openFile(file: any, index: number) {
    this.currentFile = {index, file};
    this.audioService.stop();
    this.playStream(file.url)
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
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
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
}
