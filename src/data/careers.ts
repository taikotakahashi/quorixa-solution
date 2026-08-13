export type TalentLocation = {
  id: string;
  name: string;
  region: "Americas" | "Europe" | "Asia";
  /** emoji fallback */
  flag: string;
  utcOffset: string;
  openRoles: number;
  /** percent positions on the map image */
  x: number;
  y: number;
};

export const talentLocations: TalentLocation[] = [
  { id: "usa", name: "USA", region: "Americas", flag: "🇺🇸", utcOffset: "UTC-5", openRoles: 13, x: 22, y: 38 },
  { id: "mexico", name: "Mexico", region: "Americas", flag: "🇲🇽", utcOffset: "UTC-6", openRoles: 4, x: 18, y: 48 },
  { id: "argentina", name: "Argentina", region: "Americas", flag: "🇦🇷", utcOffset: "UTC-3", openRoles: 3, x: 28, y: 78 },
  { id: "colombia", name: "Colombia", region: "Americas", flag: "🇨🇴", utcOffset: "UTC-5", openRoles: 5, x: 26, y: 58 },
  { id: "brazil", name: "Brazil", region: "Americas", flag: "🇧🇷", utcOffset: "UTC-3", openRoles: 6, x: 32, y: 68 },
  { id: "guatemala", name: "Guatemala", region: "Americas", flag: "🇬🇹", utcOffset: "UTC-6", openRoles: 2, x: 20, y: 52 },
  { id: "poland", name: "Poland", region: "Europe", flag: "🇵🇱", utcOffset: "UTC+1", openRoles: 8, x: 52, y: 32 },
  { id: "spain", name: "Spain", region: "Europe", flag: "🇪🇸", utcOffset: "UTC+1", openRoles: 5, x: 46, y: 40 },
  { id: "portugal", name: "Portugal", region: "Europe", flag: "🇵🇹", utcOffset: "UTC+0", openRoles: 4, x: 44, y: 42 },
  { id: "ukraine", name: "Ukraine", region: "Europe", flag: "🇺🇦", utcOffset: "UTC+2", openRoles: 7, x: 56, y: 34 },
  { id: "romania", name: "Romania", region: "Europe", flag: "🇷🇴", utcOffset: "UTC+2", openRoles: 3, x: 55, y: 38 },
  { id: "bulgaria", name: "Bulgaria", region: "Europe", flag: "🇧🇬", utcOffset: "UTC+2", openRoles: 2, x: 54, y: 40 },
  { id: "slovenia", name: "Slovenia", region: "Europe", flag: "🇸🇮", utcOffset: "UTC+1", openRoles: 2, x: 51, y: 38 },
  { id: "slovakia", name: "Slovakia", region: "Europe", flag: "🇸🇰", utcOffset: "UTC+1", openRoles: 2, x: 52, y: 36 },
  { id: "india", name: "India", region: "Asia", flag: "🇮🇳", utcOffset: "UTC+5:30", openRoles: 9, x: 68, y: 50 },
];

export const careerHeroPortraits = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=520&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286db2?w=400&h=520&fit=crop&q=80",
];
