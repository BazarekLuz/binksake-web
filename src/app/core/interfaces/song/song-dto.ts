import {ArtistDTO} from "../artist/artist-dto";

export interface SongDTO {
  name: string,
  path: string,
  artistDTOs: ArtistDTO[]
}
