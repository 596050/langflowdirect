export interface IMermaidEdgeDefinition {
    start: string;
    end: string;
    type: string;
    text: string;
    labelType: string;
    stroke: string;
    length: number;
  }

  export interface IMermaidNodeDefinition {
    id: string;
    labelType: string;
    domId: string;
    styles: string[];
    classes: string[];
    text: string;
    type: string;
    props: unknown;
  }

  export enum MermaidChartDirection {
    TD = "TD",
    LR = "LR",
  }

  export interface FlowVertex {
    classes: string[];
    dir?: string;
    domId: string;
    haveCallback?: boolean;
    id: string;
    labelType: 'text';
    link?: string;
    linkTarget?: string;
    props?: any;
    styles: string[];
    text?: string;
    type?: string;
  }

  export interface FlowClass {
    id: string;
    styles: string[];
    textStyles: string[];
  }

  export interface FlowSubGraph {
    classes: string[];
    dir?: string;
    id: string;
    labelType: string;
    nodes: string[];
    title: string;
  }



  export interface MermaidParserEvent {
    nodes: IMermaidNodeDefinition[];
    edges: IMermaidEdgeDefinition[];
    direction: MermaidChartDirection;
    title?:  string;
    accTitle?: string;
    getAccTitle?: () => string;
    vertices?: Map<string, FlowVertex>
    tooltip?: Map<string, string>
    classes?: Map<string, FlowClass>
    subGraphs?: FlowSubGraph[]
  }
