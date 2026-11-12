export interface Planet {
  id: string;
  name: string;
  diameter: number; // km
  distanceFromSun: number; // million km
  orbitalPeriod: number; // Earth days
  orbitalSpeed: number; // relative speed factor for animation
  color: string;
  size: number; // visual size in px
  orbitRadius: number; // visual orbit radius in px
  description: string;
  emoji: string;
}

export const planets: Planet[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    orbitalSpeed: 4.15,
    color: '#b5b5b5',
    size: 8,
    orbitRadius: 70,
    description: 'The smallest planet and closest to the Sun. Mercury has no atmosphere and experiences extreme temperature changes.',
    emoji: '☿',
  },
  {
    id: 'venus',
    name: 'Venus',
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    orbitalSpeed: 1.62,
    color: '#e8cda0',
    size: 14,
    orbitRadius: 105,
    description: 'The hottest planet due to its thick atmosphere. Venus rotates in the opposite direction to most planets.',
    emoji: '♀',
  },
  {
    id: 'earth',
    name: 'Earth',
    diameter: 12756,
    distanceFromSun: 149.6,
    orbitalPeriod: 365,
    orbitalSpeed: 1.0,
    color: '#4da6ff',
    size: 15,
    orbitRadius: 145,
    description: 'Our home planet — the only known world with liquid water on its surface and life. It has one natural satellite: the Moon.',
    emoji: '🌍',
  },
  {
    id: 'mars',
    name: 'Mars',
    diameter: 6792,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    orbitalSpeed: 0.53,
    color: '#e27b58',
    size: 11,
    orbitRadius: 185,
    description: 'The Red Planet, named for its iron oxide surface. Mars has the tallest volcano (Olympus Mons) in the Solar System.',
    emoji: '♂',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    diameter: 142984,
    distanceFromSun: 778.6,
    orbitalPeriod: 4333,
    orbitalSpeed: 0.084,
    color: '#c88b3a',
    size: 32,
    orbitRadius: 245,
    description: 'The largest planet in our Solar System. Jupiter is a gas giant with a famous Great Red Spot storm that has raged for centuries.',
    emoji: '♃',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    diameter: 120536,
    distanceFromSun: 1433.5,
    orbitalPeriod: 10759,
    orbitalSpeed: 0.034,
    color: '#e8d590',
    size: 27,
    orbitRadius: 310,
    description: 'Known for its spectacular ring system made of ice and rock. Saturn is the least dense planet — it could float in water!',
    emoji: '♄',
  },
  {
    id: 'uranus',
    name: 'Uranus',
    diameter: 51118,
    distanceFromSun: 2872.5,
    orbitalPeriod: 30687,
    orbitalSpeed: 0.012,
    color: '#7de8e8',
    size: 20,
    orbitRadius: 370,
    description: 'An ice giant that rotates on its side. Uranus has a blue-green color due to methane in its atmosphere.',
    emoji: '♅',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    diameter: 49528,
    distanceFromSun: 4495.1,
    orbitalPeriod: 60190,
    orbitalSpeed: 0.006,
    color: '#4166f5',
    size: 19,
    orbitRadius: 420,
    description: 'The windiest planet with speeds up to 2,100 km/h. Neptune is the farthest planet from the Sun.',
    emoji: '♆',
  },
];
