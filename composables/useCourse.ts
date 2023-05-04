import { CourseMeta } from '@/types/types';

export default () => useFetchWithCache<CourseMeta>('/api/course/meta');
