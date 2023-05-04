import { getRouterParams } from 'h3';
import { Course, Chapter, Lesson, LessonWithPath } from '@/types/types';
import course from '@/server/courseData.js';

course as Course;

export default defineEventHandler((event): LessonWithPath => {
  // Using unjs/h3 utility function to get router params
  // https://www.jsdocs.io/package/h3#package-index-functions
  // alternatively, can access event.context.params;
  const { chapterSlug, lessonSlug } = getRouterParams(event);
  // alternatively, can access event.context.params;
  // const { chapterSlug, lessonSlug } = event.context.params;
  const chapter: Maybe<Chapter> = course.chapters.find(
    (chapter) => chapter.slug === chapterSlug
  );

  if (!chapter) {
    throw createError({
      statusCode: 404,
      message: 'Chapter not found',
    });
  }

  const lesson: Maybe<Lesson> = chapter.lessons.find(
    (lesson) => lesson.slug === lessonSlug
  );

  if (!lesson) {
    throw createError({
      statusCode: 404,
      message: 'Lesson not found',
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
  };
});
