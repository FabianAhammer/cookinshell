import { Component, Input } from '@angular/core';
import { CookingStep, CookingStepType } from 'src/app/types/cooking-entry';

@Component({
  selector: 'cookin-step-visualization',
  templateUrl: './cookin-step-visualization.component.html',
  styleUrls: ['./cookin-step-visualization.component.scss'],
})
export class CookinStepVisualizationComponent {
  public INSTRUCTION = CookingStepType.INSTRUCTION;
  public TIMER = CookingStepType.TIMER;
  @Input()
  public cookingStep: Partial<CookingStep>;
}
