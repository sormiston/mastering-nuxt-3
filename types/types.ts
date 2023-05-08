import { Lesson } from '@prisma/client';

export type LessonWithPath = Lesson & { path: string };

export {
  LessonOutline,
  ChapterOutline,
  CourseOutline,
} from '@/server/api/course/meta.get';
