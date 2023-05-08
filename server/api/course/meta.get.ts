import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonSelect = {
  select: {
    title: true,
    slug: true,
    number: true,
  },
};
// export type LessonOutline = Prisma.LessonGetPayload<
//   typeof lessonSelect
// > & {
//   path: string;
// };

const chapterSelect = {
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect,
  },
};
// export type ChapterOutline = Omit<
//   Prisma.ChapterGetPayload<typeof chapterSelect>,
//   "lessons"
// > & {
//   lessons: LessonOutline[];
// };

const courseSelect = {
  select: {
    title: true,
    chapters: chapterSelect,
  },
}
// export type CourseOutline = Omit<
//   Prisma.CourseGetPayload<typeof courseSelect>,
//   "chapters"
// > & {
//   chapters: ChapterOutline[];
// };

export default defineEventHandler(async () => {
  const outline = await prisma.course.findFirst(courseSelect);

  // Error if there is no course
  if (!outline) {
    throw createError({
      statusCode: 404,
      statusMessage: "Course not found",
    });
  }

  // Map the outline so we can add a path to each lesson
  const chapters = outline.chapters.map((chapter) => ({
    ...chapter,
    lessons: chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    })),
  }));

  return {
    ...outline,
    chapters,
  };
});
