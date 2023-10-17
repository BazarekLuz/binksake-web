import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SongDTO} from "../../interfaces/song/song-dto";

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private queueSubject = new BehaviorSubject<SongDTO[]>([]);
  queueObservable = this.queueSubject.asObservable();

  constructor() {}

  setQueue(songs: SongDTO[]) {
    this.queueSubject.next(songs);
  }

}
