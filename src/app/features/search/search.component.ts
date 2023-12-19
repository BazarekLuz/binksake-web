import {Component, OnDestroy, OnInit} from '@angular/core';
import {LanguageService} from "../../core/services/language/language.service";
import {SearchService} from "../../core/services/search/search.service";
import {SearchAlbumDTO} from "../../core/interfaces/album/search-album-dto";
import {ArtistDTO} from "../../core/interfaces/artist/artist-dto";
import {debounceTime} from "rxjs/operators";
import {SongDTO} from "../../core/interfaces/song/song-dto";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  value: string = '';
  public foundAlbums: SearchAlbumDTO[];
  public foundSongs: SongDTO[];
  public foundArtists: ArtistDTO[];

  constructor(
    private languageService: LanguageService,
    private searchService: SearchService
  ) {
    this.foundAlbums = [];
    this.foundArtists = [];
    this.foundSongs = [];
  }

  ngOnInit() {}

  ngOnDestroy() {}

  setPlaceholderText() {
    return this.languageService.instant("search.button.placeholder");
  }

  onInputChange(phrase: string) {
    this.foundAlbums = [];
    this.foundSongs = [];
    this.foundArtists = [];
    let searchPhrase = phrase.replace(/\s/g, '');
    if (searchPhrase.length < 2) {
      return;
    }

    this.searchService.findSongsByPhrase(searchPhrase)
      .subscribe({
      next: (songs: SongDTO[]) => {
        this.foundSongs = songs;
      }
    })

    this.searchService.findAlbumsByPhrase(searchPhrase)
      .subscribe({
      next: (albums: SearchAlbumDTO[]) => {
        this.foundAlbums = albums;
      }
    })

    this.searchService.findArtistsByPhrase(searchPhrase)
      .subscribe({
      next: (artists: ArtistDTO[]) => {
        this.foundArtists = artists;
      }
    })
  }

}
