import { PrismaClient } from '@prisma/client';
import { CourseMeta } from '@/types/types';

const prisma = new PrismaClient();

export default defineEventHandler<CourseMeta>(async () => {
  const response = await prisma.course.findFirst({
    select: {
      title: true,
      chapters: {
        select: {
          title: true,
          slug: true,
          number: true,
          lessons: {
            select: {
              title: true,
              slug: true,
              number: true,
            },
          },
        },
      },
    },
  });

  if (!response) {
    throw createError({
      statusCode: 404,
      statusMessage: `Course not found`,
    });
  }

  const courseMeta: CourseMeta = {
    ...response,
    chapters: response.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    })),
  };
  
  return courseMeta;
});
