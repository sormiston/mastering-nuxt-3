import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const lessonOutlineSelect = {
  select: {
    title: true,
    slug: true,
    number: true,
  },
} satisfies Prisma.LessonArgs;

export type LessonOutline = Prisma.LessonGetPayload<
  typeof lessonOutlineSelect
> & { path: string };

const chapterOutlineSelect = {
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonOutlineSelect,
  },
} satisfies Prisma.ChapterArgs;

export type ChapterOutline = Omit<
  Prisma.ChapterGetPayload<typeof chapterOutlineSelect>,
  'lessons'
> & { lessons: LessonOutline[] };

// Uncomment me to test ChapterOutline type safety
// const foo: ChapterOutline = {
//   title: 'foo',
//   slug: 'foo',
//   number: 1,
//   lessons: [
//     {
//       title: 'foo',
//       slug: 'foo',
//       number: 1,
//       FOOpath: 'foo',
//     },
//   ],
// }

const courseOutlineSelect = {
  select: {
    title: true,
    chapters: chapterOutlineSelect,
  },
} satisfies Prisma.CourseArgs;

export type CourseOutline = Omit<
  Prisma.CourseGetPayload<typeof courseOutlineSelect>,
  'chapters'
> & { chapters: ChapterOutline[] };

export default defineEventHandler<CourseOutline>(async () => {
  const response = await prisma.course.findFirst(courseOutlineSelect);

  if (!response) {
    throw createError({
      statusCode: 404,
      statusMessage: `Course not found`,
    });
  }

  const courseOutline: CourseOutline = {
    ...response,
    chapters: response.chapters.map(
      (chapter): ChapterOutline => ({
        ...chapter,
        lessons: chapter.lessons.map(
          (lesson): LessonOutline => ({
            ...lesson,
            path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
          })
        ),
      })
    ),
  };

  return courseOutline;
});
