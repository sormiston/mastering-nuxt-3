import courseData from "./courseData";
import { Course, Chapter, Lesson, LessonWithPath } from "@/types/types";

export const useCourse = () => {
  const chapters: Chapter[] = courseData.chapters.map((chapter) => {
    const lessons: LessonWithPath[] = chapter.lessons.map(
      (lesson: Lesson) =>
        ({
          ...lesson,
          path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
        } as LessonWithPath)
    );

    return {
      ...chapter,
      lessons,
    } as Chapter;
  });

  return {
    ...courseData,
    chapters,
  } as Course;
};
