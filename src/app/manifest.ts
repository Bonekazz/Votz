import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Votz',
    short_name: 'Votz',
    description: 'App para formar times balanceados',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'icons/icon-192x192.jpg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512x512.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
