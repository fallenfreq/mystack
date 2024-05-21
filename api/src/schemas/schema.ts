// https://orm.drizzle.team/docs/column-types/pg
import { integer, text, pgTable, serial, varchar, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const users = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  name: text('name'),
  email: varchar('email', { length: 256 }).notNull()
})

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.userId],
    references: [profiles.userId]
  }),
  posts: many(posts)
}))

export const posts = pgTable('posts', {
  postId: serial('post_id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  body: text('body').notNull(),
  slug: varchar('title', { length: 40 }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.userId)
})

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.userId]
  }),
  postCatagories: many(catagoriesPosts)
}))

export const catagories = pgTable('catagories', {
  catagoryId: serial('catagory_id').primaryKey(),
  catagory: varchar('catagory', { length: 40 }).notNull()
})

export const catagoryRelations = relations(catagories, ({ many }) => ({
  catagoryPosts: many(catagoriesPosts)
}))

export const catagoriesPosts = pgTable(
  'catagories_posts',
  {
    catagoryId: integer('catagory_id')
      .notNull()
      .references(() => catagories.catagoryId),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.postId)
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.catagoryId] })
  })
)

export const catagoriesPostsRelations = relations(catagoriesPosts, ({ one }) => ({
  postCatagories: one(catagories, {
    fields: [catagoriesPosts.catagoryId],
    references: [catagories.catagoryId]
  }),
  catagoryPosts: one(posts, {
    fields: [catagoriesPosts.postId],
    references: [posts.postId]
  })
}))

export const profiles = pgTable('profiles', {
  profileId: serial('id').primaryKey(),
  bio: varchar('bio', { length: 256 }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.userId)
})

export type User = typeof users.$inferSelect // return type when queried
export type NewUser = typeof users.$inferInsert // insert type

export type Post = typeof users.$inferSelect // return type when queried
export type NewPost = typeof users.$inferInsert // insert type
