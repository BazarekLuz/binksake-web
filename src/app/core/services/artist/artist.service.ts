import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {ArtistDTO} from "../../interfaces/artist/artist-dto";
import {AlbumDTO} from "../../interfaces/album/album-dto";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(
    private http: HttpClient,
  ) { }

  getArtist(id: number): Observable<ArtistDTO> {
    return this.http.get<ArtistDTO>(`${environment.apiUrl}/artists/${id}`)
  }

  getAlbums(id: number): Observable<AlbumDTO[]> {
    return this.http.get<AlbumDTO[]>(`${environment.apiUrl}/artists/${id}/albums`)
  }
}
