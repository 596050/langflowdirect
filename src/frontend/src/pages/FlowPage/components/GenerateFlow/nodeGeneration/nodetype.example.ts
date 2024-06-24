
// export type OutputFieldProxyType = {
//     id: string;
//     name: string;
//     nodeDisplayName: string;
//   };

//   export type OutputFieldType = {
//     types: Array<string>;
//     selected?: string;
//     name: string;
//     display_name: string;
//     hidden?: boolean;
//     proxy?: OutputFieldProxyType;
//   };

//   export type InputFieldType = {
//     type: string;
//     required: boolean;
//     placeholder?: string;
//     list: boolean;
//     show: boolean;
//     readonly: boolean;
//     multiline?: boolean;
//     value?: any;
//     dynamic?: boolean;
//     proxy?: { id: string; field: string };
//     input_types?: Array<string>;
//     display_name?: string;
//     name?: string;
//     real_time_refresh?: boolean;
//     refresh_button?: boolean;
//     refresh_button_text?: string;
//     [key: string]: any;
//   };

//   //kind and class are just representative names to represent the actual structure of the object received by the API
//   export type APIDataType = { [key: string]: APIKindType };
//   export type APIObjectType = { [key: string]: APIKindType };
//   export type APIKindType = { [key: string]: APIClassType };
//   export type APITemplateType = {
//     [key: string]: InputFieldType;
//   };

//   export type CustomFieldsType = {
//     [key: string]: Array<string>;
//   };

//   export type APIClassType = {
//     base_classes?: Array<string>;
//     description: string;
//     template: APITemplateType;
//     display_name: string;
//     icon?: string;
//     edited?: boolean;
//     is_input?: boolean;
//     is_output?: boolean;
//     conditional_paths?: Array<string>;
//     input_types?: Array<string>;
//     output_types?: Array<string>;
//     custom_fields?: CustomFieldsType;
//     beta?: boolean;
//     documentation: string;
//     error?: string;
//     official?: boolean;
//     outputs?: Array<OutputFieldType>;
//     frozen?: boolean;
//     flow?: FlowType;
//     field_order?: string[];
//     [key: string]:
//       | Array<string>
//       | string
//       | APITemplateType
//       | boolean
//       | FlowType
//       | CustomFieldsType
//       | boolean
//       | undefined
//       | Array<{ types: Array<string>; selected?: string }>;
//   };

//   type DefaultEdge<T = any> = {
//     id: string;
//     type?: string;
//     source: string;
//     target: string;
//     sourceHandle?: string | null;
//     targetHandle?: string | null;
//     style?: CSSProperties;
//     animated?: boolean;
//     hidden?: boolean;
//     deletable?: boolean;
//     data?: T;
//     className?: string;
//     sourceNode?: Node;
//     targetNode?: Node;
//     selected?: boolean;
//     markerStart?: EdgeMarkerType;
//     markerEnd?: EdgeMarkerType;
//     zIndex?: number;
//     ariaLabel?: string;
//     interactionWidth?: number;
//     focusable?: boolean;
//     updatable?: EdgeUpdatable;
//   } & EdgeLabelOptions;
//   export type EdgeUpdatable = boolean | HandleType;
//   export type SmoothStepPathOptions = {
//     offset?: number;
//     borderRadius?: number;
//   };
//   type SmoothStepEdgeType<T> = DefaultEdge<T> & {
//     type: 'smoothstep';
//     pathOptions?: SmoothStepPathOptions;
//   };
//   export type BezierPathOptions = {
//     curvature?: number;
//   };
//   type BezierEdgeType<T> = DefaultEdge<T> & {
//     type: 'default';
//     pathOptions?: BezierPathOptions;
//   };
//   export type Edge<T = any> = DefaultEdge<T> | SmoothStepEdgeType<T> | BezierEdgeType<T>;
//   export type Node<T = any, U extends string | undefined = string | undefined> = {
//     id: string;
//     position: XYPosition;
//     data: T;
//     type?: U;
//     style?: CSSProperties;
//     className?: string;
//     sourcePosition?: Position;
//     targetPosition?: Position;
//     hidden?: boolean;
//     selected?: boolean;
//     dragging?: boolean;
//     draggable?: boolean;
//     selectable?: boolean;
//     connectable?: boolean;
//     deletable?: boolean;
//     dragHandle?: string;
//     width?: number | null;
//     height?: number | null;
//     /** @deprecated use `parentId` instead */
//     parentNode?: string;
//     parentId?: string;
//     zIndex?: number;
//     extent?: 'parent' | CoordinateExtent;
//     expandParent?: boolean;
//     positionAbsolute?: XYPosition;
//     ariaLabel?: string;
//     focusable?: boolean;
//     resizing?: boolean;
//     [internalsSymbol]?: {
//         z?: number;
//         handleBounds?: NodeHandleBounds;
//         isParent?: boolean;
//     };
//   };
//   export type Viewport = {
//     x: number;
//     y: number;
//     zoom: number;
//   };
//   export type ReactFlowJsonObject<NodeData = any, EdgeData = any> = {
//     nodes: Node<NodeData>[];
//     edges: Edge<EdgeData>[];
//     viewport: Viewport;
//   };

//   export interface XYPosition {
//     x: number;
//     y: number;
//   }
//   // FlowStyleType is the type of the style object that is used to style the
//   // Flow card with an emoji and a color.
//   export type FlowStyleType = {
//     emoji: string;
//     color: string;
//     flow_id: string;
//   };

//   export type FlowType = {
//     name: string;
//     id: string;
//     data: ReactFlowJsonObject | null;
//     description: string;
//     endpoint_name?: string;
//     style?: FlowStyleType;
//     is_component?: boolean;
//     last_tested_version?: string;
//     updated_at?: string;
//     date_created?: string;
//     parent?: string;
//     folder?: string;
//     user_id?: string;
//     icon?: string;
//     icon_bg_color?: string;
//     folder_id?: string;
//     webhook?: boolean;
//   };

//   export enum BuildStatus {
//     BUILDING = "BUILDING",
//     TO_BUILD = "TO_BUILD",
//     BUILT = "BUILT",
//     INACTIVE = "INACTIVE",
//     ERROR = "ERROR",
//   }

//   export type NodeDataType = {
//     showNode?: boolean;
//     type: string;
//     node?: APIClassType;
//     id: string;
//     output_types?: string[];
//     selected_output_type?: string;
//     buildStatus?: BuildStatus;
//   };

//   export type NodeType = {
//     id: string;
//     type?: string;
//     position: XYPosition;
//     data: NodeDataType;
//     selected?: boolean;
//   };
