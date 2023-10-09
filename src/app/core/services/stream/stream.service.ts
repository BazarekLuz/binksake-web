import { Injectable } from '@angular/core';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  files = [
    {
      url: "http://localhost:8080/music-upload/fosterthepeople/supermodel/TabloidSuperJunkie.mp3",
      name: "Tabloid Super Junkie",
      artist: "Foster The People",
    },
    {
      url: "http://localhost:8080/music-upload/fosterthepeople/supermodel/BestFriend.mp3",
      name: "Best Friend",
      artist: "Foster The People",
    },
    {
      url: "http://localhost:8080/music-upload/fosterthepeople/supermodel/ComingOfAge.mp3",
      name: "Coming Of Age",
      artist: "Foster The People",
    },
  ]

  getFiles() {
    return of(this.files);
  }
}
