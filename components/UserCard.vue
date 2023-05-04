<template>
  <div
    v-if="user"
    class="rounded p-3 flex items-center space-x-3 bg-white"
  >
    <img
      :src="profile"
      class="rounded-full w-12 h-12 border-2 border-blue-400"
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button
        class="text-sm underline text-slate-500"
        @click="logout"
      >
        Log out
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const user = useSupabaseUser();
  const { auth } = useSupabaseAuthClient();

  const name = computed(() => {
    if (user.value) {
      return user.value.user_metadata.full_name;
    }
  });

  const profile = computed(() => {
    if (user.value) {
      return user.value.user_metadata.avatar_url;
    }
  });

  const logout = async () => {
    const { error } = await auth.signOut();
    if (error) {
      console.error(error);
    }

    await navigateTo('/');
  };
</script>
