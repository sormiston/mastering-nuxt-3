import { CourseOutline } from '@/types/types';

export default () => useFetchWithCache<CourseOutline>('/api/course/meta');
