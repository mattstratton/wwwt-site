export interface Video {
  id: string;
  title: string;
  description: string;
  filename: string;
  thumbnail: string;
  hidden?: boolean;
}

export const videos: Video[] = [
  {
    id: 'trailer',
    title: 'When We Were Thin Trailer',
    description: 'The trailer for this whole thing',
    filename: 'trailer.mp4',
    thumbnail: '/thumbnails/trailer.jpg',
    hidden: false
  },
  // Add your other videos here following the same pattern
  {
    id: 'video1',
    title: 'The Mixer Video',
    description: 'A video made by Jay, Clint, and Matt for their senior year for a music department mixer social event',
    filename: 'mixer-main.mp4',
    thumbnail: '/thumbnails/mixer-main.jpg',
    hidden: false
  },
  {
    id: 'video2',
    title: 'The Mixer Video (commentary)',
    description: 'The Mixer Video, with commentary',
    filename: 'mixer-commentary.mp4',
    thumbnail: '/thumbnails/mixer-commentary.jpg',
    hidden: false
  },
  {
    id: 'video3',
    title: 'Prom Video',
    description: 'Willowbrook High School Prom 1993',
    filename: 'prom.mp4',
    thumbnail: '/thumbnails/prom.jpg',
    hidden: false
  },
  {
    id: 'video4',
    title: 'Clint and Conan Birthday Video',
    description: 'A video made for Clint and Conan to celebrate their birthdays',
    filename: 'clint-birthday.mp4',
    thumbnail: '/thumbnails/clint-birthday.jpg',
    hidden: false
  },
  {
    id: 'video5',
    title: 'Random Shit',
    description: 'Collection of random videos, including a very problematic skit with Clint and Buffy',
    filename: 'randoms.mp4',
    thumbnail: '/thumbnails/randoms.jpg',
    hidden: false
  },
  {
    id: 'video6',
    title: 'Jay Dancing',
    description: 'Bonus Track featuring Jay',
    filename: 'jay.mp4',
    thumbnail: '/thumbnails/placeholder.svg',
    hidden: true
  }
]; 