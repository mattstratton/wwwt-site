export interface Video {
  id: string;
  title: string;
  description: string;
  filename: string;
}

export const videos: Video[] = [
  {
    id: 'trailer',
    title: 'When We Were Thin Trailer',
    description: 'A silly trailer',
    filename: 'trailer.mp4'
  },
  // Add your other videos here following the same pattern
  {
    id: 'video1',
    title: 'The Mixer Video',
    description: 'First episode of the series',
    filename: 'mixer-main.mp4'
  },
  {
    id: 'video2',
    title: 'The Mixer Video (commentary)',
    description: 'The Mixer Video, with commentary',
    filename: 'mixer-commentary.mp4'
  },
  {
    id: 'video3',
    title: 'Promo Video',
    description: 'Third episode of the series',
    filename: 'prom.mp4'
  },
  {
    id: 'video4',
    title: 'Birthday Video',
    description: 'Fourth episode of the series',
    filename: 'clint-birthday.mp4'
  },
  {
    id: 'video5',
    title: 'Random Shit',
    description: 'Fifth episode of the series',
    filename: 'randoms.mp4'
  },
  {
    id: 'video6',
    title: 'Jay Dancing',
    description: 'Sixth episode of the series',
    filename: 'jay.mp4'
  }
]; 