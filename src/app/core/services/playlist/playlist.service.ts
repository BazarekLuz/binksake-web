import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {PlaylistDTO} from "../../interfaces/playlist/playlist-dto";
import {environment} from "../../../../environments/environment";
import {AddPlaylistDTO} from "../../interfaces/playlist/add-playlist-dto";
import {SongDTO} from "../../interfaces/song/song-dto";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(
    private http: HttpClient,
  ) {}

  getUserPlaylists(ownerId: number) {
    let params = new HttpParams();
    params = params.append('ownerId', ownerId);
    return this.http.get<PlaylistDTO[]>(
      `${environment.apiUrl}/playlists`,
      { params: params }
    );
  }

  createPlaylist(playlist: AddPlaylistDTO) {
    return this.http.post<AddPlaylistDTO>(
      `${environment.apiUrl}/playlists/create`,
      playlist
    )
  }

  getPlaylist(id: number) {
    return this.http.get<PlaylistDTO>(`${environment.apiUrl}/playlists/${id}`)
  }

  getPlaylistSongs(id: number) {
    return this.http.get<SongDTO[]>(`${environment.apiUrl}/playlists/${id}/songs`)
  }

  addSongToPlaylist(playlistId: number, songId: number) {
    let params = new HttpParams()
      .set('playlistId', playlistId)
      .set('songId', songId)

    return this.http.patch(`${environment.apiUrl}/playlists/update`,
      null,
      { params: params }
    )
  }

  removeSongFromPlaylist(playlistId: number, songId: number) {
    let params = new HttpParams()
      .set('playlistId', playlistId)
      .set('songId', songId)
    return this.http.delete(`${environment.apiUrl}/playlists/remove-song`,
      { params: params }
      )
  }

  removePlaylist(id: number) {
    let params = new HttpParams()
      .set('playlistId', id)
    return this.http.delete(`${environment.apiUrl}/playlists/remove`,
      { params: params }
    )
  }
}
