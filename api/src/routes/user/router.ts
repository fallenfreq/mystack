import { publicProcedure, router } from '../../config/trpc.js'
import { db } from '../../config/db.js'
import { users, posts, profiles, catagories, catagoriesPosts } from '../../schemas/schema.js'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

// https://www.youtube.com/watch?v=R4ZgTB-1wEg&list=PLhnVDNT5zYN8PLdYddaU3jiZXeOyehhoU&index=4&ab_channel=SakuraDev

const postValidator = z.object({
  title: z.string(),
  body: z.string(),
  slug: z.string()
})

const profileValidator = z.object({
  bio: z.string()
})

const userValidator = z.object({
  name: z.union([z.string(), z.null()]),
  email: z.string().email('This is not a valid email.'),
  posts: postValidator.optional(),
  profile: profileValidator.optional()
  // profile: z.object({ create: profileValidator }).optional()
})

// using this on posts because zod can not distinguish between
// undefined and the property not being there at all
// const data = {
//   ...(sentPosts && { posts: sentPosts }),
//   ...(sentProfile && { profile: sentProfile }),
//   ...rest
// }

const userRouter = router({
  insert: publicProcedure.input(userValidator).mutation(async ({ input }) => {
    const { profile: sentProfile, posts: sentPosts, ...userData } = input

    const newUser = await db
      .insert(users)
      .values(userData)
      .returning({ user_id: users.userId, name: users.name })

    if (!newUser[0]) throw 'did not return a user id'

    const newUserId = newUser[0].user_id

    if (sentProfile)
      await db
        .insert(profiles)
        .values({
          userId: newUserId,
          ...sentProfile
        })
        .execute()

    if (sentPosts)
      await db
        .insert(posts)
        .values({
          userId: newUserId,
          ...sentPosts
        })
        .execute()

    // -------------- finding

    const allUsersQ = db.query.users.findMany({
      with: {
        posts: true,
        profile: true
      }
    })

    const allUsersSQL = await db
      .select()
      .from(users)
      .innerJoin(profiles, eq(users.userId, profiles.userId))
      .leftJoin(posts, eq(users.userId, posts.userId))

    const userSQL = await db.select().from(users).where(eq(users.userId, newUserId))

    const userQ = await db.query.users.findFirst({
      where: eq(users.userId, newUserId)
    })

    console.dir({ userSQL, userQ, allUsersQ, allUsersSQL, newUser }, { depth: null })

    return 'echo back: ' + input
  }),

  select: publicProcedure
    .input(z.object({ user_id: z.string() }))
    .query(async ({ input: { user_id } }) => {
      // with lets you select relations set in schemas
      // columns selects which own colums
      const postsJunctionSQL = await db.query.posts.findFirst({
        with: {
          author: true,
          postCatagories: {
            columns: {
              postId: false,
              catagoryId: false
            },
            with: {
              postCatagories: {
                columns: {
                  catagoryId: true,
                  catagory: true
                }
              }
            }
          }
        }
      })

      const postsJunctionQ = await db
        .select()
        .from(posts)
        .innerJoin(catagoriesPosts, eq(posts.postId, catagoriesPosts.postId))
        .innerJoin(catagories, eq(catagoriesPosts.catagoryId, catagories.catagoryId))

      console.log({ postsJunctionSQL, postsJunctionQ })

      return await db
        .select()
        .from(users)
        .where(eq(users.userId, Number(user_id)))
    })
})

export { userRouter }
