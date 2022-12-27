export class IndicatorModel {
  public id: string | undefined;
  public name: string | undefined;
  public label: string | undefined;
  public description: string | undefined;
  public guidance: string | undefined;
  public category: string | undefined;
  public isParent: boolean | undefined;
  // an indicator can have other custom properties
  [k: string]: any;
}
