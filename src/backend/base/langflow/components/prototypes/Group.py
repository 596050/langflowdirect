from typing import Any, List, Optional

from loguru import logger

from langflow.base.group.utils import GroupTool, ChildNode
from langflow.custom import CustomComponent
from langflow.field_typing import Tool
from langflow.graph.graph.base import Graph
from langflow.helpers.flow import get_flow_inputs
from langflow.schema import Data
from langflow.schema.dotdict import dotdict


class GroupToolComponent(CustomComponent):
    display_name = "Group"
    description = "Construct a Tool from a function that runs the loaded Flow."
    field_order = ["flow_name", "name", "description", "child_nodes", "return_direct"]
    trace_type = "tool"
    beta = True

    def get_flow_names(self) -> List[str]:
        flow_datas = self.list_flows()
        return [flow_data.data["name"] for flow_data in flow_datas]

    # # def get_flow_nodes(self, flow_name: str) -> List[ChildNode]:
    # def get_flow_nodes(self) -> List[ChildNode]:
    #     # flow_data = self.get_flow("Untitled document")
    #     # print('flow_dataflow_dataflow_data', flow_data)
    #     # template_config = self.template_config()
    #     # g = self.graph
    #     # # if not flow_data:
    #     # #     return []
    #     # # graph = Graph.from_payload(flow_data.data["data"])
    #     # inputs = get_flow_inputs(g)

    #     inputs = []
    #     for vertex in self.graph.vertices:
    #         if vertex.is_input:
    #             inputs.append(ChildNode(name=vertex.id, description=vertex.base_name))

    #     return inputs
    #     # return [ChildNode(name="name", description="description")]
    #     # return [ChildNode(name=vertex.name, description=vertex.description) for vertex in inputs]

    def get_flow(self, flow_name: str) -> Optional[Data]:
        """
        Retrieves a flow by its name.

        Args:
            flow_name (str): The name of the flow to retrieve.

        Returns:
            Optional[Text]: The flow record if found, None otherwise.
        """
        flow_datas = self.list_flows()
        for flow_data in flow_datas:
            if flow_data.data["name"] == flow_name:
                return flow_data
        return None

    def update_build_config(self, build_config: dotdict, field_value: Any, field_name: str | None = None):
        logger.debug(f"Updating build config with field value {field_value} and field name {field_name}")
        if field_name == "flow_name":
            build_config["flow_name"]["options"] = self.get_flow_names()

        # if field_name == "child_nodes":
        #     build_config["child_nodes"]["options"] = self.get_flow_nodes()

        return build_config

    def build_config(self):
        return {
            "flow_name": {
                "display_name": "Flow Name",
                "info": "The name of the flow to run.",
                "options": [],
                "real_time_refresh": True,
                "refresh_button": True,
            },
            "name": {
                "display_name": "Name",
                "description": "The name of the tool.",
            },
            "child_nodes": {
                "display_name": "Child Components",
                "description": "",
                "options": [],
                "real_time_refresh": True,
            },
            "description": {
                "display_name": "Description",
                "description": "The description of the tool.",
            },
            "return_direct": {
                "display_name": "Return Direct",
                "description": "Return the result directly from the Tool.",
                "advanced": True,
            },
        }

    # async def build(self, flow_name: str, name: str, description: str, child_nodes: List[ChildNode], return_direct: bool = False) -> Tool:
    async def build(self, flow_name: str, name: str, description: str, child_nodes: List[ChildNode], return_direct: bool = False) -> List[Data]:
        # print("Building GroupTool", child_nodes)

        # GroupTool.update_forward_refs()
        flow_data = self.get_flow(flow_name)
        if not flow_data:
            raise ValueError("Flow not found.")
        # graph = Graph.from_payload(flow_data.data["data"])
        # inputs = get_flow_inputs(graph)

        child_nodes = [node.id for node in flow_data['data']['nodes']]

        for i in range(len(flow_data['data']['nodes'])):
            if flow_data['data']['nodes'][i]['data']['type'] == 'Group':
                flow_data['data']['nodes'][i]['data']['node']['template']['child_nodes']['options'] = [
                    ChildNode(
                        name="TEST",
                        description="TEST"
                    )
                ]


        # if field_name == "child_nodes":
            # build_config["child_nodes"]["options"] = self.get_flow_nodes()

        # tool = GroupTool(
        #     name=name,
        #     description=description,
        #     graph=graph,
        #     bob=bob,
        #     # child_nodes=child_nodes,
        #     return_direct=return_direct,
        #     inputs=inputs,
        #     flow_id=str(flow_data.id),
        #     user_id=str(self._user_id),
        # )

        # description_repr = repr(tool.description).strip("'")
        # args_str = "\n".join([f"- {arg_name}: {arg_data['description']}" for arg_name, arg_data in tool.args.items()])
        # self.status = f"{description_repr}\nArguments:\n{args_str}"
        # return tool  # type: ignore
        # print(flow_data)
        return [flow_data]
