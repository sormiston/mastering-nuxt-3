export type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  sourceUrl?: string;
  videoId: number;
  text: string;
};
export type LessonWithPath = Lesson & { path: string };
export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[] | LessonWithPath[];
};

export type Course = {
  title: string;
  chapters: Chapter[];
};

type OutlineBase = {
  title: string;
  slug: string;
  number: number;
};

type OutlineLesson = OutlineBase & {
  path: string;
};

type OutlineChapter = OutlineBase & {
  lessons: OutlineLesson[];
};

export type CourseMeta = {
  title: string;
  chapters: OutlineChapter[];
};
