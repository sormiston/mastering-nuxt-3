// TODO: test me
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";

export default {
  scrollBehavior: function (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded
  ) {
    // intercept the scroll behavior when the user navigates between routes with lesson slugs
    if (
      Object.keys(from.params).includes("lessonSlug") &&
      Object.keys(to.params).includes("lessonSlug")
    ) {
      return;

      // else restore expected behavior
    } else return { top: 0, left: 0 };
  },
};
