import { Lesson } from "@prisma/client";

export type LessonWithPath = Lesson & { path: string };


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
