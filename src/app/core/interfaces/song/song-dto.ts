import {ArtistDTO} from "../artist/artist-dto";
import * as moment from "moment";

export interface SongDTO {
  name: string,
  path: string,
  duration: moment.Duration,
  artistDTOs: ArtistDTO[],
  albumId: number,
  albumCoverUrl: string
}
