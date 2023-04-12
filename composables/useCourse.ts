import courseData from './courseData';

type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  sourceUrl?: string;
  videoId: number;
  text: string;
  path: string;
};

type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[];
};

type Course = {
  title: string;
  chapters: Chapter[];
};


export const useCourse = () => {
  const chapters: Chapter[] = courseData.chapters.map((chapter) => {
    const lessons: Lesson[] = chapter.lessons.map((lesson) => ({
      ...lesson,
      path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
    } as Lesson))

    return {
      ...chapter,
      lessons,
    } as Chapter
  });

  return {
    ...courseData,
    chapters 
  } as Course;
};
