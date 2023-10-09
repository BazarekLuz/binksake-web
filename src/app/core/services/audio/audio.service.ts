import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import * as moment from "moment";
import {StreamState} from "../../interfaces/stream-state/stream-state";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private stop$ = new Subject();
  private audioObject = new Audio();

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
  constructor() {}

  private streamObservable(url: string) {
    return new Observable(observer => {
      this.audioObject.src = url;
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

  formatTime(time: number, format: string = "mm:ss") {
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
}
