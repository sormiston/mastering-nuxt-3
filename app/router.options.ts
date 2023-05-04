// TODO: test me
import type {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router';

export default {
  scrollBehavior: function (
    to: RouteLocationNormalized,
    from: RouteLocationNormalizedLoaded
  ) {
    // do no scrolling when the user navigates between lessons
    if (
      Object.keys(from.params).includes('lessonSlug') &&
      Object.keys(to.params).includes('lessonSlug')
    ) {
      return false;
      // else scroll to the top of the page
    } else { return { top: 0, left: 0 }; }
  },
};
