import { LessonWithPath } from '@/types/types';

export default (chapterSlug: string, lessonSlug: string) =>
  useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );
