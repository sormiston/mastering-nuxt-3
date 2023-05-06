import { getRouterParams } from 'h3';
import { PrismaClient } from '@prisma/client';
import { LessonWithPath } from '@/types/types';

// instantiate prisma client outside of the event handler!
const prisma = new PrismaClient();

export default defineEventHandler<LessonWithPath>(async (event) => {
  // Using unjs/h3 utility function to get router params
  // https://www.jsdocs.io/package/h3#package-index-functions
  // alternatively, can access event.context.params;
  const { chapterSlug, lessonSlug } = getRouterParams(event);
  // alternatively, can access event.context.params;
  // const { chapterSlug, lessonSlug } = event.context.params;

  const chapterAndLesson = await prisma.chapter.findUnique({
    where: {
      slug: chapterSlug,
    },
    include: {
      lessons: {
        where: { slug: lessonSlug },
      },
    },
  });

  if (!chapterAndLesson) {
    throw createError({
      statusCode: 404,
      statusMessage: `provided Chapter "${chapterSlug}" not found`,
    });
  }

  if (chapterAndLesson.lessons.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: `provided Lesson "${lessonSlug}" not found in chapter ${chapterSlug}`,
    });
  }

  const lessonWithPath: LessonWithPath = {
    ...chapterAndLesson?.lessons[0],
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };

  return lessonWithPath;
});
