import { Time } from './timer';

export interface Recipe extends OverviewItem, Detail {}

export interface Detail extends BaseType {
  ingredients: Array<IngridientEntry>;
  steps: Array<CookingStep>;
}

export interface CookingStep extends BaseType {
  title: string;
  description: string;
  totalTime: Time;
  elapsedTime: Time;
}

export interface IngridientEntry extends BaseType {
  ingredient: string;
  amount: number;
  unit: string;
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
