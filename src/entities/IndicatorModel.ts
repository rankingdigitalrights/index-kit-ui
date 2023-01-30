export class IndicatorModel {
  public id!: string;
  public name!: string;
  public label!: string;
  public description: string | undefined;
  public guidance: string | undefined;
  public category: string | undefined;
  public isParent: boolean | undefined;
  public parent: string | undefined;
  // an indicator can have other custom properties
  [k: string]: any;
}
