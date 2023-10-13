import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SongDTO} from "../../interfaces/song/song-dto";

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private filesSubject = new BehaviorSubject<SongDTO[]>([]);
  files$ = this.filesSubject.asObservable();

  setFiles(songs: SongDTO[]) {
    this.filesSubject.next(songs);
  }


}
