<template>
  <div class="max-w-2xl prose w-full h-9">
    <h1>Log in to {{ title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">
const { title } = useCourse();
const supabase = useSupabaseAuthClient();

const login = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.error(error);
  }
};
</script>
