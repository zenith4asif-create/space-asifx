import { VIDEO_SOURCES } from './videoConfig';

export interface PlanetData {
  id: string;
  order: number;
  name: string;
  tagline: string;
  classification: string;
  videoKey: keyof typeof VIDEO_SOURCES;
  distanceKm: string;
  distanceAU: string;
  diameterKm: string;
  diameterRelative: string;
  orbitPeriod: string;
  rotationPeriod: string;
  meanTemperature: string;
  surfaceTempRange: string;
  atmosphere: string;
  atmosphereComposition: { name: string; percentage: number }[];
  moons: number;
  notableMoons: string[];
  gravity: string;
  axialTilt: string;
  overview: string;
  geology: string;
  scientificFacts: string[];
  keyMissions: string[];
  accentColor: string;
}

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    order: 1,
    name: 'Mercury',
    tagline: 'THE SWIFT WORLD',
    classification: 'Terrestrial Planet',
    videoKey: 'mercury',
    distanceKm: '57.9M km',
    distanceAU: '0.387 AU',
    diameterKm: '4,879 km',
    diameterRelative: '0.38x Earth',
    orbitPeriod: '87.97 days',
    rotationPeriod: '58.65 days',
    meanTemperature: '167°C',
    surfaceTempRange: '-180°C to 430°C',
    atmosphere: 'Ultra-thin Exosphere',
    atmosphereComposition: [
      { name: 'Oxygen (O2)', percentage: 42 },
      { name: 'Sodium (Na)', percentage: 29 },
      { name: 'Hydrogen (H2)', percentage: 22 },
      { name: 'Helium (He)', percentage: 6 },
      { name: 'Potassium (K)', percentage: 1 }
    ],
    moons: 0,
    notableMoons: [],
    gravity: '3.7 m/s² (0.38g)',
    axialTilt: '0.034°',
    overview: 'The innermost planet of our Solar System, Mercury speeds around the Sun in just 88 Earth days. Scarred by ancient asteroid impacts, its surface experiences the most extreme temperature swings in the Solar System.',
    geology: 'Dominated by an enormous iron-nickel core making up nearly 85% of its radius, Mercury features vast cratered basalt plains and towering compression scarps formed as the planet cooled and shrank.',
    scientificFacts: [
      'Experiences a 3:2 spin-orbit resonance: rotating three times on its axis for every two solar orbits.',
      'Radar observations detected water ice permanently trapped inside deep polar craters shielded from sunlight.',
      'Has a global magnetic field roughly 1% as strong as Earth’s, despite its small size and slow rotation.'
    ],
    keyMissions: ['Mariner 10 (1974)', 'MESSENGER (2011–2015)', 'BepiColombo (In Transit)'],
    accentColor: '#cbd5e1'
  },
  {
    id: 'venus',
    order: 2,
    name: 'Venus',
    tagline: 'THE VEILED INFERNO',
    classification: 'Terrestrial Planet',
    videoKey: 'venus',
    distanceKm: '108.2M km',
    distanceAU: '0.723 AU',
    diameterKm: '12,104 km',
    diameterRelative: '0.95x Earth',
    orbitPeriod: '224.7 days',
    rotationPeriod: '243 days (Retrograde)',
    meanTemperature: '465°C',
    surfaceTempRange: '462°C to 475°C',
    atmosphere: 'Dense Supercritical Carbon Dioxide',
    atmosphereComposition: [
      { name: 'Carbon Dioxide (CO2)', percentage: 96.5 },
      { name: 'Nitrogen (N2)', percentage: 3.5 },
      { name: 'Sulfur Dioxide (SO2)', percentage: 0.015 }
    ],
    moons: 0,
    notableMoons: [],
    gravity: '8.87 m/s² (0.90g)',
    axialTilt: '177.3° (Upside down)',
    overview: 'Often called Earth’s twin in size and mass, Venus underwent a catastrophic runaway greenhouse effect. Its crushing atmosphere exerts 92 times Earth’s surface pressure—equivalent to 900 meters underwater.',
    geology: 'Shrouded under reflective clouds of sulfuric acid, Venusian geography is shaped by thousands of volcanic calderas, pancake domes, and extensive basalt lava fields continually resurfacing the crust.',
    scientificFacts: [
      'Rotates clockwise (retrograde) so slowly that a Venusian day (243 Earth days) lasts longer than its year (225 days).',
      'Atmospheric winds in the upper cloud deck race at 360 km/h, circling the entire planet in just four Earth days (super-rotation).',
      'The surface temperature is hot enough to melt lead, zinc, and tin.'
    ],
    keyMissions: ['Venera 7–14 (1970–1982)', 'Magellan (1990–1994)', 'Venus Express (2006–2014)', 'VERITAS & DAVINCI+'],
    accentColor: '#f59e0b'
  },
  {
    id: 'earth',
    order: 3,
    name: 'Earth',
    tagline: 'THE LIVING OASIS',
    classification: 'Terrestrial Planet',
    videoKey: 'earth',
    distanceKm: '149.6M km',
    distanceAU: '1.000 AU',
    diameterKm: '12,742 km',
    diameterRelative: '1.00x Earth',
    orbitPeriod: '365.25 days',
    rotationPeriod: '23h 56m 04s',
    meanTemperature: '15°C',
    surfaceTempRange: '-89.2°C to 56.7°C',
    atmosphere: 'Nitrogen-Oxygen Biosphere',
    atmosphereComposition: [
      { name: 'Nitrogen (N2)', percentage: 78.08 },
      { name: 'Oxygen (O2)', percentage: 20.95 },
      { name: 'Argon (Ar)', percentage: 0.93 },
      { name: 'Carbon Dioxide (CO2)', percentage: 0.04 }
    ],
    moons: 1,
    notableMoons: ['The Moon (Luna)'],
    gravity: '9.81 m/s² (1.00g)',
    axialTilt: '23.44°',
    overview: 'The only celestial body confirmed to harbor life, liquid oceans, and active plate tectonics. Earth exists within the circumstellar habitable zone, protected by a self-generating geodynamo magnetic shield.',
    geology: 'Composed of an active crust divided into mobile tectonic plates, a convecting silicate mantle, and a molten outer core surrounding a solid iron crystal inner core generating the geomagnetic field.',
    scientificFacts: [
      'Liquid water covers 70.8% of the planetary surface, containing over 1.33 billion cubic kilometers of ocean.',
      'Our single massive moon stabilizes Earth’s axial tilt, preventing violent climatic swings over millions of years.',
      'The atmosphere acts as a radiation filter, ozone ultraviolet shield, and thermal blanket supporting millions of species.'
    ],
    keyMissions: ['Hubble Space Telescope', 'ISS (2000–Present)', 'Landsat Series', 'Sentinel Constellation'],
    accentColor: '#38bdf8'
  },
  {
    id: 'mars',
    order: 4,
    name: 'Mars',
    tagline: 'THE CRIMSON FRONTIER',
    classification: 'Terrestrial Planet',
    videoKey: 'mars',
    distanceKm: '227.9M km',
    distanceAU: '1.524 AU',
    diameterKm: '6,779 km',
    diameterRelative: '0.53x Earth',
    orbitPeriod: '686.98 days',
    rotationPeriod: '24h 37m 22s',
    meanTemperature: '-63°C',
    surfaceTempRange: '-140°C to 20°C',
    atmosphere: 'Thin Carbon Dioxide Matrix',
    atmosphereComposition: [
      { name: 'Carbon Dioxide (CO2)', percentage: 95.32 },
      { name: 'Nitrogen (N2)', percentage: 2.6 },
      { name: 'Argon (Ar)', percentage: 1.9 },
      { name: 'Oxygen (O2)', percentage: 0.13 }
    ],
    moons: 2,
    notableMoons: ['Phobos (Fear)', 'Deimos (Dread)'],
    gravity: '3.72 m/s² (0.38g)',
    axialTilt: '25.19°',
    overview: 'A freezing desert world of ancient river valleys, colossal shield volcanoes, and endless iron oxide red dust. Mars stands as humanity’s primary target for interplanetary exploration and astrobiological research.',
    geology: 'Home to Olympus Mons (21.9 km high, nearly 3x Mt. Everest) and Valles Marineris (4,000 km long canyon system). Massive polar ice caps cycle seasonal CO2 frost over thick water ice bedrock.',
    scientificFacts: [
      'Global dust storms can envelop the entire globe for months at a time, blocking out solar illumination.',
      'Extensive networks of dried riverbeds and mineral clays prove liquid water flowed across the surface billions of years ago.',
      'Atmospheric pressure is only 0.6% of Earth’s at sea level, requiring pressurized habitats for exploration.'
    ],
    keyMissions: ['Viking 1 & 2', 'Curiosity (2012–Present)', 'Perseverance & Ingenuity (2021–Present)', 'Mars Express'],
    accentColor: '#f97316'
  },
  {
    id: 'jupiter',
    order: 5,
    name: 'Jupiter',
    tagline: 'THE GAS MONARCH',
    classification: 'Gas Giant',
    videoKey: 'jupiter',
    distanceKm: '778.5M km',
    distanceAU: '5.204 AU',
    diameterKm: '139,820 km',
    diameterRelative: '10.97x Earth',
    orbitPeriod: '11.86 Earth years',
    rotationPeriod: '9h 55m 30s',
    meanTemperature: '-110°C',
    surfaceTempRange: '-145°C (1 bar level)',
    atmosphere: 'Hydrogen-Helium Atmosphere with Ammonia Belts',
    atmosphereComposition: [
      { name: 'Hydrogen (H2)', percentage: 89.8 },
      { name: 'Helium (He)', percentage: 10.2 },
      { name: 'Methane (CH4)', percentage: 0.3 },
      { name: 'Ammonia (NH3)', percentage: 0.026 }
    ],
    moons: 95,
    notableMoons: ['Ganymede (Largest in Solar System)', 'Europa (Subsurface Ocean)', 'Io (Volcanic)', 'Callisto'],
    gravity: '24.79 m/s² (2.53g)',
    axialTilt: '3.13°',
    overview: 'With more than twice the mass of all other solar planets combined, Jupiter is our solar guardian. Its immense gravitational sphere deflects comets and stabilizes planetary orbital resonance throughout the system.',
    geology: 'Has no true solid surface; hydrogen gas transitions into a pressurized supercritical fluid, and deeper down into metallic liquid hydrogen surrounding a dense rock-ice core.',
    scientificFacts: [
      'The Great Red Spot is an anticyclonic vortex larger than Earth that has raged continuously for over 350 years.',
      'Possesses the most powerful planetary magnetosphere, extending 7 million kilometers toward the Sun.',
      'Europa harbors a global subsurface liquid saltwater ocean containing more water than all of Earth’s seas combined.'
    ],
    keyMissions: ['Voyager 1 & 2 (1979)', 'Galileo (1995–2003)', 'Juno (2016–Present)', 'ESA JUICE (En Route)'],
    accentColor: '#eab308'
  },
  {
    id: 'saturn',
    order: 6,
    name: 'Saturn',
    tagline: 'THE RINGED MASTERPIECE',
    classification: 'Gas Giant',
    videoKey: 'saturn',
    distanceKm: '1.43B km',
    distanceAU: '9.582 AU',
    diameterKm: '116,460 km',
    diameterRelative: '9.14x Earth',
    orbitPeriod: '29.45 Earth years',
    rotationPeriod: '10h 33m 38s',
    meanTemperature: '-140°C',
    surfaceTempRange: '-178°C (1 bar level)',
    atmosphere: 'Banded Hydrogen-Helium with Hexagonal Polar Jet',
    atmosphereComposition: [
      { name: 'Hydrogen (H2)', percentage: 96.3 },
      { name: 'Helium (He)', percentage: 3.25 },
      { name: 'Methane (CH4)', percentage: 0.45 },
      { name: 'Ammonia (NH3)', percentage: 0.01 }
    ],
    moons: 146,
    notableMoons: ['Titan (Dense Atmosphere & Hydrocarbon Seas)', 'Enceladus (Cryogeysers)', 'Mimas'],
    gravity: '10.44 m/s² (1.06g)',
    axialTilt: '26.73°',
    overview: 'Crowned by the most extensive and brilliant ring system in the Solar System, Saturn is a low-density gas giant that would float if placed in a sufficiently vast ocean of water.',
    geology: 'The magnificent rings span 282,000 km across but are astonishingly razor-thin—averaging only 10 meters to 1 kilometer in thickness, formed of 99% pure water ice particles.',
    scientificFacts: [
      'A persistent geometric hexagonal jet stream spins above Saturn’s north pole, stretching nearly 30,000 km across.',
      'Moon Titan has a thick nitrogen atmosphere and lakes of liquid methane and ethane with active hydrological cycles.',
      'Moon Enceladus ejects plumes of water ice and organic compounds from a warm global ocean beneath its frozen crust.'
    ],
    keyMissions: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens (2004–2017)', 'Dragonfly (Upcoming)'],
    accentColor: '#fde047'
  },
  {
    id: 'uranus',
    order: 7,
    name: 'Uranus',
    tagline: 'THE TILTED ICE GIANT',
    classification: 'Ice Giant',
    videoKey: 'uranus',
    distanceKm: '2.87B km',
    distanceAU: '19.22 AU',
    diameterKm: '50,724 km',
    diameterRelative: '3.98x Earth',
    orbitPeriod: '84.02 Earth years',
    rotationPeriod: '17h 14m 24s (Retrograde)',
    meanTemperature: '-195°C',
    surfaceTempRange: '-224°C (Minimum recorded)',
    atmosphere: 'Cyan Methane Ice Envelope',
    atmosphereComposition: [
      { name: 'Hydrogen (H2)', percentage: 82.5 },
      { name: 'Helium (He)', percentage: 15.2 },
      { name: 'Methane (CH4)', percentage: 2.3 }
    ],
    moons: 28,
    notableMoons: ['Titania', 'Oberon', 'Miranda (Extreme Fault Scarps)', 'Ariel', 'Umbriel'],
    gravity: '8.69 m/s² (0.89g)',
    axialTilt: '97.77° (Rolling on its side)',
    overview: 'An enigmatic aquamarine ice giant that rotates almost completely on its side, likely knocked over by a primordial Earth-sized protoplanet impact during the formation of the Solar System.',
    geology: 'Mantle composed of a hot, dense slush of water, ammonia, and methane ices over a small rocky core. Atmospheric methane gas absorbs red photons, producing its pale cyan hue.',
    scientificFacts: [
      'Holds the record for the coldest atmospheric temperature measured anywhere in the Solar System: -224°C (-371°F).',
      'Because of its 98° tilt, each pole gets 42 years of continuous direct sunlight followed by 42 years of total darkness.',
      'Possesses 13 distinct narrow dark rings discovered when the planet occulted distant stars.'
    ],
    keyMissions: ['Voyager 2 (1986)', 'Hubble Space Telescope monitoring', 'Uranus Orbiter and Probe (Proposed Decadal)'],
    accentColor: '#38bdf8'
  },
  {
    id: 'neptune',
    order: 8,
    name: 'Neptune',
    tagline: 'THE STORMY VOYAGER',
    classification: 'Ice Giant',
    videoKey: 'neptune',
    distanceKm: '4.50B km',
    distanceAU: '30.07 AU',
    diameterKm: '49,244 km',
    diameterRelative: '3.86x Earth',
    orbitPeriod: '164.8 Earth years',
    rotationPeriod: '16h 06m 36s',
    meanTemperature: '-201°C',
    surfaceTempRange: '-218°C (Upper clouds)',
    atmosphere: 'Deep Azure Dynamic Atmosphere',
    atmosphereComposition: [
      { name: 'Hydrogen (H2)', percentage: 80 },
      { name: 'Helium (He)', percentage: 19 },
      { name: 'Methane (CH4)', percentage: 1.5 }
    ],
    moons: 16,
    notableMoons: ['Triton (Retrograde Cryovolcanic Moon)', 'Proteus', 'Nereid'],
    gravity: '11.15 m/s² (1.14g)',
    axialTilt: '28.32°',
    overview: 'The most distant recognized planet in our Solar System, Neptune is a violent, vivid-blue world where supersonic winds whip icy cirrus clouds through high-altitude methane tempests.',
    geology: 'A fluid interior of superheated water, methane, and ammonia under extreme pressure, where carbon atoms may crystallize into diamond rain falling through hundreds of kilometers of slush toward the core.',
    scientificFacts: [
      'Exhibits the fastest atmospheric winds in the Solar System, recorded at over 2,100 km/h (1,300 mph).',
      'Moon Triton orbits backwards (retrograde orbit), indicating it was a captured dwarf planet from the Kuiper Belt.',
      'Discovered mathematically in 1846 by Le Verrier and Adams before ever being directly spotted through a telescope.'
    ],
    keyMissions: ['Voyager 2 (August 1989)', 'James Webb Space Telescope (Infrared Imaging 2022)'],
    accentColor: '#6366f1'
  }
];

export const MARS_SURFACE_DETAILS = {
  videoKey: 'marsSurface' as const,
  title: 'Mars Reconnaissance & Surface Observation',
  description: 'Ultra-high resolution terrain capture from the Martian crust. The landscape reveals billions of years of volcanic activity, impact cratering, and alluvial deposition.',
  features: [
    {
      name: 'Olympus Mons',
      stat: '21.9 km height',
      detail: 'The largest volcanic edifice in the Solar System, with a footprint equivalent to the size of France.'
    },
    {
      name: 'Valles Marineris',
      stat: '4,000 km length',
      detail: 'A tectonic rift canyon system stretching across one-fifth of the Martian circumference, up to 7 km deep.'
    },
    {
      name: 'Regolith & Iron Dust',
      stat: 'Oxidized Hematite',
      detail: 'Fine grains of ferric oxide (rust) suspended in the thin atmosphere scatter solar illumination into a reddish glow.'
    },
    {
      name: 'Subsurface Glacial Ice',
      stat: '5M+ km³ reserve',
      detail: 'Subsurface radar sounding confirmed pure ice layers preserved beneath protective meters of basaltic regolith.'
    }
  ],
  rovers: [
    { name: 'Perseverance Rover & Ingenuity', site: 'Jezero Crater (Ancient Lake Delta)', year: '2021–Present' },
    { name: 'Curiosity Rover', site: 'Gale Crater (Mount Sharp Stratigraphy)', year: '2012–Present' },
    { name: 'InSight Lander', site: 'Elysium Planitia (Seismic Core Profiling)', year: '2018–2022' }
  ]
};

export const ORBITAL_MOVEMENT_DATA = {
  videoKey: 'solarSystemMovement' as const,
  title: 'How The Solar System Moves In Space',
  subtitle: 'A Helical Symphony Through the Milky Way',
  speedKmh: '792,000 km/h',
  speedKms: '220 km/s',
  galacticYear: '230 Million Years',
  planeTilt: '60° to Galactic Plane',
  insights: [
    {
      title: 'Heliocentric Keplerian Orbits',
      description: 'Planets do not orbit in simple static circles; they trace elliptical Keplerian trajectories with the Sun at one focal node, speeding up at perihelion and slowing at aphelion.'
    },
    {
      title: 'Galactic Helical Vortex',
      description: 'The Sun is in continuous high-speed motion around the supermassive black hole Sagittarius A* at ~220 km/s. As planets orbit the traveling Sun, our entire Solar System forms a cosmic vortex through space.'
    },
    {
      title: 'Orbital Speed Hierarchy',
      description: 'By conservation of angular momentum and gravity, Mercury races at 47.4 km/s, Earth at 29.8 km/s, and distant Neptune cruises at 5.4 km/s.'
    },
    {
      title: 'The Great Cosmic Year',
      description: 'It takes approximately 230 million Earth years for our Solar System to complete one full revolution around the galactic nucleus. Dinosaurs lived during our last galactic sector.'
    }
  ]
};
