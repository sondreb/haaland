/**
 * Every photograph on the site, with its licence and attribution.
 * All images come from Wikimedia Commons under Creative Commons licences
 * that permit reuse with credit. Files live in /public/img.
 */
export interface Photo {
  id: string;
  file: string;
  alt: string;
  caption: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
  /** Intrinsic pixel size of the file in /public/img (for layout stability). */
  w: number;
  h: number;
  /** CSS object-position for cropping inside fixed-ratio frames. */
  focus?: string;
  /** Source is a very small file; render with the archive treatment. */
  lowRes?: boolean;
}

const CC_BY_SA_4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' };
const CC_BY_SA_3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' };
const CC_BY_4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' };

export const photos: Record<string, Photo> = {
  hero: {
    id: 'hero',
    file: 'hero.jpg',
    alt: 'Erling Haaland in a Norway warm-up shirt, long blond hair slicked back, before Norway v France at the 2026 World Cup',
    caption: 'Before Norway v France · 2026 World Cup · 26 June 2026',
    author: 'Bryan Berlin',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_France_v_Norway_26_June_26-008.jpg',
    w: 1200,
    h: 1800,
    focus: '50% 20%',
  },
  bryne: {
    id: 'bryne',
    file: 'bryne.jpg',
    alt: 'Bryne Stadion, the small red-seated home ground of Bryne FK, with an empty pitch in winter light',
    caption: 'Bryne Stadion — where it started',
    author: 'Jarvin',
    ...CC_BY_SA_3,
    source: 'https://commons.wikimedia.org/wiki/File:Bryne_Stadion.jpg',
    w: 1044,
    h: 783,
    focus: '50% 40%',
  },
  molde: {
    id: 'molde',
    file: 'molde.jpg',
    alt: 'A teenage Erling Braut Håland in a blue Molde FK shirt before a Europa League match against Zenit',
    caption: 'Molde v Zenit · Europa League play-off · 30 August 2018',
    author: 'Vyacheslav Evdokimov / fc-zenit.ru',
    ...CC_BY_SA_3,
    source: 'https://commons.wikimedia.org/wiki/File:Molde-Zenit_(2)_Erling_Braut_H%C3%A5land_2018-8-30.jpg',
    w: 243,
    h: 361,
    focus: '50% 20%',
    lowRes: true,
  },
  salzburg: {
    id: 'salzburg',
    file: 'salzburg.jpg',
    alt: 'Erling Haaland applauding in a red and white Red Bull Salzburg shirt',
    caption: 'Salzburg v Mattersburg · Austrian Bundesliga · August 2019',
    author: 'Werner100359',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:FC_RB_Salzburg_versus_SV_Mattersburg_(4._Juli_2019)_29.jpg',
    w: 900,
    h: 1251,
    focus: '50% 15%',
  },
  dortmund: {
    id: 'dortmund',
    file: 'dortmund.jpg',
    alt: 'Erling Haaland in the yellow and black of Borussia Dortmund during a Champions League match against Zenit',
    caption: 'Dortmund v Zenit · Champions League · 28 October 2020',
    author: 'Vyacheslav Evdokimov / fc-zenit.ru',
    ...CC_BY_SA_3,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_2020.jpg',
    w: 458,
    h: 1026,
    focus: '50% 12%',
  },
  city: {
    id: 'city',
    file: 'city.jpg',
    alt: 'Erling Haaland sprinting in Manchester City’s red and black striped away kit at RB Leipzig',
    caption: 'RB Leipzig v Manchester City · Champions League · 22 February 2023',
    author: 'Jacek Stanislawek',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_2023.jpg',
    w: 1000,
    h: 1250,
    focus: '50% 25%',
  },
  norwayBack: {
    id: 'norwayBack',
    file: 'norway-back.jpg',
    alt: 'The back of Erling Haaland’s white Norway shirt reading BRAUT HAALAND 9, hair tied up, in front of a packed stand',
    caption: 'Both parents’ names on his back · Morocco v Norway · 7 June 2026',
    author: 'Bryan Berlin',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_Morocco_v_Norway_7_June_2026-166.jpg',
    w: 1000,
    h: 1500,
    focus: '50% 30%',
  },
  norwayRain: {
    id: 'norwayRain',
    file: 'norway-rain.jpg',
    alt: 'Erling Haaland applauding the crowd in the rain in Norway’s red home shirt after beating Italy 3–0',
    caption: 'Norway 3–0 Italy · World Cup qualifier · Oslo, 6 June 2025',
    author: 'MichaelEmilio',
    ...CC_BY_4,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_June_2025.jpg',
    w: 1000,
    h: 1351,
    focus: '50% 20%',
  },
  anatomy: {
    id: 'anatomy',
    file: 'anatomy.jpg',
    alt: 'Side profile of Erling Haaland in a white Norway shirt, hands on hips, in front of a full stadium',
    caption: 'Morocco v Norway · 7 June 2026',
    author: 'Bryan Berlin',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_Morocco_v_Norway_7_June_2026-164.jpg',
    w: 1600,
    h: 1067,
    focus: '50% 30%',
  },
  offpitch: {
    id: 'offpitch',
    file: 'offpitch.jpg',
    alt: 'A fan holds up a phone to photograph Erling Haaland, in a sky-blue training top, at an open Manchester City practice session',
    caption: 'Open training · Cary, North Carolina · 22 July 2024',
    author: 'Hameltion',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:ManCity20240722-022.jpg',
    w: 1600,
    h: 1067,
    focus: '50% 35%',
  },
  smile: {
    id: 'smile',
    file: 'smile.jpg',
    alt: 'Erling Haaland smiling in a white Norway shirt with the number 9',
    caption: 'Morocco v Norway · 7 June 2026',
    author: 'Bryan Berlin',
    ...CC_BY_SA_4,
    source: 'https://commons.wikimedia.org/wiki/File:Erling_Haaland_Morocco_v_Norway_7_June_2026-51.jpg',
    w: 1000,
    h: 1500,
    focus: '50% 25%',
  },
};

/** Photo used for each chapter of the journey, keyed by stint id. */
export const stintPhoto: Record<string, Photo> = {
  bryne: photos.bryne,
  molde: photos.molde,
  salzburg: photos.salzburg,
  dortmund: photos.dortmund,
  city: photos.city,
};

export const photoUrl = (p: Photo) => `${import.meta.env.BASE_URL}img/${p.file}`;
