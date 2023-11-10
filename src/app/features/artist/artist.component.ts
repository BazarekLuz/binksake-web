import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtistService} from "../../core/services/artist/artist.service";
import {ActivatedRoute} from "@angular/router";
import {ArtistDTO} from "../../core/interfaces/artist/artist-dto";
import {environment} from "../../../environments/environment";
import {AlbumDTO} from "../../core/interfaces/album/album-dto";
import {BehaviorSubject, Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  private artistId!: number

  public artist!: ArtistDTO
  public artistImageUrl: string = '';
  public artistLoading: boolean = true;

  public albums: AlbumDTO[] = [];
  public albumsLoading: boolean = true;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.artistId = params['id'];
    })

    this.artistService.getArtist(this.artistId).subscribe({
      next: (artist: ArtistDTO) => {
        this.artist = artist;
        this.artistImageUrl = `${environment.imgPath}/${this.artist.imgUrl}`;
        this.artistLoading = false;
      }
    })

    this.artistService.getAlbums(this.artistId).subscribe({
      next: (albums: AlbumDTO[]) => {
        this.albums = albums;
      },
      complete: () => {
        this.albumsLoading = false;
      }
    })
  }

  albumName(album: AlbumDTO) {
    return album.name;
  }

  imgUrl(album: AlbumDTO) {
    return album.imgUrl;
  }

  year(album: AlbumDTO) {
    return album.dateCreated.substring(0, 4);
  }
}
