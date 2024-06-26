export const dueDiligenceFlow = {
    "tasks": [
      {
        "id": "1",
        "name": "Encumbrances on assets",
        "subtasks": [
          {
            "id": "1.1",
            "name": "Identify all assets",
            "subtasks": [
              {
                "id": "1.1.1",
                "name": "Review the company's asset registry",
                "subtasks": [
                  {
                    "id": "1.1.1.1",
                    "name": "LLM: Extract and list assets from the asset registry",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "1.1.1.2",
                    "name": "Human: Confirm completeness with finance department",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "1.1.2",
                "name": "Confirm the completeness of the asset list with the finance department",
                "subtasks": [
                  {
                    "id": "1.1.2.1",
                    "name": "Human: Verify and confirm",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "1.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "1.2",
            "name": "Gather agreements or instruments related to each asset",
            "subtasks": [
              {
                "id": "1.2.1",
                "name": "Access the company's document management system",
                "subtasks": [
                  {
                    "id": "1.2.1.1",
                    "name": "LLM: Search for each asset name to locate related agreements",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "1.2.2",
                "name": "Download or scan copies of these documents",
                "subtasks": [
                  {
                    "id": "1.2.2.1",
                    "name": "LLM: Automate downloads, scan if required",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "1.2.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "1.3",
            "name": "Review documents for restrictions or encumbrances",
            "subtasks": [
              {
                "id": "1.3.1",
                "name": "Read through each document",
                "subtasks": [
                  {
                    "id": "1.3.1.1",
                    "name": "LLM: Perform initial review for keywords indicating restrictions",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "1.3.1.2",
                    "name": "Human: Validate findings",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "1.3.2",
                "name": "Highlight any clauses mentioning restrictions or encumbrances",
                "subtasks": [
                  {
                    "id": "1.3.2.1",
                    "name": "LLM: Highlight sections automatically",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "1.3.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "1.4",
            "name": "Compile copies of relevant documents",
            "subtasks": [
              {
                "id": "1.4.1",
                "name": "Organize documents in a dedicated folder",
                "subtasks": [
                  {
                    "id": "1.4.1.1",
                    "name": "LLM: Sort and organize documents",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "1.4.2",
                "name": "Create an index for easy reference",
                "subtasks": [
                  {
                    "id": "1.4.2.1",
                    "name": "LLM: Generate index",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "1.4.1"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "2",
        "name": "Contracts that restrict the target's right to conduct its business",
        "subtasks": [
          {
            "id": "2.1",
            "name": "Identify key business activities",
            "subtasks": [
              {
                "id": "2.1.1",
                "name": "Consult the company's business plan and operations manual",
                "subtasks": [
                  {
                    "id": "2.1.1.1",
                    "name": "LLM: Extract and list business activities",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "2.1.2",
                "name": "List all primary and secondary business activities",
                "subtasks": [
                  {
                    "id": "2.1.2.1",
                    "name": "Human: Verify list with business department",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "2.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "2.2",
            "name": "Gather all contracts related to these activities",
            "subtasks": [
              {
                "id": "2.2.1",
                "name": "Use the document management system to search for contracts",
                "subtasks": [
                  {
                    "id": "2.2.1.1",
                    "name": "LLM: Locate and list relevant contracts",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "2.2.2",
                "name": "Download or scan copies of these contracts",
                "subtasks": [
                  {
                    "id": "2.2.2.1",
                    "name": "LLM: Automate downloads, scan if required",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "2.2.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "2.3",
            "name": "Review contracts for restrictive clauses",
            "subtasks": [
              {
                "id": "2.3.1",
                "name": "Read each contract carefully",
                "subtasks": [
                  {
                    "id": "2.3.1.1",
                    "name": "LLM: Perform initial review for restrictive clauses",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "2.3.1.2",
                    "name": "Human: Validate findings",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "2.3.2",
                "name": "Highlight and annotate restrictive clauses",
                "subtasks": [
                  {
                    "id": "2.3.2.1",
                    "name": "LLM: Annotate clauses automatically",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "2.3.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "2.4",
            "name": "Compile summaries and copies of restrictive contracts",
            "subtasks": [
              {
                "id": "2.4.1",
                "name": "Summarize the impact of each restrictive clause",
                "subtasks": [
                  {
                    "id": "2.4.1.1",
                    "name": "LLM: Generate summaries",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "2.4.1.2",
                    "name": "Human: Verify summaries",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "2.4.2",
                "name": "Organize contracts and summaries in a dedicated folder",
                "subtasks": [
                  {
                    "id": "2.4.2.1",
                    "name": "LLM: Sort and organize documents",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "2.4.1"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "3",
        "name": "Contracts with obligations such as covenants and indemnification",
        "subtasks": [
          {
            "id": "3.1",
            "name": "List all contractual obligations",
            "subtasks": [
              {
                "id": "3.1.1",
                "name": "Review the company's contract summary database",
                "subtasks": [
                  {
                    "id": "3.1.1.1",
                    "name": "LLM: Extract and list obligations",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "3.1.2",
                "name": "Identify all obligations related to covenants and indemnification",
                "subtasks": [
                  {
                    "id": "3.1.2.1",
                    "name": "Human: Verify list",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "3.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "3.2",
            "name": "Gather contracts containing these obligations",
            "subtasks": [
              {
                "id": "3.2.1",
                "name": "Locate contracts in the document management system",
                "subtasks": [
                  {
                    "id": "3.2.1.1",
                    "name": "LLM: Find and list relevant contracts",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "3.2.2",
                "name": "Download or scan copies",
                "subtasks": [
                  {
                    "id": "3.2.2.1",
                    "name": "LLM: Automate downloads, scan if required",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "3.2.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "3.3",
            "name": "Review and summarize each contract",
            "subtasks": [
              {
                "id": "3.3.1",
                "name": "Read through each contract",
                "subtasks": [
                  {
                    "id": "3.3.1.1",
                    "name": "LLM: Perform initial review",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "3.3.1.2",
                    "name": "Human: Validate summaries",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "3.3.2",
                "name": "Summarize obligations in bullet points",
                "subtasks": [
                  {
                    "id": "3.3.2.1",
                    "name": "LLM: Generate bullet point summaries",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "3.3.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "3.4",
            "name": "Compile copies and summaries",
            "subtasks": [
              {
                "id": "3.4.1",
                "name": "Organize documents in a folder with an index",
                "subtasks": [
                  {
                    "id": "3.4.1.1",
                    "name": "LLM: Sort and index documents",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "4",
        "name": "Summary of the target's compliance program and copies of all policies, procedures, and other related documentation",
        "subtasks": [
          {
            "id": "4.1",
            "name": "Identify all compliance policies and procedures",
            "subtasks": [
              {
                "id": "4.1.1",
                "name": "Review the compliance department's documentation",
                "subtasks": [
                  {
                    "id": "4.1.1.1",
                    "name": "LLM: Extract and list policies",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "4.1.2",
                "name": "List all relevant policies and procedures",
                "subtasks": [
                  {
                    "id": "4.1.2.1",
                    "name": "Human: Verify list",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "4.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "4.2",
            "name": "Gather documentation of these policies",
            "subtasks": [
              {
                "id": "4.2.1",
                "name": "Download or request copies from the compliance department",
                "subtasks": [
                  {
                    "id": "4.2.1.1",
                    "name": "LLM: Automate downloads, request copies if needed",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "4.3",
            "name": "Review and summarize the compliance program",
            "subtasks": [
              {
                "id": "4.3.1",
                "name": "Read through the compliance program documentation",
                "subtasks": [
                  {
                    "id": "4.3.1.1",
                    "name": "LLM: Perform initial review",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "4.3.1.2",
                    "name": "Human: Validate summaries",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "4.3.2",
                "name": "Write a summary highlighting key components",
                "subtasks": [
                  {
                    "id": "4.3.2.1",
                    "name": "LLM: Generate summary",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "4.3.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "4.4",
            "name": "Compile copies of relevant documents",
            "subtasks": [
              {
                "id": "4.4.1",
                "name": "Organize documents and summaries in a dedicated folder",
                "subtasks": [
                  {
                    "id": "4.4.1.1",
                    "name": "LLM: Sort and organize documents",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "5",
        "name": "Confirm that the firm is not restricted from doing business under OFAC regulations or similar",
        "subtasks": [
          {
            "id": "5.1",
            "name": "Identify relevant regulations (e.g., OFAC)",
            "subtasks": [
              {
                "id": "5.1.1",
                "name": "Consult legal and compliance resources for applicable regulations",
                "subtasks": [
                  {
                    "id": "5.1.1.1",
                    "name": "Human: Identify regulations",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "5.2",
            "name": "Check firm's status against these regulations",
            "subtasks": [
              {
                "id": "5.2.1",
                "name": "Use the OFAC sanctions list search tool to check the firm's name",
                "subtasks": [
                  {
                    "id": "5.2.1.1",
                    "name": "Human: Perform search",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "5.2.2",
                "name": "Document the results of the search",
                "subtasks": [
                  {
                    "id": "5.2.2.1",
                    "name": "Human: Document results",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "5.2.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "5.3",
            "name": "Document findings",
            "subtasks": [
              {
                "id": "5.3.1",
                "name": "Write a summary of the firm's compliance status",
                "subtasks": [
                  {
                    "id": "5.3.1.1",
                    "name": "LLM: Generate summary",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "5.3.1.2",
                    "name": "Human: Verify summary",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "5.2.2"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "6",
        "name": "Confirm whether the target has any direct or indirect presence and/or other engagements",
        "subtasks": [
          {
            "id": "6.1",
            "name": "List all business locations and engagements",
            "subtasks": [
              {
                "id": "6.1.1",
                "name": "Consult the company's operations and marketing departments",
                "subtasks": [
                  {
                    "id": "6.1.1.1",
                    "name": "LLM: Extract and list locations and engagements",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "6.1.2",
                "name": "Compile a list of all physical locations and partnerships",
                "subtasks": [
                  {
                    "id": "6.1.2.1",
                    "name": "Human: Verify list",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "6.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "6.2",
            "name": "Verify presence and engagement details",
            "subtasks": [
              {
                "id": "6.2.1",
                "name": "Cross-check information with business directories and partner records",
                "subtasks": [
                  {
                    "id": "6.2.1.1",
                    "name": "Human: Verify details",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "6.2.2",
                "name": "Confirm details with relevant department heads",
                "subtasks": [
                  {
                    "id": "6.2.2.1",
                    "name": "Human: Confirm with department heads",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "6.2.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "6.3",
            "name": "Document and compile findings",
            "subtasks": [
              {
                "id": "6.3.1",
                "name": "Write a report summarizing the findings",
                "subtasks": [
                  {
                    "id": "6.3.1.1",
                    "name": "LLM: Generate report",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "6.3.1.2",
                    "name": "Human: Verify report",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "6.2.2"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "7",
        "name": "Summary of regulations applicable and/or its business, and anticipated changes",
        "subtasks": [
          {
            "id": "7.1",
            "name": "Identify applicable regulations",
            "subtasks": [
              {
                "id": "7.1.1",
                "name": "Consult industry regulatory guides and legal resources",
                "subtasks": [
                  {
                    "id": "7.1.1.1",
                    "name": "Human: Identify regulations",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "7.2",
            "name": "Review current regulatory landscape",
            "subtasks": [
              {
                "id": "7.2.1",
                "name": "Analyze the current compliance status with each regulation",
                "subtasks": [
                  {
                    "id": "7.2.1.1",
                    "name": "LLM: Generate compliance analysis",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "7.2.1.2",
                    "name": "Human: Verify analysis",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "7.3",
            "name": "Forecast potential regulatory changes",
            "subtasks": [
              {
                "id": "7.3.1",
                "name": "Research upcoming regulatory changes",
                "subtasks": [
                  {
                    "id": "7.3.1.1",
                    "name": "LLM: Generate forecast report",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "7.3.1.2",
                    "name": "Human: Verify report",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "7.4",
            "name": "Summarize findings",
            "subtasks": [
              {
                "id": "7.4.1",
                "name": "Compile a comprehensive summary report",
                "subtasks": [
                  {
                    "id": "7.4.1.1",
                    "name": "LLM: Generate summary",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "7.4.1.2",
                    "name": "Human: Verify summary",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "7.3.1"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "8",
        "name": "Copies of any letters with any regulatory agencies or authorities",
        "subtasks": [
          {
            "id": "8.1",
            "name": "Identify all communications with regulatory agencies",
            "subtasks": [
              {
                "id": "8.1.1",
                "name": "Consult the legal and compliance departments",
                "subtasks": [
                  {
                    "id": "8.1.1.1",
                    "name": "LLM: Extract and list communications",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "8.1.2",
                "name": "List all relevant communications",
                "subtasks": [
                  {
                    "id": "8.1.2.1",
                    "name": "Human: Verify list",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "8.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "8.2",
            "name": "Gather copies of these letters",
            "subtasks": [
              {
                "id": "8.2.1",
                "name": "Access the document management system or request from departments",
                "subtasks": [
                  {
                    "id": "8.2.1.1",
                    "name": "LLM: Automate downloads, request copies if needed",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "8.3",
            "name": "Review and compile the documents",
            "subtasks": [
              {
                "id": "8.3.1",
                "name": "Organize documents in a dedicated folder with an index",
                "subtasks": [
                  {
                    "id": "8.3.1.1",
                    "name": "LLM: Sort and index documents",
                    "components": [
                      {
                        "type": "Data",
                        "name": "Directory"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "9",
        "name": "List of states and countries in which the target has operations",
        "subtasks": [
          {
            "id": "9.1",
            "name": "Identify all operational locations",
            "subtasks": [
              {
                "id": "9.1.1",
                "name": "Consult the company's operations and HR departments",
                "subtasks": [
                  {
                    "id": "9.1.1.1",
                    "name": "LLM: Extract and list locations",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "9.1.2",
                "name": "Compile a comprehensive list",
                "subtasks": [
                  {
                    "id": "9.1.2.1",
                    "name": "Human: Verify list",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "9.1.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "9.2",
            "name": "Verify the list with department heads",
            "subtasks": [
              {
                "id": "9.2.1",
                "name": "Confirm accuracy of the list",
                "subtasks": [
                  {
                    "id": "9.2.1.1",
                    "name": "Human: Verify with department heads",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "9.3",
            "name": "Document the final list",
            "subtasks": [
              {
                "id": "9.3.1",
                "name": "Write and organize the list",
                "subtasks": [
                  {
                    "id": "9.3.1.1",
                    "name": "LLM: Generate document",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "9.3.1.2",
                    "name": "Human: Verify document",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "9.2.1"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "10",
        "name": "Good-standing certificates or qualification to do business from state of incorporation and states where qualified",
        "subtasks": [
          {
            "id": "10.1",
            "name": "Identify necessary good-standing certificates",
            "subtasks": [
              {
                "id": "10.1.1",
                "name": "Consult legal and compliance resources",
                "subtasks": [
                  {
                    "id": "10.1.1.1",
                    "name": "Human: Identify certificates",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "10.2",
            "name": "Gather these certificates",
            "subtasks": [
              {
                "id": "10.2.1",
                "name": "Request certificates from relevant state authorities",
                "subtasks": [
                  {
                    "id": "10.2.1.1",
                    "name": "Human: Request certificates",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "10.2.2",
                "name": "Download or scan copies",
                "subtasks": [
                  {
                    "id": "10.2.2.1",
                    "name": "LLM: Automate downloads, scan if required",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "10.2.1"
                  }
                ]
              }
            ]
          },
          {
            "id": "10.3",
            "name": "Verify the qualifications to do business",
            "subtasks": [
              {
                "id": "10.3.1",
                "name": "Cross-check with state databases",
                "subtasks": [
                  {
                    "id": "10.3.1.1",
                    "name": "LLM: Verify qualifications",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "10.3.1.2",
                    "name": "Human: Validate findings",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "10.2.2"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "11",
        "name": "Schedule of any significant U.S. import or export restrictions that relate to the target's operations",
        "subtasks": [
          {
            "id": "11.1",
            "name": "Identify relevant import/export restrictions",
            "subtasks": [
              {
                "id": "11.1.1",
                "name": "Consult trade compliance resources",
                "subtasks": [
                  {
                    "id": "11.1.1.1",
                    "name": "Human: Identify restrictions",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "11.2",
            "name": "Review operational compliance with these restrictions",
            "subtasks": [
              {
                "id": "11.2.1",
                "name": "Analyze the company's import/export activities",
                "subtasks": [
                  {
                    "id": "11.2.1.1",
                    "name": "LLM: Generate compliance report",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "11.2.1.2",
                    "name": "Human: Verify report",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "11.3",
            "name": "Summarize and document findings",
            "subtasks": [
              {
                "id": "11.3.1",
                "name": "Write a compliance report",
                "subtasks": [
                  {
                    "id": "11.3.1.1",
                    "name": "LLM: Generate report",
                    "components": [
                      {
                        "type": "Data",
                        "name": "File"
                      },
                      {
                        "type": "Models",
                        "name": "OpenAI"
                      }
                    ]
                  },
                  {
                    "id": "11.3.1.2",
                    "name": "Human: Verify report",
                    "components": [
                      {
                        "type": "Inputs",
                        "name": "Chat Input"
                      },
                      {
                        "type": "Outputs",
                        "name": "Chat Output"
                      }
                    ]
                  }
                ],
                "dependencies": [
                  {
                    "id": "11.2.1"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
