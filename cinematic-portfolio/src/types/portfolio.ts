export type IndustryCategory = 
  | 'Culinary'
  | 'Architecture'
  | 'Footwear'
  | 'Botanical Skincare'
  | 'Food Visualization'
  | 'Luxury Fragrance'
  | 'Furniture'
  | 'Café & Dessert'
  | 'Cosmetic Laboratory'
  | 'Haute Joaillerie'
  | 'Coffee Technology'
  | 'Interior Architecture'
  | 'Beverage Systems'
  | 'Property Narrative'
  | 'Coffee E-Commerce';

export interface ProjectData {
  id: string; // e.g. '01-gather'
  number: string; // e.g. '01'
  title: string; // e.g. 'Gather'
  tagline: string;
  industry: IndustryCategory;
  discipline: string;
  year: string;
  accentColor: string;
  shortStatement: string;
  description: string;
  
  // 17-point dossier fields
  challenge: string;
  approach: string;
  artDirection: string;
  motionSystem: string;
  techImplementation: string;
  performanceNotes: string;
  results: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  nextProjectId: string;
  standalonePort?: number;
  standaloneName?: string;
  standaloneFolder?: string;
}

export type SoundType = 
  | 'click'
  | 'whoosh'
  | 'glass'
  | 'metal'
  | 'water'
  | 'ambient'
  | 'coffee';
