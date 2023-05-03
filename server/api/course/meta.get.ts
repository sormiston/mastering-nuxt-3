import { Course, Chapter, Lesson } from "@/types/types";
import course from "@/server/courseData.js";

course as Course;

type OutlineBase = {
  title: string;
  slug: string;
  number: number;
};

type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[];
};

type OutlineLesson = OutlineBase & {
  path: string;
};

type CourseMeta = {
  title: string;
  chapters: OutlineChapter[];
};

export default defineEventHandler((event): CourseMeta => {
  return {
    title: course.title,
    chapters: course.chapters.map(
      (chapter: Chapter): OutlineChapter => ({
        title: chapter.title,
        slug: chapter.slug,
        number: chapter.number,
        lessons: chapter.lessons.map(
          (lesson: Lesson): OutlineLesson => ({
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
