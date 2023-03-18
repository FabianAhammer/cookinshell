export interface Recipe extends OverviewItem, Detail {}

export interface Detail extends BaseType {
  recipe: Array<IngridientEntry>;
  steps: Array<CookingStep>;
}

export interface CookingStep extends BaseType {
  id: string;
  title: string;
  description: string;
  totalTime: string;
  elapsedTime: string;
}

export interface IngridientEntry extends BaseType {
  ingredient: Ingredient;
  amount: number;
  unit?: string;
}
export interface Ingredient extends BaseType {
  name: string;
  brand?: string;
  note?: string;
}

export interface OverviewItem extends BaseType {
  entryType: EntryType;
  previewData: string;
  name: string;
  created: Date;
}

export enum EntryType {
  IMAGE = 'IMAGE',
  ICON = 'ICON',
}

export type BaseType = {
  id: string;
};
