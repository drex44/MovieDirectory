import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "movies",
      columns: [
        { name: "title", type: "string" },
        { name: "poster_image", type: "string" },
        { name: "genre", type: "string" },
        { name: "description", type: "string" },
        { name: "release_date_at", type: "number" }
      ]
    }),
    tableSchema({
      name: "reviews",
      columns: [
        { name: "body", type: "string" },
        { name: "movie_id", type: "string", isIndexed: true }
      ]
    })
  ]
});
