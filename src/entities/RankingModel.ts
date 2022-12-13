export class RankingModel {
  indexPrefix: string = '';
  freezeHead: boolean = false;
  yearOnYear: boolean = false;
  serviceColWidth: number = 280;
  collapseAllGroups: boolean = false;
  prevYearOutcomeTab: string = 'Previous Outcome';
  includeRGuidanceLink: boolean = false; // TODO
  collapseRGuidance: boolean = false;
  scoringSteps: string[] = [];
  indicators: string[] = [];
  scoringParams: {
    sheetName: string;
    subStepNr: number;
    hasFullScores: boolean;
    includeSources: boolean;
    includeNames: boolean;
    includeResults: boolean;
    dataColWidth: number;
    firstStepNr: number;
    lastStepNr: number;
  } = {
    sheetName: 'Outcome',
    subStepNr: 0,
    hasFullScores: true,
    includeSources: true,
    includeNames: false,
    includeResults: true,
    dataColWidth: 200,
    firstStepNr: 1,
    lastStepNr: 1,
  };
}
