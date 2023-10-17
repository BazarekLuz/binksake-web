import {EventEmitter, Injectable, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import * as moment from "moment";
import {StreamState} from "../../interfaces/stream-state/stream-state";
import {environment} from "../../../../environments/environment";
import {SongDTO} from "../../interfaces/song/song-dto";
import {QueueService} from "../queue/queue.service";

@Injectable({
  providedIn: 'root'
})
export class AudioService implements OnDestroy {
  @Output() startPlaying = new EventEmitter();

  private stop$ = new Subject();
  private audioObject: HTMLAudioElement = new Audio();

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  }
  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject<StreamState>(this.state)
  private currentFileIndex: number = 0;

  constructor() {
    this.audioObject.volume = 0.5;
  }

  ngOnDestroy() {
    this.stop();
  }

  private streamObservable(url: string) {
    return new Observable(observer => {
      this.audioObject.src = `${environment.musicFilesUrl}/${url}`;
      this.audioObject.load();
      this.audioObject.play().then();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next();
      }

      this.addEvents(this.audioObject, this.audioEvents, handler);
      return () => {
        this.audioObject.pause();
        this.audioObject.currentTime = 0;

        this.removeEvents(this.audioObject, this.audioEvents, handler);
        this.resetState()
      };
    });
  }

  private addEvents(object: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      object.addEventListener(event, handler);
    });
  }

  private removeEvents(object: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      object.removeEventListener(event, handler);
    });
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObject.play().then();
  }

  stop() {
    this.stop$.next(null);
  }

  pause() {
    this.audioObject.pause();
  }

  seekTo(seconds: number) {
    this.audioObject.currentTime = seconds;
  }

  formatTime(time: number, format: string = "m:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObject.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObject.currentTime;
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'ended':
        this.stop();
        this.onStartPlaying(this.currentFileIndex + 1);
        this.state.playing = false;
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  getState():Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  onStartPlaying(index: number) {
    this.currentFileIndex = index;
    this.startPlaying.emit(index);
  }

  public get volume() {
    return this.audioObject.volume;
  }

  public set volume(volume: number) {
    this.audioObject.volume = volume;
  }

  public set muted(muted: boolean) {
    this.audioObject.muted = muted;
  }

  public get muted() {
    return this.audioObject.muted;
  }

  public setCurrentFileIndex(index: number) {
    this.currentFileIndex = index;
  }
}
