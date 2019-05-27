import { Model } from "@nozbe/watermelondb";
import { field, date, children } from "@nozbe/watermelondb/decorators";

export default class Movie extends Model {
  static table = "movies";

  static associations = {
    reviews: { type: "has_many", foreignKey: "movie_id" }
  };

  @field("title") title;
  @field("poster_image") posterImage;
  @field("genre") genre;
  @field("description") description;

  @date("release_date_at") releaseDateAt;

  @children("reviews") reviews;

}
