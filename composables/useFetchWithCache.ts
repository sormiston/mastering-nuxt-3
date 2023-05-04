import { StorageSerializers } from '@vueuse/core';

export default async <T>(url: string) => {
  const cached = useSessionStorage<T>(url, null, {
    // use object serializer
    serializer: StorageSerializers.object,
  });

  if (!cached.value) {
    const { data, error } = await useFetch<T>(url);
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not fetch data from ${url}`,
      });
    }

    // If we've made it past the error check, we know that data is defined
    // cache it in sessionStorage

    cached.value = data.value as T;
  } else {
    console.log(`Getting value from cache for ${url}`);
  }

  return cached;
};
