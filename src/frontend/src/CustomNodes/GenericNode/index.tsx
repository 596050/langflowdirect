import emojiRegex from "emoji-regex";
import { useEffect, useMemo, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Markdown from "react-markdown";
import { NodeToolbar, useUpdateNodeInternals } from "reactflow";
import IconComponent, {
  ForwardedIconComponent,
} from "../../components/genericIconComponent";
import InputComponent from "../../components/inputComponent";
import ShadTooltip from "../../components/shadTooltipComponent";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import {
  RUN_TIMESTAMP_PREFIX,
  STATUS_BUILD,
  STATUS_BUILDING,
  STATUS_INACTIVE,
  TOOLTIP_OUTDATED_NODE,
} from "../../constants/constants";
import { BuildStatus } from "../../constants/enums";
import { postCustomComponent } from "../../controllers/API";
import NodeToolbarComponent from "../../pages/FlowPage/components/nodeToolbarComponent";
import useAlertStore from "../../stores/alertStore";
import { useDarkStore } from "../../stores/darkStore";
import useFlowStore from "../../stores/flowStore";
import useFlowsManagerStore from "../../stores/flowsManagerStore";
import { useShortcutsStore } from "../../stores/shortcuts";
import { useTypesStore } from "../../stores/typesStore";
import { VertexBuildTypeAPI } from "../../types/api";
import { NodeDataType } from "../../types/flow";
import { handleKeyDown, scapedJSONStringfy } from "../../utils/reactflowUtils";
import { nodeColors, nodeIconsLucide } from "../../utils/styleUtils";
import { classNames, cn } from "../../utils/utils";
import { countHandlesFn } from "../helpers/count-handles";
import { getSpecificClassFromBuildStatus } from "../helpers/get-class-from-build-status";
import { getNodeInputColors } from "../helpers/get-node-input-colors";
import { getNodeOutputColors } from "../helpers/get-node-output-colors";
import useCheckCodeValidity from "../hooks/use-check-code-validity";
import useIconNodeRender from "../hooks/use-icon-render";
import useIconStatus from "../hooks/use-icons-status";
import useUpdateNodeCode from "../hooks/use-update-node-code";
import useUpdateValidationStatus from "../hooks/use-update-validation-status";
import useValidationStatusString from "../hooks/use-validation-status-string";
import getFieldTitle from "../utils/get-field-title";
import sortFields from "../utils/sort-fields";
import ParameterComponent from "./components/parameterComponent";

export default function GenericNode({
  data,
  selected,
}: {
  data: NodeDataType;
  selected: boolean;
  xPos?: number;
  yPos?: number;
}): JSX.Element {
  const preventDefault = true;
  const types = useTypesStore((state) => state.types);
  const templates = useTypesStore((state) => state.templates);
  const deleteNode = useFlowStore((state) => state.deleteNode);
  const flowPool = useFlowStore((state) => state.flowPool);
  const buildFlow = useFlowStore((state) => state.buildFlow);
  const setNode = useFlowStore((state) => state.setNode);
  const updateNodeInternals = useUpdateNodeInternals();
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const isDark = useDarkStore((state) => state.dark);

  const takeSnapshot = useFlowsManagerStore((state) => state.takeSnapshot);

  const [inputName, setInputName] = useState(false);
  const [nodeName, setNodeName] = useState(data.node!.display_name);
  const [inputDescription, setInputDescription] = useState(false);
  const [nodeDescription, setNodeDescription] = useState(
    data.node?.description!,
  );
  const [isOutdated, setIsOutdated] = useState(false);
  const [isUserEdited, setIsUserEdited] = useState(false);
  const buildStatus = useFlowStore(
    (state) => state.flowBuildStatus[data.id]?.status,
  );
  const lastRunTime = useFlowStore(
    (state) => state.flowBuildStatus[data.id]?.timestamp,
  );
  const [validationStatus, setValidationStatus] =
    useState<VertexBuildTypeAPI | null>(null);
  const [handles, setHandles] = useState<number>(0);
  const [validationString, setValidationString] = useState<string>("");

  const iconStatus = useIconStatus(buildStatus, validationStatus);
  const [showNode, setShowNode] = useState(data.showNode ?? true);
  // State for outline color
  const isBuilding = useFlowStore((state) => state.isBuilding);

  const updateNodeCode = useUpdateNodeCode(
    data?.id,
    data.node!,
    setNode,
    setIsOutdated,
    setIsUserEdited,
    updateNodeInternals,
  );

  const name = nodeIconsLucide[data.type] ? data.type : types[data.type];

  const nodeIconFragment = (icon) => {
    return <span className="text-lg">{icon}</span>;
  };

  const checkNodeIconFragment = (iconColor, iconName, iconClassName) => {
    return (
      <IconComponent
        name={iconName}
        className={iconClassName}
        iconColor={iconColor}
      />
    );
  };

  const renderIconStatus = () => {
    return <div className="cursor-help">{iconStatus}</div>;
  };

  const getNodeBorderClassName = (
    selected: boolean,
    showNode: boolean,
    buildStatus: BuildStatus | undefined,
    validationStatus: VertexBuildTypeAPI | null,
  ) => {
    const specificClassFromBuildStatus = getSpecificClassFromBuildStatus(
      buildStatus,
      validationStatus,
      isDark,
    );

    const baseBorderClass = getBaseBorderClass(selected);
    const nodeSizeClass = getNodeSizeClass(showNode);
    const names = classNames(
      baseBorderClass,
      nodeSizeClass,
      "generic-node-div group/node",
      specificClassFromBuildStatus,
    );
    return names;
  };

  //  const [openWDoubleCLick, setOpenWDoubleCLick] = useState(false);

  const getBaseBorderClass = (selected) => {
    let className = selected
      ? "border border-ring hover:shadow-node"
      : "border hover:shadow-node";
    let frozenClass = selected ? "border-ring-frozen" : "border-frozen";
    return data.node?.frozen ? frozenClass : className;
  };

  const getNodeSizeClass = (showNode) =>
    showNode ? "w-96 rounded-lg" : "w-26 h-26 rounded-full";

  const nameEditable = true;
  const isEmoji = emojiRegex().test(data?.node?.icon!);

  if (!data.node!.template) {
    setErrorData({
      title: `Error in component ${data.node!.display_name}`,
      list: [
        `The component ${data.node!.display_name} has no template.`,
        `Please contact the developer of the component to fix this issue.`,
      ],
    });
    takeSnapshot();
    deleteNode(data.id);
  }

  useCheckCodeValidity(data, templates, setIsOutdated, setIsUserEdited, types);
  useUpdateValidationStatus(data?.id, flowPool, setValidationStatus);
  useValidationStatusString(validationStatus, setValidationString);

  const iconNodeRender = useIconNodeRender(
    data,
    types,
    nodeColors,
    name,
    showNode,
    isEmoji,
    nodeIconFragment,
    checkNodeIconFragment,
  );

  function countHandles(): void {
    const count = countHandlesFn(data);
    setHandles(count);
  }

  useEffect(() => {
    countHandles();
  }, [data, data.node]);

  useEffect(() => {
    if (!selected) {
      setInputName(false);
      setInputDescription(false);
    }
  }, [selected]);

  useEffect(() => {
    setNodeDescription(data.node!.description);
  }, [data.node!.description]);

  useEffect(() => {
    setNodeName(data.node!.display_name);
  }, [data.node!.display_name]);

  useEffect(() => {
    setShowNode(data.showNode ?? true);
  }, [data.showNode]);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const [showHiddenOutputs, setShowHiddenOutputs] = useState(false);

  const handleUpdateCode = () => {
    setLoadingUpdate(true);
    takeSnapshot();
    // to update we must get the code from the templates in useTypesStore
    const thisNodeTemplate = templates[data.type]?.template;
    // if the template does not have a code key
    // return
    if (!thisNodeTemplate?.code) return;

    const currentCode = thisNodeTemplate.code.value;
    if (data.node) {
      postCustomComponent(currentCode, data.node)
        .then((apiReturn) => {
          const { data, type } = apiReturn.data;
          if (data && type && updateNodeCode) {
            updateNodeCode(data, currentCode, "code", type);
            setLoadingUpdate(false);
          }
        })
        .catch((err) => {
          setErrorData({
            title: "Error updating Compoenent code",
            list: [
              "There was an error updating the Component.",
              "If the error persists, please report it on our Discord or GitHub.",
            ],
          });
          setLoadingUpdate(false);
          console.log(err);
        });
    }
  };

  function handleUpdateCodeWShortcut() {
    if (isOutdated && selected) {
      handleUpdateCode();
    }
  }

  const shownOutputs =
    data.node!.outputs?.filter((output) => !output.hidden) ?? [];

  const hiddenOutputs =
    data.node!.outputs?.filter((output) => output.hidden) ?? [];

  function handlePlayWShortcut() {
    if (buildStatus === BuildStatus.BUILDING || isBuilding || !selected) return;
    setValidationStatus(null);
    console.log(data.node?.display_name);
    buildFlow({ stopNodeId: data.id });
  }

  const update = useShortcutsStore((state) => state.update);
  const play = useShortcutsStore((state) => state.play);

  useHotkeys(update, handleUpdateCodeWShortcut, { preventDefault });
  useHotkeys(play, handlePlayWShortcut, { preventDefault });

  const shortcuts = useShortcutsStore((state) => state.shortcuts);

  const renderOutputParameter = (output, idx) => {
    return (
      <ParameterComponent
        index={idx}
        key={
          scapedJSONStringfy({
            output_types: output.types,
            name: output.name,
            id: data.id,
            dataType: data.type,
          }) + idx
        }
        data={data}
        colors={getNodeOutputColors(output, data, types)}
        outputProxy={output.proxy}
        title={output.display_name ?? output.name}
        tooltipTitle={output.selected ?? output.types[0]}
        id={{
          output_types: [output.selected ?? output.types[0]],
          id: data.id,
          dataType: data.type,
          name: output.name,
        }}
        type={output.types.join("|")}
        left={false}
        showNode={showNode}
        outputName={output.name}
      />
    );
  };

  useEffect(() => {
    if (hiddenOutputs && hiddenOutputs.length == 0) {
      setShowHiddenOutputs(false);
    }
  }, [hiddenOutputs]);

  const memoizedNodeToolbarComponent = useMemo(() => {
    return (
      <NodeToolbar>
        <NodeToolbarComponent
          //          openWDoubleClick={openWDoubleCLick}
          //          setOpenWDoubleClick={setOpenWDoubleCLick}
          data={data}
          deleteNode={(id) => {
            takeSnapshot();
            deleteNode(id);
          }}
          setShowNode={(show) => {
            setNode(data.id, (old) => ({
              ...old,
              data: { ...old.data, showNode: show },
            }));
          }}
          setShowState={setShowNode}
          numberOfHandles={handles}
          numberOfOutputHandles={shownOutputs.length ?? 0}
          showNode={showNode}
          openAdvancedModal={false}
          onCloseAdvancedModal={() => {}}
          updateNode={handleUpdateCode}
          isOutdated={isOutdated && isUserEdited}
        />
      </NodeToolbar>
    );
  }, [
    data,
    deleteNode,
    takeSnapshot,
    setNode,
    setShowNode,
    handles,
    showNode,
    updateNodeCode,
    isOutdated,
    isUserEdited,
    selected,
    shortcuts,
    //    openWDoubleCLick,
    //    setOpenWDoubleCLick,
  ]);
  return (
    <>
      {memoizedNodeToolbarComponent}
      <div
        //        onDoubleClick={(event) => {
        //          if (!isWrappedWithClass(event, "nodoubleclick"))
        //            setOpenWDoubleCLick(true);
        //        }}
        className={getNodeBorderClassName(
          selected,
          showNode,
          buildStatus,
          validationStatus,
        )}
      >
        {data.node?.beta && showNode && (
          <div className="beta-badge-wrapper">
            <div className="beta-badge-content">BETA</div>
          </div>
        )}
        <div>
          <div
            data-testid={"div-generic-node"}
            className={
              "generic-node-div-title " +
              (!showNode
                ? " relative h-24 w-24 rounded-full"
                : " justify-between rounded-t-lg")
            }
          >
            <div
              className={
                "generic-node-title-arrangement rounded-full" +
                (!showNode && " justify-center")
              }
              data-testid="generic-node-title-arrangement"
            >
              {iconNodeRender()}
              {showNode && (
                <div className="generic-node-tooltip-div">
                  {nameEditable && inputName ? (
                    <div>
                      <InputComponent
                        onBlur={() => {
                          setInputName(false);
                          if (nodeName.trim() !== "") {
                            setNodeName(nodeName);
                            setNode(data.id, (old) => ({
                              ...old,
                              data: {
                                ...old.data,
                                node: {
                                  ...old.data.node,
                                  display_name: nodeName,
                                },
                              },
                            }));
                          } else {
                            setNodeName(data.node!.display_name);
                          }
                        }}
                        value={nodeName}
                        onChange={setNodeName}
                        password={false}
                        blurOnEnter={true}
                        id={`input-title-${data.node?.display_name}`}
                      />
                    </div>
                  ) : (
                    <div className="group flex items-center gap-1">
                      <ShadTooltip content={data.node?.display_name}>
                        <div
                          onDoubleClick={(event) => {
                            if (nameEditable) {
                              setInputName(true);
                            }
                            takeSnapshot();
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          data-testid={"title-" + data.node?.display_name}
                          className="nodoubleclick generic-node-tooltip-div cursor-text text-primary"
                        >
                          {data.node?.display_name}
                        </div>
                      </ShadTooltip>
                      {isOutdated && !isUserEdited && (
                        <ShadTooltip content={TOOLTIP_OUTDATED_NODE}>
                          <Button
                            onClick={handleUpdateCode}
                            unstyled
                            className={"group p-1"}
                            loading={loadingUpdate}
                          >
                            <IconComponent
                              name="AlertTriangle"
                              className="h-5 w-5 fill-status-yellow text-muted"
                            />
                          </Button>
                        </ShadTooltip>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div>
              {!showNode && (
                <>
                  {Object.keys(data.node!.template)
                    .filter((templateField) => templateField.charAt(0) !== "_")
                    .map(
                      (templateField: string, idx) =>
                        data.node!.template[templateField]?.show &&
                        !data.node!.template[templateField]?.advanced && (
                          <ParameterComponent
                            selected={selected}
                            index={idx}
                            key={scapedJSONStringfy({
                              inputTypes:
                                data.node!.template[templateField].input_types,
                              type: data.node!.template[templateField].type,
                              id: data.id,
                              fieldName: templateField,
                              proxy: data.node!.template[templateField].proxy,
                            })}
                            data={data}
                            colors={getNodeInputColors(
                              data.node?.template[templateField].input_types,
                              data.node?.template[templateField].type,
                              types,
                            )}
                            title={getFieldTitle(
                              data.node?.template!,
                              templateField,
                            )}
                            info={data.node?.template[templateField].info}
                            name={templateField}
                            tooltipTitle={
                              data.node?.template[
                                templateField
                              ].input_types?.join("\n") ??
                              data.node?.template[templateField].type
                            }
                            required={
                              data.node!.template[templateField].required
                            }
                            id={{
                              inputTypes:
                                data.node!.template[templateField].input_types,
                              type: data.node!.template[templateField].type,
                              id: data.id,
                              fieldName: templateField,
                            }}
                            left={true}
                            type={data.node?.template[templateField].type}
                            optionalHandle={
                              data.node?.template[templateField].input_types
                            }
                            proxy={data.node?.template[templateField].proxy}
                            showNode={showNode}
                          />
                        ),
                    )}
                  {shownOutputs &&
                    shownOutputs.length > 0 &&
                    renderOutputParameter(shownOutputs[0], 0)}
                </>
              )}
            </div>
            {showNode && (
              <>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <ShadTooltip
                    content={
                      buildStatus === BuildStatus.BUILDING ? (
                        <span> {STATUS_BUILDING} </span>
                      ) : buildStatus === BuildStatus.INACTIVE ? (
                        <span> {STATUS_INACTIVE} </span>
                      ) : !validationStatus ? (
                        <span className="flex">{STATUS_BUILD}</span>
                      ) : (
                        <div className="max-h-100 p-2">
                          <div className="max-h-80 overflow-auto">
                            {validationString && (
                              <div className="ml-1 pb-2 text-status-red">
                                {validationString}
                              </div>
                            )}
                            {lastRunTime && (
                              <div className="justify-left flex font-normal text-muted-foreground">
                                <div>{RUN_TIMESTAMP_PREFIX}</div>
                                <div className="ml-1 text-status-blue">
                                  {lastRunTime}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="justify-left flex font-normal text-muted-foreground">
                            <div>Duration:</div>
                            <div className="ml-1 text-status-blue">
                              {validationStatus?.data.duration}
                            </div>
                          </div>
                        </div>
                      )
                    }
                    side="bottom"
                  >
                    {renderIconStatus()}
                  </ShadTooltip>
                  <Button
                    onClick={() => {
                      if (buildStatus === BuildStatus.BUILDING || isBuilding)
                        return;
                      setValidationStatus(null);
                      buildFlow({ stopNodeId: data.id });
                    }}
                    unstyled
                    className="group p-1"
                  >
                    <div
                      data-testid={
                        `button_run_` + data?.node?.display_name.toLowerCase()
                      }
                    >
                      <IconComponent
                        name="Play"
                        className={
                          "h-5 w-5 fill-current stroke-2 text-muted-foreground transition-all group-hover:text-medium-indigo group-hover/node:opacity-100"
                        }
                      />
                    </div>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {showNode && (
          <div
            className={cn(
              showNode
                ? data.node?.description === "" && !nameEditable
                  ? "pb-8"
                  : "pb-8 pt-5"
                : "",
              "relative",
            )}
          >
            {/* increase height!! */}
            <div className="generic-node-desc">
              {showNode && nameEditable && inputDescription ? (
                <Textarea
                  className="nowheel min-h-40"
                  autoFocus
                  onBlur={() => {
                    setInputDescription(false);
                    setInputName(false);
                    setNodeDescription(nodeDescription);
                    setNode(data.id, (old) => ({
                      ...old,
                      data: {
                        ...old.data,
                        node: {
                          ...old.data.node,
                          description: nodeDescription,
                        },
                      },
                    }));
                  }}
                  value={nodeDescription}
                  onChange={(e) => setNodeDescription(e.target.value)}
                  onKeyDown={(e) => {
                    handleKeyDown(e, nodeDescription, "");
                    if (
                      e.key === "Enter" &&
                      e.shiftKey === false &&
                      e.ctrlKey === false &&
                      e.altKey === false
                    ) {
                      setInputDescription(false);
                      setNodeDescription(nodeDescription);
                      setNode(data.id, (old) => ({
                        ...old,
                        data: {
                          ...old.data,
                          node: {
                            ...old.data.node,
                            description: nodeDescription,
                          },
                        },
                      }));
                    }
                  }}
                />
              ) : (
                <div
                  className={cn(
                    "nodoubleclick generic-node-desc-text cursor-text word-break-break-word",
                    (data.node?.description === "" ||
                      !data.node?.description) &&
                      nameEditable
                      ? "font-light italic"
                      : "",
                  )}
                  onDoubleClick={(e) => {
                    setInputDescription(true);
                    takeSnapshot();
                  }}
                >
                  {(data.node?.description === "" || !data.node?.description) &&
                  nameEditable ? (
                    "Double Click to Edit Description"
                  ) : (
                    <Markdown className="markdown prose flex flex-col text-primary word-break-break-word dark:prose-invert">
                      {String(data.node?.description)}
                    </Markdown>
                  )}
                </div>
              )}
            </div>
            <>
              {Object.keys(data.node!.template)
                .filter((templateField) => templateField.charAt(0) !== "_")
                .sort((a, b) => sortFields(a, b, data.node?.field_order ?? []))
                .map((templateField: string, idx) => (
                  <div key={idx}>
                    {data.node!.template[templateField]?.show &&
                    !data.node!.template[templateField]?.advanced ? (
                      <ParameterComponent
                        selected={selected}
                        index={idx}
                        key={scapedJSONStringfy({
                          inputTypes:
                            data.node!.template[templateField].input_types,
                          type: data.node!.template[templateField].type,
                          id: data.id,
                          fieldName: templateField,
                          proxy: data.node!.template[templateField].proxy,
                        })}
                        data={data}
                        colors={getNodeInputColors(
                          data.node?.template[templateField].input_types,
                          data.node?.template[templateField].type,
                          types,
                        )}
                        title={getFieldTitle(
                          data.node?.template!,
                          templateField,
                        )}
                        info={data.node?.template[templateField].info}
                        name={templateField}
                        tooltipTitle={
                          data.node?.template[templateField].input_types?.join(
                            "\n",
                          ) ?? data.node?.template[templateField].type
                        }
                        required={data.node!.template[templateField].required}
                        id={{
                          inputTypes:
                            data.node!.template[templateField].input_types,
                          type: data.node!.template[templateField].type,
                          id: data.id,
                          fieldName: templateField,
                        }}
                        left={true}
                        type={data.node?.template[templateField].type}
                        optionalHandle={
                          data.node?.template[templateField].input_types
                        }
                        proxy={data.node?.template[templateField].proxy}
                        showNode={showNode}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              <div
                className={classNames(
                  Object.keys(data.node!.template).length < 1 ? "hidden" : "",
                  "flex-max-width justify-center",
                )}
              >
                {" "}
              </div>
              {!showHiddenOutputs &&
                shownOutputs &&
                shownOutputs.map((output, idx) =>
                  renderOutputParameter(
                    output,
                    data.node!.outputs?.findIndex(
                      (out) => out.name === output.name,
                    ) ?? idx,
                  ),
                )}
              <div
                className={cn(showHiddenOutputs ? "" : "h-0 overflow-hidden")}
              >
                <div className="block">
                  {data.node!.outputs &&
                    data.node!.outputs.map((output, idx) =>
                      renderOutputParameter(
                        output,
                        data.node!.outputs?.findIndex(
                          (out) => out.name === output.name,
                        ) ?? idx,
                      ),
                    )}
                </div>
              </div>
              {hiddenOutputs && hiddenOutputs.length > 0 && (
                <div
                  className={cn(
                    "absolute left-0 right-0 flex justify-center",
                    (shownOutputs && shownOutputs.length > 0) ||
                      showHiddenOutputs
                      ? "bottom-5"
                      : "bottom-1.5",
                  )}
                >
                  <Button
                    unstyled
                    className="left-0 right-0 rounded-full border bg-background"
                    onClick={() => setShowHiddenOutputs(!showHiddenOutputs)}
                  >
                    <ForwardedIconComponent
                      name={"ChevronDown"}
                      strokeWidth={1.5}
                      className={cn(
                        "h-5 w-5 pt-px text-muted-foreground group-hover:text-medium-indigo group-hover/node:opacity-100",
                        showHiddenOutputs ? "rotate-180 transform" : "",
                      )}
                    />
                  </Button>
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
}

// {
//   "Inputs": {
//     "Chat Input": "This component collects user input from the chat. It can transform the Playground into a chat window, suitable for scenarios requiring user input to initiate or influence the flow.",
//     "Text Input": "Adds an input field on the Playground for defining parameters while running and testing your flow. It specifies how Data should be converted into Text."
//   },
//   "Outputs": {
//     "Chat Output": "Sends a message to the chat. It can update Data with the Sender, Sender Name, and Session ID if the Message is a Data.",
//     "Text Output": "Displays text data to the user without sending it to the chat. It is useful for showing text in the chat window during interactions."
//   },
//   "Prompts": {
//     "Prompt": "Creates a prompt template with dynamic variables, useful for structuring prompts and passing dynamic data to a language model."
//   },
//   "Data": {
//     "API Request": "Sends HTTP requests to specified URLs to interact with external APIs or services and retrieve data.",
//     "Directory": "Recursively retrieves files from a specified directory.",
//     "File": "Loads a file, such as text or JSON files.",
//     "URL": "Retrieves content from specified URLs.",
//     "Webhook Input": "Receives input from webhooks, enabling real-time data integration into your flow."
//   },
//   "Models": {
//     "Amazon Bedrock": "Facilitates text generation using the LLM model from Amazon Bedrock with various options for model selection and configuration.",
//     "Anthropic": "Generates text using Anthropic Chat&Completion large language models.",
//     "Azure OpenAI": "Generates text using Azure OpenAI models with support for different model names and configurations.",
//     "Cohere": "Enables text generation using Cohere large language models.",
//     "Google Generative AI": "Generates text using Google Generative AI with options for model selection and configuration.",
//     "Groq": "Provides access to Groq models for text generation.",
//     "Hugging Face API": "Facilitates text generation using Hugging Face Inference API models.",
//     "MistralAI": "Generates text using MistralAI models.",
//     "Ollama": "Generates text using Ollama Local LLMs with various advanced settings for customization.",
//     "OpenAI": "Facilitates text generation using OpenAI's models with various options for model selection and configuration.",
//     "Qianfan": "Facilitates text generation using Baidu Qianfan chat models.",
//     "Vertex AI": "Generates text using Vertex AI Chat large language models API."
//   },
//   "Helpers": {
//     "Chat Memory": "Retrieves stored chat messages based on a specific session ID, enabling memory functionality for chat history.",
//     "Combine Text": "Concatenates two text sources into a single text chunk using a specified delimiter.",
//     "Custom Component": "Serves as a template for creating custom components with a Python script.",
//     "Filter Data": "Filters data based on specified conditions.",
//     "ID Generator": "Generates a unique ID.",
//     "Merge Data": "Merges a list of data records.",
//     "Parse Data": "Parses data based on a specified format.",
//     "Split Text": "Splits text into chunks of a specified length.",
//     "Store Message": "Stores a message for later retrieval."
//   },
//   "Vector Stores": {
//     "Astra DB": "Initializes a vector store using Astra DB for efficient document storage and retrieval.",
//     "Cassandra": "Builds a vector store using Cassandra.",
//     "Chroma DB": "Sets up a vector store using Chroma for efficient vector storage and retrieval.",
//     "Couchbase": "Builds a Couchbase vector store from data.",
//     "FAISS": "Manages document ingestion into a FAISS vector store for optimized document retrieval.",
//     "MongoDB Atlas": "Builds a MongoDB Atlas-based vector store from data.",
//     "PGVector": "Integrates a vector store within a PostgreSQL database.",
//     "Pinecone": "Constructs a Pinecone wrapper from data for vector storage and retrieval.",
//     "Qdrant": "Allows efficient similarity searches and retrieval operations using Qdrant.",
//     "Redis": "Manages a vector store in a Redis database.",
//     "Supabase": "Initializes a Supabase vector store from texts and embeddings.",
//     "Vectara": "Sets up a Vectara vector store for optimized document retrieval.",
//     "Weaviate": "Facilitates a Weaviate vector store setup for text and document indexing and retrieval."
//   },
//   "Embeddings": {
//     "Amazon Bedrock Embeddings": "Loads embedding models from Amazon Bedrock.",
//     "Astra Vectorize": "Uses Astra Vectorize for embeddings.",
//     "Azure OpenAI Embeddings": "Generates embeddings using Azure OpenAI models.",
//     "Cohere Embeddings": "Loads embedding models from Cohere.",
//     "Hugging Face API Embeddings": "Generates embeddings using Hugging Face Inference API models.",
//     "Hugging Face Embeddings": "Loads embedding models from Hugging Face.",
//     "MistralAI Embeddings": "Generates embeddings using MistralAI models.",
//     "Ollama Embeddings": "Generates embeddings using Ollama models.",
//     "OpenAI Embeddings": "Loads embedding models from OpenAI.",
//     "VertexAI Embeddings": "Wraps around Google Vertex AI Embeddings API."
//   },
//   "Agents": {
//     "CSVAgent": "Interacts with CSV files for reading, writing, and processing data.",
//     "JsonAgent": "Manages JSON data, extracting information and navigating the structure.",
//     "SQLAgent": "Interacts with SQL databases, executing queries and retrieving data.",
//     "Tool Calling Agent": "Decides which tool to use based on the tool's description using the ReAct framework.",
//     "VectorStoreAgent": "Operates with a vector store for querying vector-based data representations.",
//     "VectorStoreRouterAgent": "Uses a vector store router to retrieve information from multiple vector stores.",
//     "XMLAgent": "Manages XML data, extracting information and navigating the structure."
//   },
//   "Chains": {
//     "ConversationChain": "Facilitates dynamic, interactive conversations with a language model, ideal for chatbots or virtual assistants.",
//     "LLMChain": "A series of calls to a language model where the output of one call is the input for another.",
//     "LLMCheckerChain": "Ensures correctness of the generated text by running checks.",
//     "LLMMathChain": "Performs mathematical calculations using a language model.",
//     "Natural Language to SQL": "Converts natural language queries to SQL.",
//     "Retrieval QA": "Combines document search with question-answering capabilities.",
//     "RetrievalQAWithSourcesChain": "Similar to Retrieval QA but includes source documents in the output."
//   },
//   "Utilities": {
//     "BingSearchAPIWrapper": "Provides a wrapper around Bing Search API for retrieving search results.",
//     "GoogleSearchAPIWrapper": "Provides a wrapper around Google Search API for retrieving search results.",
//     "GoogleSerperAPIWrapper": "A cost-effective Google Search API wrapper.",
//     "JSON Document Builder": "Builds a document containing a JSON object using a key and another document page content.",
//     "SearchApi": "Offers a real-time search engine results API that returns structured JSON data.",
//     "SearxSearchWrapper": "A wrapper around the Searx search engine.",
//     "SerpAPIWrapper": "Provides a wrapper around SerpAPI for retrieving search results.",
//     "SQLDatabase": "Manages SQL database interactions.",
//     "WikipediaAPIWrapper": "Provides a wrapper around Wikipedia API for retrieving information.",
//     "WolframAlphaAPIWrapper": "Provides a wrapper around WolframAlpha API for performing computations and retrieving data."
//   },
//   "Memories": {
//     "Astra DB Message Reader": "Reads messages from an Astra DB message store.",
//     "Astra DB Message Writer": "Writes messages to an Astra DB message store.",
//     "Cassandra Message Reader": "Reads messages from a Cassandra message store.",
//     "Cassandra Message Writer": "Writes messages to a Cassandra message store.",
//     "Zep Message Reader": "Reads messages from a Zep message store.",
//     "Zep Message Writer": "Writes messages to a Zep message store."
//   },
//   "Prototypes": {
//     "Conditional Router": "Routes data based on specified conditions.",
//     "Create Data": "Creates data records dynamically.",
//     "Flow as Tool": "Turns a function running a flow into a tool.",
//     "Listen": "Listens for a specified notification.",
//     "Notify": "Generates a notification.",
//     "Pass": "Passes data through without modification.",
//     "Python Function": "Executes a Python function.",
//     "Run Flow": "Runs a specified flow.",
//     "Runnable Executor": "Executes a specified runnable.",
//     "SQL Executor": "Executes an SQL query.",
//     "Sub Flow": "Dynamically generates a tool from a flow.",
//     "Update Data": "Updates data records."
//   },
//   "Retrievers": {
//     "Amazon Kendra Retriever": "Retrieves documents using Amazon Kendra.",
//     "Cohere Rerank": "Reranks documents using Cohere.",
//     "Metal Retriever": "Retrieves documents using Metal.",
//     "MultiQueryRetriever": "Generates multiple queries, retrieves relevant documents for each query, and aggregates the results.",
//     "Self Query Retriever": "Retrieves documents based on self-generated queries.",
//     "Vectara Self Query Retriever for Vectara Vector Store": "Retrieves documents using Vectara Self Query.",
//     "VectorStore Retriever": "Retrieves documents from a vector store."
//   },
//   "Text Splitters": {
//     "CharacterTextSplitter": "Splits text into smaller chunks based on a specified character.",
//     "Language Recursive Text Splitter": "Divides text into smaller chunks based on the programming language.",
//     "Recursive Character Text Splitter": "Recursively splits text into smaller chunks if the initial chunk size exceeds a specified threshold."
//   },
//   "Toolkits": {
//     "JsonToolkit": "A toolkit for working with JSON data.",
//     "Metaphor": "A toolkit for generating metaphors.",
//     "OpenAPIToolkit": "A toolkit for working with OpenAPI specifications.",
//     "VectorStoreInfo": "Provides information about a vector store.",
//     "VectorStoreRouterToolkit": "A toolkit for routing vector store queries.",
//     "VectorStoreToolkit": "A toolkit for working with vector stores."
//   },
//   "Tools": {
//     "Python REPL Tool": "Provides a Python REPL for executing code.",
//     "PythonCodeTool": "Executes Python code.",
//     "RetrieverTool": "Retrieves documents based on a query.",
//     "SearchApi": "Offers a real-time search engine results API.",
//     "SearchApi Tool": "Executes a search query using SearchApi."
//   },
//   "Discover More": {
//     "Discover More": "This section is intended for discovering additional components and features."
//   }
// }








// {
//   "tasks": [
//     {
//       "id": "A",
//       "title": "General",
//       "subtasks": [
//         {
//           "id": "B",
//           "title": "Copies of agreements or instruments that place restrictions or encumbrances on assets",
//           "subtasks": [
//             {
//               "id": "B1",
//               "title": "Identify all assets",
//               "subtasks": [
//                 {
//                   "id": "B1a",
//                   "title": "Review the company's asset registry",
//                   "components": [
//                     {"component": "Inputs.Text Input"},
//                     {"component": "Data.File"}
//                   ]
//                 },
//                 {
//                   "id": "B1b",
//                   "title": "Confirm completeness with finance department",
//                   "components": [
//                     {"component": "Prompts.Prompt"},
//                     {"component": "Outputs.Chat Output"}
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "B2",
//               "title": "Gather agreements or instruments related to each asset",
//               "subtasks": [
//                 {
//                   "id": "B2a",
//                   "title": "Access the company's document management system",
//                   "components": [
//                     {"component": "Data.Directory"}
//                   ]
//                 },
//                 {
//                   "id": "B2b",
//                   "title": "Download or scan copies of these documents",
//                   "components": [
//                     {"component": "Data.File"},
//                     {"component": "Outputs.Text Output"}
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "B3",
//               "title": "Review documents for restrictions or encumbrances",
//               "subtasks": [
//                 {
//                   "id": "B3a",
//                   "title": "Read through each document",
//                   "components": [
//                     {"component": "Inputs.Text Input"}
//                   ]
//                 },
//                 {
//                   "id": "B3b",
//                   "title": "Highlight any clauses mentioning restrictions",
//                   "components": [
//                     {"component": "Helpers.Annotate"}
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "B4",
//               "title": "Compile copies of relevant documents",
//               "subtasks": [
//                 {
//                   "id": "B4a",
//                   "title": "Organize documents in a dedicated folder",
//                   "components": [
//                     {"component": "Data.Directory"}
//                   ]
//                 },
//                 {
//                   "id": "B4b",
//                   "title": "Create an index for easy reference",
//                   "components": [
//                     {"component": "Outputs.Text Output"}
//                   ]
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "id": "C",
//           "title": "Contracts that restrict the target's right to conduct its business",
//           "subtasks": [
//             {
//               "id": "C1",
//               "title": "Identify key business activities",
//               "subtasks": [
//                 {
//                   "id": "C1a",
//                   "title": "Consult the company's business plan and operations manual",
//                   "components": [
//                     {"component": "Data.File"}
//                   ]
//                 },
//                 {
//                   "id": "C1b",
//                   "title": "List all primary and secondary business activities",
//                   "components": [
//                     {"component": "Prompts.Prompt"},
//                     {"component": "Outputs.Text Output"}
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "C2",
//               "title": "Gather all contracts related to these activities",
//               "subtasks": [
//                 {
//                   "id": "C2a",
//                   "title": "Use the document management system to search for contracts",
//                   "components": [
//                     {"component": "Data.Directory"}
//                   ]
//                 },
//                 {
//                   "id": "C2b",
//                   "title": "Download or scan copies of these contracts",
//                   "components": [
//                     {"component": "Data.File"},
//                     {"component": "Outputs.Text Output"}
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "C3",
//               "title": "Review contracts for restrictive clauses",
//               "subtasks": [
//                 {
//                   "id": "C3a",
//                   "title": "Read each contract carefully",
//                   "components": [
//                     {"component": "Inputs.Text Input"}
//                   ]
//                 },
//                 {
//                   "id": "C3b",
//                   "title": "Highlight and annotate restrictive clauses",
//                   "components": [
//                     {"component": "Helpers.Annotate"}
//                   ]
//                 }
//               ]
//             },
//             {
//               "id": "C4",
//               "title": "Compile summaries and copies of restrictive contracts",
//               "subtasks": [
//                 {
//                   "id": "C4a",
//                   "title": "Summarize the impact of each restrictive clause",
//                   "components": [
//                     {"component": "Prompts.Prompt"},
//                     {"component": "Outputs.Text Output"}
//                   ]
//                 },
//                 {
//                   "id": "C4b",
//                   "title": "Organize contracts and summaries in a dedicated folder",
//                   "components": [
//                     {"component": "Data.Directory"}
//                   ]
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "id": "D",
//           "title": "Contracts with obligations such as covenants and indemnification",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "E",
//           "title": "Summary of the target's compliance program and copies of all policies, procedures, and other related documentation",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "F",
//           "title": "Confirm that the firm is not restricted from doing business under OFAC regulations or similar",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "G",
//           "title": "Confirm whether the target has any direct or indirect presence and/or other engagements",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "H",
//           "title": "Summary of regulations applicable and/or its business, and anticipated changes",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "I",
//           "title": "Copies of any letters with any regulatory agencies or authorities",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "J",
//           "title": "List of states and countries in which the target has operations",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "K",
//           "title": "Good-standing certificates or qualification to do business from state of incorporation and states where qualified",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         },
//         {
//           "id": "L",
//           "title": "Schedule of any significant U.S. import or export restrictions that relate to the target's operations",
//           "components": [
//             {"component": "Inputs.Text Input"},
//             {"component": "Outputs.Text Output"}
//           ]
//         }
//       ]
//     }
//   ]
// }