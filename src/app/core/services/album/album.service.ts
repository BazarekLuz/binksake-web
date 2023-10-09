import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SongDTO} from "../../interfaces/song/song-dto";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {AlbumDTO} from "../../interfaces/album/album-dto";
import {ArtistDTO} from "../../interfaces/artist/artist-dto";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(
    private http: HttpClient,
  ) { }

  getAlbumSongs(albumId: number): Observable<SongDTO[]> {
    return this.http.get<SongDTO[]>(
      `${environment.apiUrl}/albums/${albumId}/songs`
    );
  }

  getAlbumDetails(albumId: number) {
    return this.http.get<AlbumDTO>(
      `${environment.apiUrl}/albums/${albumId}`
    );
  }

  getAlbumArtists(albumId: number) {
    return this.http.get<ArtistDTO[]>(
      `${environment.apiUrl}/albums/${albumId}/authors`
    );
  }

}
