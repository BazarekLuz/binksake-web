import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PlaylistService} from "../../../services/playlist/playlist.service";
import {AuthService} from "../../../services/auth/auth.service";
import {PlaylistDTO} from "../../../interfaces/playlist/playlist-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AddPlaylistDTO} from "../../../interfaces/playlist/add-playlist-dto";

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.scss']
})
export class LibraryCardComponent implements OnInit{
  addPlaylistForm = new FormGroup({
    playlistName: new FormControl('', [Validators.min(3)])
  })

  @ViewChild('op') overlayPanel!: ElementRef;
  private readonly userId!: number | null;
  public playlists: PlaylistDTO[] = [];
  constructor(
    private playlistService: PlaylistService,
    private authService: AuthService,
  ) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit() {
    if (this.userId) {
      this.playlistService.getUserPlaylists(this.userId).subscribe({
        next: (playlists: PlaylistDTO[]) => {
          this.playlists = playlists;
        }
      })
    }
  }

  onSubmit() {
    if (!this.addPlaylistForm.valid) {
      this.addPlaylistForm.markAllAsTouched();
      return;
    }
    let newPlaylist: AddPlaylistDTO = {
      ownerId: this.userId || 0,
      name: this.playlistName?.value || '',
    }

    if (newPlaylist.ownerId === 0 || newPlaylist.name === '')
      return;

    this.playlistService.createPlaylist(newPlaylist).subscribe({
      next: () => {
        this.ngOnInit();
      }
    })

  }

  get playlistName() {
    return this.addPlaylistForm.get("playlistName");
  }
}
