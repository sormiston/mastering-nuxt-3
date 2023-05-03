import { StorageSerializers } from "@vueuse/core";
import { LessonWithPath } from "@/types/types";

export default async (chapterSlug: string, lessonSlug: string) => {
  const url = `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`;
  const lesson = useSessionStorage<LessonWithPath>(url, null, {
    // use object serializer
    serializer: StorageSerializers.object,
  });

  if (!lesson.value) {
    // lesson not in cache, fetch it
    const { data, error } = await useLazyFetch<LessonWithPath>(url);

    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
      });
    }

    // If we've made it past the error check, we know that data is defined
    // cache it in sessionStorage

    lesson.value = data.value as LessonWithPath;
  } else {
    console.log(
      `Getting lesson ${lessonSlug} in chapter ${chapterSlug} from cache.`
    );
  }

  return lesson;
};
