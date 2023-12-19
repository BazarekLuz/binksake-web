import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SearchAlbumDTO} from "../../interfaces/album/search-album-dto";
import {ArtistDTO} from "../../interfaces/artist/artist-dto";
import {SongDTO} from "../../interfaces/song/song-dto";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ) { }

  findSongsByPhrase(phrase: string): Observable<SongDTO[]> {
    let params = new HttpParams();
    params = params.append('phrase', phrase);

    return this.http.get<SongDTO[]>(
      `${environment.apiUrl}/search/songs`,
      { params: params }
    )
  }

  findAlbumsByPhrase(phrase: string): Observable<SearchAlbumDTO[]> {
    let params = new HttpParams();
    params = params.append('phrase', phrase);

    return this.http.get<SearchAlbumDTO[]>(
      `${environment.apiUrl}/search/albums`,
      { params: params }
    )
  }

  findArtistsByPhrase(phrase: string): Observable<ArtistDTO[]> {
    let params = new HttpParams();
    params = params.append('phrase', phrase);

    return this.http.get<ArtistDTO[]>(
      `${environment.apiUrl}/search/artists`,
      { params: params }
    )
  }
}
