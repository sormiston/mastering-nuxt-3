export default async () => {
  const course = await useCourse();
  const { chapters } = course.value;
  return computed(() => chapters[0].lessons[0]);
};
