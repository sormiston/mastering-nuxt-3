export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  // if three is no user and the user is not trying to access the first chapter
  // redirect to the login page
  if (!user.value && !(to.params.chapterSlug === '1-chapter-1')) {
    return navigateTo(`/login?redirectTo=${to.path}`);
  }
});
