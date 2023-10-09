import {ArtistDTO} from "../artist/artist-dto";

export interface AlbumDTO {
  id: number,
  name: string,
  dateCreated: string,
  imgUrl: string
  artists: ArtistDTO[]
}
