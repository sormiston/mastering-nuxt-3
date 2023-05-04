<template>
  <div class="max-w-2xl prose w-full h-9">
    <h1>Log in to {{ course.title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
  const course = await useCourse();
  const { query } = useRoute();
  const user = useSupabaseUser();
  const { auth } = useSupabaseAuthClient();

  // add watch effect to redirect to /course if user is logged in
  watchEffect(async () => {
    if (user.value && query.redirectTo) {
      await navigateTo(query.redirectTo as string, { replace: true });
    }
  });

  const login = async () => {
    const redirectTo = `${window.location.origin}${query.redirectTo}`;
    const { error } = await auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo },
    });

    if (error) {
      console.error(error);
    }
  };
</script>
