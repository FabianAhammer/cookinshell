export interface CookingEntry extends OverviewItem, Detail {
  id: string;
  created: Date;
}

export interface Detail {
  recipe: Array<RecipeEntry>;
  steps: Array<Partial<CookingStep>>;
}

export interface CookingStep {
  type: CookingStepType;
  description: string;
  totalTime: string;
  elapsedTime: string;
}

export interface RecipeEntry {
  ingredient: Ingredient;
  amount: number;
  unit?: string;
}
export interface Ingredient {
  name: string;
  brand?: string;
  note?: string;
}

export interface OverviewItem {
  entryType: EntryType;
  previewData: string;
  name: string;
}

export enum EntryType {
  IMAGE = 'IMAGE',
  ICON = 'ICON',
}

export enum CookingStepType {
  INSTRUCTION = 0,
  TIMER = 1,
}
