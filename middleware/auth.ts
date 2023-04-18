export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser();

  if (user.value || to.params.chapterSlug === "1-chapter-1") {
    return;
  } else {
    return navigateTo(`/login?redirectTo=${to.path}`);
  }
});
