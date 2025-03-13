import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Genre: a
    .model({
      id: a.string().required(),
      name: a.string().required(),
      slug: a.string().required(),
      games_count: a.integer().required(),
      image_background: a.string().required(),
      games: a.hasMany("Game", "genreId"),
    })
    .authorization((allow) => [allow.guest()]),

  Game: a
    .model({
      id: a.string().required(),
      slug: a.string().required(),
      name: a.string().required(),
      added: a.integer().required(),
      genreId: a.string().required(),
      genre: a.belongsTo("Genre", "genreId"),
    })
    .authorization((allow) => [allow.guest()]),

  PlatformFamily: a
    .model({
      id: a.string().required(),
      name: a.string().required(),
      slug: a.string().required(),
      platforms: a.hasMany("Platform", "platformFamilyId"),
    })
    .authorization((allow) => [allow.guest()]),

  Platform: a
    .model({
      id: a.string().required(),
      name: a.string().required(),
      slug: a.string().required(),
      games_count: a.integer().required(),
      image_background: a.string().required(),
      image: a.string(),
      year_start: a.integer(),
      year_end: a.integer(),
      platformFamilyId: a.string().required(),
      platformFamily: a.belongsTo("PlatformFamily", "platformFamilyId"),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "iam",
    apiKeyAuthorizationMode: {
      expiresInDays: 7,
    },
  },
});
