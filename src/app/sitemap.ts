import { MetadataRoute } from 'next';

const BASE = 'https://geowire.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                          lastModified: now, changeFrequency: 'hourly',  priority: 1.0 },
    { url: `${BASE}/dashboard`,           lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${BASE}/what-changed`,        lastModified: now, changeFrequency: 'hourly',  priority: 0.9 },
    { url: `${BASE}/narrative-war`,       lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/powermap`,            lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/globe`,               lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${BASE}/cost`,                lastModified: now, changeFrequency: 'hourly',  priority: 0.8 },
    { url: `${BASE}/predict`,             lastModified: now, changeFrequency: 'daily',   priority: 0.7 },
    { url: `${BASE}/analysis`,            lastModified: now, changeFrequency: 'daily',   priority: 0.7 },
    { url: `${BASE}/category/iran-war`,   lastModified: now, changeFrequency: 'hourly',  priority: 0.8 },
    { url: `${BASE}/category/energy`,     lastModified: now, changeFrequency: 'daily',   priority: 0.7 },
    { url: `${BASE}/category/us-china`,   lastModified: now, changeFrequency: 'daily',   priority: 0.6 },
    { url: `${BASE}/category/russia-ukraine`, lastModified: now, changeFrequency: 'daily', priority: 0.6 },
    { url: `${BASE}/category/markets`,    lastModified: now, changeFrequency: 'daily',   priority: 0.6 },
    { url: `${BASE}/about`,               lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];

  return staticRoutes;
}
