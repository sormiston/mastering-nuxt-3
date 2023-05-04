import { Course, Chapter, Lesson, CourseMeta } from '@/types/types';
import course from '@/server/courseData.js';

course as Course;

export default defineEventHandler((): CourseMeta => {
  return {
    title: course.title,
    chapters: course.chapters.map(
      (chapter: Chapter) => ({
        title: chapter.title,
        slug: chapter.slug,
        number: chapter.number,
        lessons: chapter.lessons.map(
          (lesson: Lesson) => ({
            title: lesson.title,
            slug: lesson.slug,
            number: lesson.number,
            path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
          })
        ),
      })
    ),
  };
});
