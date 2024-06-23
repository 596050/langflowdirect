import { useState } from "react";
import "./App.css";

import { Node, Edge } from "reactflow";
// import ReactflowView from "./components/reactflow/ReactflowView";
// import MonacoEditorView from "./components/monaco/MonacoView";
import { v4 as uuidv4 } from "uuid";
import { Allotment } from "allotment";
import { editor } from "monaco-editor";
import { IMermaidEdgeDefinition, IMermaidNodeDefinition, MermaidChartDirection, MermaidParserEvent } from "./models/mermaid.model";
import MermaidView from "./graphGenerate";

function GenerateView() {
  const [graphDefinition, setGraphDefinition] = useState(`flowchart TD
    A[Start] --> B{Is it?}
    B -- Yes --> C[OK]
    C --> D[Rethink]
    D --> B
    B -- No ----> E[End]`);

  const [reactflowNodes, setReactflowNodes] = useState<Node[]>([]);
  const [reactflowEdges, setReactflowEdges] = useState<Edge[]>([]);
  const [mermaidChartDirection, setMermaidChartDirection] =
    useState<MermaidChartDirection>(MermaidChartDirection.TD);
  const [editorInstance, setEditorInstance] =
    useState<editor.IStandaloneCodeEditor>();

  function handleMermaidDefinitionChange(event: MermaidParserEvent) {
    const reactflowEdges: Edge[] = event.edges.map(
        (mermaidEdge: IMermaidEdgeDefinition) =>
          ({
            id: uuidv4(),
            source: mermaidEdge.start,
            target: mermaidEdge.end,
            type: "customEdgeType",
            markerStart: "oneOrMany",
            markerEnd: "arrow-end",
            style: { stroke: "#f6ab6c" },
            elementsSelectable: true,
            label: mermaidEdge.text,
            // markerEnd: {
            //   type: MarkerType.ArrowClosed,
            // },
            animated: false,
            data: {
              label: mermaidEdge.text,
              raw: mermaidEdge,
            },
          } as Edge)
      ),
      reactflowNodes: Node[] = event.nodes.map(
        (mermaidNode: IMermaidNodeDefinition, index: number) => ({
          id: mermaidNode.id,
          position: { x: index * 200, y: index * 200 },
          type: "customNodeType",
          dragHandle: ".custom-node",
          data: {
            label: mermaidNode.text,
            raw: mermaidNode,
            layoutDirection: event.direction,
          },
        })
      );

    setReactflowNodes(reactflowNodes);
    setReactflowEdges(reactflowEdges);
    setMermaidChartDirection(event.direction);
  }

  function resetEditorLayout(): void {
    editorInstance?.layout();
  }

  function onEditorInit(editor: editor.IStandaloneCodeEditor) {
    setEditorInstance(editor);

    resetEditorLayout();
  }

  console.log('===  GenerateView.tsx [80] reactflowNodes ===', reactflowNodes);
  console.log('===  GenerateView.tsx [80] reactflowEdges ===', reactflowEdges);
  console.log('===  GenerateView.tsx [80] mermaidChartDirection ===', mermaidChartDirection);

  return (
    <>
      {/* General Editor Layout */}
      <div className="editor-layout">
        <Allotment
          onChange={() => resetEditorLayout()}
          onDragEnd={() => resetEditorLayout()}
        >
          {/* Mermaid Side */}
          <Allotment.Pane minSize={500}>
            <div className="mermaid-editor">
              <h1>Mermaid Editor</h1>

              {/* Monaco Editor Container */}
              {/* <div className="monaco-editor-container">
                <MonacoEditorView
                  code={graphDefinition}
                  onCodeChange={(event: string) => setGraphDefinition(event)}
                  onInit={(editor: editor.IStandaloneCodeEditor) =>
                    onEditorInit(editor)
                  }
                />
              </div> */}

              {/* Preview Container */}
              <div className="preview-container">
                <MermaidView
                  graphDefinition={graphDefinition}
                  onMermaidDefinitionChange={(event: MermaidParserEvent) =>
                    handleMermaidDefinitionChange(event)
                  }
                />
              </div>
            </div>
          </Allotment.Pane>

          {/* Reactflow Side */}
          {/* <Allotment.Pane minSize={500}>
            <div className="react-flow-editor">
              <h1>Reactflow Editor</h1>

              <ReactflowView
                nodes={reactflowNodes}
                edges={reactflowEdges}
                direction={mermaidChartDirection}
              ></ReactflowView>
            </div>
          </Allotment.Pane> */}
        </Allotment>
      </div>
    </>
  );
}

export default GenerateView;



  // flowchart TB
  //   A1[Copies of agreements or instruments that place restrictions or encumbrances on assets]
  //   A1.1[Collect document files of agreements or instruments]
  //   A1.1.1[Access document management system]
  //   A1.1.1 --> |API Request:COMPONENT| APIRequest1
  //   A1.1.2[Search for agreements or instruments]
  //   A1.1.2 --> |API Request:COMPONENT| APIRequest2
  //   A1.1.3[Download or request copies]
  //   A1.1.3 --> |API Request:COMPONENT| APIRequest3
  //   A1.1.4[Store documents in a dedicated folder]
  //   A1.1.4 --> |API Request:COMPONENT| APIRequest4

  //   A2[Identify all assets]
  //   A2.1[Consult the company's asset registry]
  //   A2.1 --> |API Request:COMPONENT| APIRequest5
  //   A2.2[Review recent financial statements]
  //   A2.2 --> |API Request:COMPONENT| APIRequest6
  //   A2.3[Cross-check with department heads]
  //   A2.3 --> |API Request:COMPONENT| APIRequest7
  //   A2.4[Compile a comprehensive list of assets]
  //   A2.4 --> |API Request:COMPONENT| APIRequest8

  //   A3[Review the company's asset registry]
  //   A3.1[Access the asset registry database]
  //   A3.1 --> |API Request:COMPONENT| APIRequest9
  //   A3.2[Verify the accuracy of the entries]
  //   A3.2 --> |API Request:COMPONENT| APIRequest10
  //   A3.3[Update any missing or incorrect information]
  //   A3.3 --> |API Request:COMPONENT| APIRequest11
  //   A3.4[Confirm the completeness of the asset list]
  //   A3.4 --> |API Request:COMPONENT| APIRequest12

  //   A4[LLM: Extract and list assets from the asset registry]
  //   A4.1[Prepare a query to extract assets]
  //   A4.1 --> |API Request:COMPONENT| APIRequest13
  //   A4.2[Run the query on the LLM]
  //   A4.2 --> |API Request:COMPONENT| APIRequest14
  //   A4.3[Retrieve the list of assets]
  //   A4.3 --> |API Request:COMPONENT| APIRequest15
  //   A4.4[Format and organize the extracted data]
  //   A4.4 --> |API Request:COMPONENT| APIRequest16

  //   A5[Confirm completeness with finance department]
  //   A5.1[Compose confirmation email and send to human]
  //   A5.1.1[Make API request to LLM expert on context-specific finance related questions]
  //   A5.1.1 --> |API Request:COMPONENT| APIRequest17
  //   A5.2[Wait for confirmation and make any changes from human, repeat any steps required, if no changes then send using email endpoint at API]
  //   A5.2 --> |API Request:COMPONENT| APIRequest18
  //   A5.3[Wait for final confirmation, send to email endpoint at API]
  //   A5.3 --> |API Request:COMPONENT| APIRequest19

  //   A6[Confirm the completeness of the asset list with the finance department]

  //   A5 --> A5.1 --> A5.1.1
  //   A5.1 --> A5.2
  //   A5.2 --> A5.3`,