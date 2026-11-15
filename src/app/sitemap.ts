import type { MetadataRoute } from 'next';
import { SAMPLE_COURSES } from '@/data/courses';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/cursos', '/simulador', '/registro', '/login'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date('2026-11-15'),
  }));
  const courseRoutes = SAMPLE_COURSES.map((course) => ({
    url: `${SITE_URL}/cursos/${course.slug}`,
    lastModified: new Date('2026-11-15'),
  }));
  return [...staticRoutes, ...courseRoutes];
}
