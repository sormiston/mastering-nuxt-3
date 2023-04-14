export const useFirstLesson = () => {
  const { chapters } = useCourse();
  return computed(() => chapters[0].lessons[0])
}
