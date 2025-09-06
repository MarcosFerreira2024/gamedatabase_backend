import z from "zod";

const searchSchema = z.object({
  name: z.string().optional(),
  genres: z.string().optional(),
  platforms: z.string().optional(),
  summary: z.string().optional(),
  franchises: z.string().optional(),
  modes: z.string().optional(),
  developers: z.string().optional(),
  publishers: z.string().optional(),
  usersScore: z.string().optional(),
  themes: z.string().optional(),
  playerPerspectives: z.string().optional(),
  first_release_date: z.string().optional(),
  gameEngines: z.string().optional(),
  collections: z.string().optional(),

  sortBy: z.string().optional(),
  order: z
    .enum(["asc", "desc"])
    .optional()
    .default("desc")
    .transform((val) => val ?? "desc"),

  take: z
    .string()
    .optional()
    .transform((val) => {
      const n = Number(val ?? 20);
      if (n <= 20) return 20;
      if (n >= 60) return 60;
      return 40;
    }),
  page: z
    .string()
    .optional()
    .transform((value) => {
      const number = Number(value ?? 1);
      return number <= 0 ? 1 : number;
    }),
});

type SearchSchema = z.infer<typeof searchSchema>;
export { searchSchema, SearchSchema };
