import { Content, Category } from '@/lib/types/streaming'

export const mockContents: Content[] = [
  {
    id: '1',
    title: 'Stranger Things',
    description: 'Quando um garoto desaparece, uma pequena cidade descobre uma mistério envolvendo experimentos secretos, forças sobrenaturais e uma estranha menina.',
    type: 'series',
    thumbnailUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    releaseYear: 2016,
    rating: '16',
    genres: ['Ficção Científica', 'Terror', 'Drama'],
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'David Harbour'],
    match: 98,
    isNew: false,
    isTrending: true,
    seasons: [
      {
        id: 's1',
        number: 1,
        year: 2016,
        episodes: [
          {
            id: 'e1',
            number: 1,
            title: 'O Desaparecimento de Will Byers',
            description: 'No caminho de volta para casa, Will é aterrorizado por algo. Mais tarde, Joyce fica preocupada.',
            duration: 48,
            thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          },
          {
            id: 'e2',
            number: 2,
            title: 'A Esquisita da Rua Maple',
            description: 'Lucas, Mike e Dustin tentam conversar com a menina que encontraram na floresta.',
            duration: 55,
            thumbnailUrl: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=225',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Breaking Bad',
    description: 'Um professor de química do ensino médio com câncer terminal se une a um ex-aluno para fabricar e vender metanfetamina.',
    type: 'series',
    thumbnailUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    releaseYear: 2008,
    rating: '18',
    genres: ['Drama', 'Crime', 'Thriller'],
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
    match: 97,
    isTrending: true
  },
  {
    id: '3',
    title: 'Inception',
    description: 'Um ladrão especializado em extrair segredos do subconsciente durante o sono é oferecido uma chance de ter sua ficha criminal limpa.',
    type: 'movie',
    thumbnailUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    duration: 148,
    releaseYear: 2010,
    rating: '14',
    genres: ['Ação', 'Ficção Científica', 'Thriller'],
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    director: 'Christopher Nolan',
    match: 95
  },
  {
    id: '4',
    title: 'The Crown',
    description: 'A história da Rainha Elizabeth II e os eventos políticos e pessoais que moldaram seu reinado.',
    type: 'series',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    releaseYear: 2016,
    rating: '16',
    genres: ['Drama', 'Biografia', 'História'],
    cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton'],
    match: 92,
    isNew: false
  },
  {
    id: '5',
    title: 'Planeta Terra II',
    description: 'David Attenborough narra uma série documental sobre a vida selvagem e maravilhas naturais do nosso planeta.',
    type: 'documentary',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    releaseYear: 2016,
    rating: 'L',
    genres: ['Documentário', 'Natureza'],
    cast: ['David Attenborough'],
    match: 99,
    isNew: false
  },
  {
    id: '6',
    title: 'Black Mirror',
    description: 'Uma antologia de ficção científica que explora o lado sombrio da tecnologia e suas consequências.',
    type: 'series',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    releaseYear: 2011,
    rating: '16',
    genres: ['Ficção Científica', 'Drama', 'Thriller'],
    cast: ['Vários'],
    match: 94,
    isTrending: true
  },
  {
    id: '7',
    title: 'The Witcher',
    description: 'Geralt de Rivia, um caçador de monstros, luta para encontrar seu lugar em um mundo onde pessoas são mais cruéis que as bestas.',
    type: 'series',
    thumbnailUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    releaseYear: 2019,
    rating: '18',
    genres: ['Fantasia', 'Drama', 'Aventura'],
    cast: ['Henry Cavill', 'Anya Chalotra', 'Freya Allan'],
    match: 91,
    isNew: true
  },
  {
    id: '8',
    title: 'Interestelar',
    description: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.',
    type: 'movie',
    thumbnailUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600',
    backdropUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1920&h=1080',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    duration: 169,
    releaseYear: 2014,
    rating: '12',
    genres: ['Ficção Científica', 'Drama', 'Aventura'],
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    match: 96
  }
]

export const categories: Category[] = [
  {
    id: 'trending',
    title: 'Em Alta',
    contents: mockContents.filter(c => c.isTrending)
  },
  {
    id: 'new',
    title: 'Novidades',
    contents: mockContents.filter(c => c.isNew)
  },
  {
    id: 'series',
    title: 'Séries',
    contents: mockContents.filter(c => c.type === 'series')
  },
  {
    id: 'movies',
    title: 'Filmes',
    contents: mockContents.filter(c => c.type === 'movie')
  },
  {
    id: 'documentaries',
    title: 'Documentários',
    contents: mockContents.filter(c => c.type === 'documentary')
  },
  {
    id: 'scifi',
    title: 'Ficção Científica',
    contents: mockContents.filter(c => c.genres.includes('Ficção Científica'))
  },
  {
    id: 'drama',
    title: 'Drama',
    contents: mockContents.filter(c => c.genres.includes('Drama'))
  }
]

export const continueWatchingContents: Content[] = [
  {
    ...mockContents[0],
    continueWatching: {
      progress: 65,
      lastWatchedAt: new Date(),
      episode: 2,
      season: 1
    }
  },
  {
    ...mockContents[2],
    continueWatching: {
      progress: 45,
      lastWatchedAt: new Date()
    }
  }
]