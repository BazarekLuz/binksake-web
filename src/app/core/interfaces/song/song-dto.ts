import {ArtistDTO} from "../artist/artist-dto";
import * as moment from "moment";

export interface SongDTO {
  id: number,
  name: string,
  path: string,
  duration: moment.Duration,
  albumCoverUrl: string,
  albumId: number,
  artistDTOs: ArtistDTO[]
}
