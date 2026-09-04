/**
 * All facts about Erling Braut Haaland used across the site.
 * Club data as of 28 August 2026; international data as of 11 July 2026.
 */

export const DATA_AS_OF = '28 August 2026';

export const profile = {
  fullName: 'Erling Braut Haaland',
  born: new Date(2000, 6, 21), // 21 July 2000 (local time)
  birthplace: 'Leeds, West Yorkshire, England',
  hometown: 'Bryne, Norway',
  height: '1.95 m',
  position: 'Striker',
  club: 'Manchester City',
  number: 9,
  nation: 'Norway',
  contractUntil: 2034,
};

export interface Stint {
  id: string;
  club: string;
  short: string;
  years: string;
  from: number;
  to: number | null;
  country: string;
  apps: number;
  goals: number;
  /** Background/accent colours for theme morphing. */
  theme: { bg: string; accent: string; text: string };
  headline: string;
  story: string;
  moments: string[];
}

export const stints: Stint[] = [
  {
    id: 'bryne',
    club: 'Bryne FK',
    short: 'Bryne',
    years: '2005 – 2017',
    from: 2005,
    to: 2017,
    country: 'Norway',
    apps: 34, // Bryne 2 (18) + Bryne first team (16)
    goals: 18,
    theme: { bg: '#0d1f12', accent: '#8fd694', text: '#f5f3ee' },
    headline: 'A boy from Jæren',
    story:
      'Born in Leeds while his father Alf-Inge played for Leeds United, Erling moved to Bryne at three. He joined the local club at five, scored 18 in 18 for the reserves, and was handed his first-team debut at 15 by his youth coach Alf Ingve Berntsen — three months before his 16th birthday.',
    moments: [
      'Standing long jump “world record” for a 5-year-old: 1.63 m',
      'Debut vs Ranheim, 12 May 2016 — aged 15',
      'Trial at Hoffenheim, then chose Molde and Solskjær',
    ],
  },
  {
    id: 'molde',
    club: 'Molde FK',
    short: 'Molde',
    years: '2017 – 2018',
    from: 2017,
    to: 2018,
    country: 'Norway',
    apps: 54, // 50 first team + 4 for Molde 2
    goals: 22,
    theme: { bg: '#0b2a5b', accent: '#3aa0ff', text: '#f5f3ee' },
    headline: 'Solskjær’s protégé',
    story:
      'Ole Gunnar Solskjær signed the 16-year-old in February 2017. A year later, on 1 July 2018, Haaland scored four goals in 21 minutes against unbeaten league leaders Brann. Solskjær compared him to Lukaku and revealed the club had turned down several bids.',
    moments: [
      'Debut goal in the Norwegian Cup vs Volda, April 2017',
      '4 goals in 21 minutes vs Brann, 1 July 2018',
      'Eliteserien Breakthrough of the Year 2018',
    ],
  },
  {
    id: 'salzburg',
    club: 'Red Bull Salzburg',
    short: 'Salzburg',
    years: '2019',
    from: 2019,
    to: 2019,
    country: 'Austria',
    apps: 27,
    goals: 29,
    theme: { bg: '#3a0a0f', accent: '#ff2e2e', text: '#f5f3ee' },
    headline: 'The world finds out',
    story:
      'Agreed in August 2018, arriving in January 2019, he detonated the following autumn: 28 goals in 22 games in 2019–20, five hat-tricks, and a first-half hat-trick on his Champions League debut against Genk — still the only player ever to do that. He scored in each of his first five group games, then at Anfield.',
    moments: [
      'First-half hat-trick on UCL debut vs Genk, 17 Sept 2019',
      '8 goals in 6 Champions League games',
      'Austrian Bundesliga + Cup double, Austrian Footballer of the Year 2019',
    ],
  },
  {
    id: 'dortmund',
    club: 'Borussia Dortmund',
    short: 'Dortmund',
    years: '2020 – 2022',
    from: 2020,
    to: 2022,
    country: 'Germany',
    apps: 89,
    goals: 86,
    theme: { bg: '#2b2400', accent: '#fde100', text: '#fffbe6' },
    headline: 'Yellow Wall, black boots',
    story:
      'A €20m January signing, he came off the bench at Augsburg and scored a 23-minute hat-trick on debut. Seven goals in his first three Bundesliga matches — a record. He won the DFB-Pokal, was Bundesliga Player of the Season, and finished 2020–21 as Champions League top scorer with 10.',
    moments: [
      'Hat-trick in 23 minutes on debut at Augsburg, 18 Jan 2020',
      'Both goals vs PSG in the UCL last 16, Feb 2020',
      'Fastest and youngest to 20 UCL goals — in 14 games',
      '2 goals in the 2021 DFB-Pokal final vs Leipzig',
    ],
  },
  {
    id: 'city',
    club: 'Manchester City',
    short: 'Man City',
    years: '2022 – present',
    from: 2022,
    to: null,
    country: 'England',
    apps: 201,
    goals: 164,
    theme: { bg: '#0a1f33', accent: '#6cabdd', text: '#f5f3ee' },
    headline: 'The treble, the records, the reign',
    story:
      'A €60m release clause bought the most devastating debut season in English football: 36 Premier League goals, 52 in all competitions, a continental treble, and the Champions League as top scorer. He has since added a second title, two more Golden Boots, the captaincy, the fastest 100 Premier League goals ever — and a contract to 2034.',
    moments: [
      'Two goals on league debut at West Ham, 7 Aug 2022',
      '5 goals in 57 minutes vs RB Leipzig, 14 March 2023',
      '36 goals — the Premier League single-season record',
      'Treble: Premier League, FA Cup, Champions League 2022–23',
      '100 Premier League goals in 111 games, 2 Dec 2025',
    ],
  },
];

export interface SeasonRow {
  season: string;
  club: string;
  clubId: string;
  apps: number;
  goals: number;
  league: string;
  leagueGoals: number;
}

/** All-competitions club totals per season (Wikipedia career statistics). */
export const seasons: SeasonRow[] = [
  { season: '2016', club: 'Bryne', clubId: 'bryne', apps: 16, goals: 0, league: '1. divisjon', leagueGoals: 0 },
  { season: '2017', club: 'Molde', clubId: 'molde', apps: 20, goals: 4, league: 'Eliteserien', leagueGoals: 2 },
  { season: '2018', club: 'Molde', clubId: 'molde', apps: 30, goals: 16, league: 'Eliteserien', leagueGoals: 12 },
  { season: '2018–19', club: 'Salzburg', clubId: 'salzburg', apps: 5, goals: 1, league: 'Austrian Bundesliga', leagueGoals: 1 },
  { season: '2019–20', club: 'Salzburg', clubId: 'salzburg', apps: 22, goals: 28, league: 'Austrian Bundesliga', leagueGoals: 16 },
  { season: '2019–20', club: 'Dortmund', clubId: 'dortmund', apps: 18, goals: 16, league: 'Bundesliga', leagueGoals: 13 },
  { season: '2020–21', club: 'Dortmund', clubId: 'dortmund', apps: 41, goals: 41, league: 'Bundesliga', leagueGoals: 27 },
  { season: '2021–22', club: 'Dortmund', clubId: 'dortmund', apps: 30, goals: 29, league: 'Bundesliga', leagueGoals: 22 },
  { season: '2022–23', club: 'Man City', clubId: 'city', apps: 53, goals: 52, league: 'Premier League', leagueGoals: 36 },
  { season: '2023–24', club: 'Man City', clubId: 'city', apps: 45, goals: 38, league: 'Premier League', leagueGoals: 27 },
  { season: '2024–25', club: 'Man City', clubId: 'city', apps: 48, goals: 34, league: 'Premier League', leagueGoals: 22 },
  { season: '2025–26', club: 'Man City', clubId: 'city', apps: 52, goals: 38, league: 'Premier League', leagueGoals: 27 },
  { season: '2026–27', club: 'Man City', clubId: 'city', apps: 3, goals: 2, league: 'Premier League', leagueGoals: 2 },
];

export const careerTotals = {
  clubApps: 405,
  clubGoals: 319,
  intlCaps: 55,
  intlGoals: 62,
  hatTricksPL: 8, // stated as "quickest PL player to score eight hat-tricks"
  uclGoals: 57,
  uclApps: 58,
  plGoals: 114,
  plApps: 134,
  cityGoals: 164,
  cityApps: 201,
};

export type RecordTag = 'Premier League' | 'Champions League' | 'Norway' | 'Bundesliga' | 'World';

export interface RecordItem {
  value: string;
  label: string;
  detail: string;
  tag: RecordTag;
}

export const records: RecordItem[] = [
  { value: '36', label: 'Most goals in a Premier League season', detail: 'Broke Shearer and Cole’s 34 (set in 42-game seasons) in his first year — 2022–23.', tag: 'Premier League' },
  { value: '52', label: 'Most goals in a season by a PL player', detail: 'All competitions, 2022–23. Also the most goals in a single season in Man City history.', tag: 'Premier League' },
  { value: '111', label: 'Fastest to 100 Premier League goals', detail: 'Games needed. Shearer’s 1995 record stood at 124. Reached at Fulham, 2 Dec 2025.', tag: 'Premier League' },
  { value: '48', label: 'Fastest to 50 Premier League goals', detail: 'Games. Andy Cole needed 65.', tag: 'Premier League' },
  { value: '8', label: 'Fastest to three PL hat-tricks', detail: 'Games. The previous record — Michael Owen — was 48.', tag: 'Premier League' },
  { value: '88', label: 'Most goals in first 100 PL games', detail: 'Shearer had 79.', tag: 'Premier League' },
  { value: '3', label: 'Hat-tricks in consecutive home games', detail: 'Crystal Palace, Nottingham Forest, Manchester United — first ever to do it.', tag: 'Premier League' },
  { value: '94', label: 'Fastest to 100 PL goal involvements', detail: 'Games. 84 goals and 16 assists, overtaking Shearer.', tag: 'Premier League' },
  { value: '5', label: 'Goals in a single Champions League match', detail: 'Man City 7–0 RB Leipzig, March 2023. Only Messi and Luiz Adriano have matched it. Fastest ever five: 57 minutes.', tag: 'Champions League' },
  { value: '49', label: 'Fastest to 50 Champions League goals', detail: 'Games. Van Nistelrooy needed 62.', tag: 'Champions League' },
  { value: '14', label: 'Fastest & youngest to 20 UCL goals', detail: 'Games, aged 20 years 231 days. Kane needed 24.', tag: 'Champions League' },
  { value: '1st', label: 'Only first-half hat-trick on UCL debut', detail: 'Salzburg 6–2 Genk, 17 Sept 2019.', tag: 'Champions League' },
  { value: '7', label: 'Goals in first three Bundesliga games', detail: 'First ever. 56 minutes on the pitch for the first five.', tag: 'Bundesliga' },
  { value: '9', label: 'Goals in one U-20 World Cup match', detail: 'Norway 12–0 Honduras, 30 May 2019. A tournament record that won him the Golden Boot.', tag: 'Norway' },
  { value: '62', label: 'Norway’s all-time top scorer', detail: 'In 55 caps. Broke Jørgen Juve’s record from 1937 at the age of 24.', tag: 'Norway' },
  { value: '46', label: 'Fastest to 50 international goals this century', detail: 'Games. Kane took 71. Sixth player ever to reach 50 in under 50 caps.', tag: 'Norway' },
  { value: '16', label: 'Goals in one World Cup qualifying campaign', detail: 'Scored in all eight matches, equalling Lewandowski’s UEFA record.', tag: 'Norway' },
  { value: '5+2', label: 'Goals & assists vs Moldova', detail: 'Norway 11–1 Moldova, Sept 2025. First European to score five in a WC qualifier since 1977.', tag: 'Norway' },
  { value: '103', label: 'Fastest to 100 top-5-league goals', detail: 'Games. Beat Ronaldo’s 133.', tag: 'World' },
  { value: '2034', label: 'Longest contract in Premier League history', detail: 'Signed January 2025 — a nine-and-a-half-year deal.', tag: 'World' },
];

export const teamHonours = [
  { club: 'Red Bull Salzburg', items: ['Austrian Bundesliga 2018–19', 'Austrian Cup 2018–19'] },
  { club: 'Borussia Dortmund', items: ['DFB-Pokal 2020–21'] },
  {
    club: 'Manchester City',
    items: [
      'Premier League 2022–23, 2023–24',
      'UEFA Champions League 2022–23',
      'FA Cup 2022–23',
      'UEFA Super Cup 2023',
      'FIFA Club World Cup 2023',
      'FA Community Shield 2024',
    ],
  },
];

export const individualHonours = [
  { title: 'UEFA Men’s Player of the Year', when: '2022–23' },
  { title: 'Ballon d’Or runner-up', when: '2023' },
  { title: 'Premier League Golden Boot', when: '2022–23 · 2023–24 · 2025–26' },
  { title: 'European Golden Shoe', when: '2022–23' },
  { title: 'Gerd Müller Trophy', when: '2023' },
  { title: 'PFA Players’ Player of the Year', when: '2022–23' },
  { title: 'FWA Footballer of the Year', when: '2022–23 (record 82% of votes)' },
  { title: 'Premier League Player & Young Player of the Season', when: '2022–23 — only player ever to win both' },
  { title: 'Champions League top scorer', when: '2020–21 · 2022–23' },
  { title: 'Bundesliga Player of the Season', when: '2020–21' },
  { title: 'Golden Boy', when: '2020' },
  { title: 'IFFHS World’s Best Player', when: '2023' },
  { title: 'FIFPRO World 11', when: '2021 · 2022 · 2023 · 2024' },
  { title: 'FIFA World Cup Dream XI', when: '2026' },
  { title: 'FIFA U-20 World Cup Golden Boot', when: '2019' },
  { title: 'Gullballen (Norway’s Golden Ball)', when: '2020 · 2021 · 2022 · 2023 · 2024' },
  { title: 'Norwegian Sportsperson of the Year', when: '2020 · 2025' },
  { title: 'BBC World Sport Star of the Year', when: '2023' },
  { title: 'UEFA Nations League top scorer', when: '2020–21 · 2022–23' },
  { title: 'Austrian Footballer of the Year', when: '2019' },
];

export interface IntlYear {
  year: number;
  apps: number;
  goals: number;
}

export const intlByYear: IntlYear[] = [
  { year: 2019, apps: 2, goals: 0 },
  { year: 2020, apps: 5, goals: 6 },
  { year: 2021, apps: 8, goals: 6 },
  { year: 2022, apps: 8, goals: 9 },
  { year: 2023, apps: 6, goals: 6 },
  { year: 2024, apps: 10, goals: 11 },
  { year: 2025, apps: 9, goals: 17 },
  { year: 2026, apps: 7, goals: 7 },
];

export interface WcMatch {
  stage: string;
  date: string;
  opponent: string;
  flag: string;
  score: string;
  result: 'W' | 'L';
  goals: number;
  potm: boolean;
  venue: string;
  note: string;
}

export const worldCup2026: WcMatch[] = [
  { stage: 'Group', date: '16 June', opponent: 'Iraq', flag: 'IRQ', score: '4–1', result: 'W', goals: 2, potm: true, venue: 'USA', note: 'World Cup debut. Two goals, Player of the Match, and Norway’s first finals goals since 1998.' },
  { stage: 'Group', date: '23 June', opponent: 'Senegal', flag: 'SEN', score: '3–2', result: 'W', goals: 2, potm: true, venue: 'USA', note: 'Another brace — Norway’s all-time World Cup top scorer after two games, knockout place secured.' },
  { stage: 'Round of 32', date: '30 June', opponent: 'Ivory Coast', flag: 'CIV', score: '2–1', result: 'W', goals: 1, potm: false, venue: 'AT&T Stadium, Arlington', note: 'The winner. His 60th international goal in his 53rd cap — fastest to 60 since Gerd Müller.' },
  { stage: 'Round of 16', date: '5 July', opponent: 'Brazil', flag: 'BRA', score: '2–1', result: 'W', goals: 2, potm: true, venue: 'MetLife Stadium, New Jersey', note: 'Both goals against Brazil. Norway into a first-ever World Cup quarter-final. Kygo’s “Kygo Jo” remix went to No. 1 in Norway.' },
  { stage: 'Quarter-final', date: '11 July', opponent: 'England', flag: 'ENG', score: '1–2', result: 'L', goals: 0, potm: false, venue: 'USA', note: 'The country of his birth ended the run after extra time. Substituted with a dead leg. Norway’s best-ever World Cup finish.' },
];

export const quotes = [
  { text: 'Physically he sets new standards — the combination of being really physical and technical and sensational awareness. He knows always where the decisive gaps are.', who: 'Jürgen Klopp', role: 'Liverpool manager, 2022' },
  { text: 'He is truly unique. He has the skill and strength of Rooney and the talent and finishing of Kane and Ronaldo.', who: 'Gary Neville', role: 'Sky Sports, 2023' },
  { text: 'The deadliest striker in football today.', who: 'FIFPRO', role: '2024' },
  { text: 'He had what you in the UK call grit. When he was on the pitch he was totally focused on football.', who: 'Alf Ingve Berntsen', role: 'His coach at Bryne for eight years' },
  { text: 'Erling has already become a kind of real-life Viking icon around the world.', who: 'Harald Zwart', role: 'Director, ViQueens (2026)' },
];

export interface Curio {
  emoji: string;
  title: string;
  text: string;
}

export const curiosities: Curio[] = [
  { emoji: '🧘', title: 'The meditation', text: 'His trademark celebration is the lotus position — a nod to his real meditation practice. It has been immortalised in the FIFA/EA video games.' },
  { emoji: '🎤', title: 'Flow Kingz', text: 'In 2016, as “Lyng”, he released the rap track “Kygo Jo” with Norway U17 team-mates. 23 million YouTube views later, Kygo himself remixed it after the win over Brazil — and it hit No. 1 in Norway.' },
  { emoji: '🐄', title: 'Farmer at heart', text: 'He has said he wants a small farm in Bryne when he retires — and to “for sure” own cows. Bryne: 13,000 people, wind, rain and livestock.' },
  { emoji: '📜', title: 'A 1594 Viking chronicle', text: 'In December 2025 he and his father bought the only surviving copy of a 1594 edition of Snorri Sturluson’s sagas of the Norse kings for 1.3m NOK — then donated it to Bryne’s public library.' },
  { emoji: '✈️', title: 'Raw-dogging a flight', text: 'In 2023 he told Instagram he had sat through a seven-hour flight with no screen, no food, no water, no sleep. The internet has never recovered.' },
  { emoji: '👜', title: 'The handbag collection', text: 'Hermès, Louis Vuitton, Goyard. A striker with taste.' },
  { emoji: '🤠', title: 'Cowboy Erling', text: 'His Snapchat vlogs from the 2026 World Cup — including buying a cowboy hat in Texas — turned him into a full-blown meme phenomenon.' },
  { emoji: '🎬', title: 'ViQueens', text: 'He voices a Viking called Haaland in Harald Zwart’s animated film “ViQueens”, out around Christmas 2026 — his acting debut.' },
  { emoji: '🇵🇪', title: 'Haaland is Peruvian', text: 'Peru’s civil registry reported 91 children named “Erling Haaland” and 468 Peruvians with the surname after the 2026 World Cup. “Haaland is Peruvian,” a spokesman joked.' },
  { emoji: '💈', title: 'The buzz cut', text: 'Before 2026–27 he shaved off his signature long blond hair. A new era, a new haircut.' },
  { emoji: '🏃', title: 'A heptathlete’s son', text: 'Mother Gry Marita Braut was a Norwegian heptathlon champion. Three cousins are professional footballers too — the Braut genes are strong.' },
  { emoji: 'ᛁ', title: 'Håland → Haaland', text: 'He changed the spelling in 2019 to make it easier for international fans. On his Norway shirt he wears both parents’ names: “Braut Haaland”.' },
];

export const socials = [
  { name: 'Instagram', handle: '@erling', url: 'https://www.instagram.com/erling', icon: 'instagram', followers: '77M' },
  { name: 'X', handle: '@ErlingHaaland', url: 'https://x.com/ErlingHaaland', icon: 'x', followers: '' },
  { name: 'TikTok', handle: '@erlinghaaland', url: 'https://www.tiktok.com/@erlinghaaland', icon: 'tiktok', followers: '15M+' },
  { name: 'YouTube', handle: '@erling', url: 'https://www.youtube.com/@erling', icon: 'youtube', followers: '4M+' },
  { name: 'Facebook', handle: 'erlinghaaland', url: 'https://www.facebook.com/erlinghaaland', icon: 'facebook', followers: '' },
  { name: 'Snapchat', handle: '@erling.haaland', url: 'https://www.snapchat.com/@erling.haaland', icon: 'snapchat', followers: '' },
];

export const careerLinks = [
  { name: 'Manchester City — Player profile', url: 'https://www.mancity.com/players/erling-haaland' },
  { name: 'Premier League — Player stats', url: 'https://www.premierleague.com/players/65970/Erling-Haaland/overview' },
  { name: 'UEFA — Champions League profile', url: 'https://www.uefa.com/uefachampionsleague/clubs/players/250103758--erling-haaland/' },
  { name: 'FIFA — Player page', url: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026' },
  { name: 'Transfermarkt — Career record', url: 'https://www.transfermarkt.com/erling-haaland/profil/spieler/418560' },
  { name: 'FBref — Advanced stats', url: 'https://fbref.com/en/players/1f44ac21/Erling-Haaland' },
  { name: 'Wikipedia — Erling Haaland', url: 'https://en.wikipedia.org/wiki/Erling_Haaland' },
  { name: 'Wikipedia — International goals', url: 'https://en.wikipedia.org/wiki/List_of_international_goals_scored_by_Erling_Haaland' },
  { name: 'Bryne FK — Where it began', url: 'https://www.brynefk.no/' },
  { name: 'Norwegian FA (NFF)', url: 'https://www.fotball.no/' },
];
