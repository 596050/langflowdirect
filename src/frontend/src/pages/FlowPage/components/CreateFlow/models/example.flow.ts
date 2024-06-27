const exampleDueDiligenceFlow = `
flowchart TB
    subgraph General
        direction TB
        A1[Copies of agreements or instruments that place restrictions or encumbrances on assets]
        A2[Identify all assets]
        A3[Review the company's asset registry]
        A4[LLM: Extract and list assets from the asset registry]
        A5[Human: Confirm completeness with finance department]
        A6[Confirm the completeness of the asset list with the finance department]
        A7[Human: Verify and confirm]
        A8[Gather agreements or instruments related to each asset]
        A9[Access the company's document management system]
        A10[LLM: Search for each asset name to locate related agreements]
        A11[Download or scan copies of these documents]
        A12[LLM: Automate downloads, scan if required]
        A13[Review documents for restrictions or encumbrances]
        A14[Read through each document]
        A15[LLM: Perform initial review for keywords indicating restrictions]
        A16[Human: Validate findings]
        A17[Highlight any clauses mentioning restrictions or encumbrances]
        A18[LLM: Highlight sections automatically]
        A19[Compile copies of relevant documents]
        A20[Organize documents in a dedicated folder]
        A21[LLM: Sort and organize documents]
        A22[Create an index for easy reference]
        A23[LLM: Generate index]

        A1 --> A2 --> A3 --> A4
        A3 --> A5
        A2 --> A6 --> A7
        A1 --> A8 --> A9 --> A10
        A8 --> A11 --> A12
        A1 --> A13 --> A14 --> A15
        A14 --> A16
        A13 --> A17 --> A18
        A1 --> A19 --> A20 --> A21
        A19 --> A22 --> A23
    end

    subgraph Contracts
        direction TB
        B1[Contracts that restrict the target's right to conduct its business]
        B2[Identify key business activities]
        B3[Consult the company's business plan and operations manual]
        B4[LLM: Extract and list business activities]
        B5[List all primary and secondary business activities]
        B6[Human: Verify list with business department]
        B7[Gather all contracts related to these activities]
        B8[Use the document management system to search for contracts]
        B9[LLM: Locate and list relevant contracts]
        B10[Download or scan copies of these contracts]
        B11[LLM: Automate downloads, scan if required]
        B12[Review contracts for restrictive clauses]
        B13[Read each contract carefully]
        B14[LLM: Perform initial review for restrictive clauses]
        B15[Human: Validate findings]
        B16[Highlight and annotate restrictive clauses]
        B17[LLM: Annotate clauses automatically]
        B18[Compile summaries and copies of restrictive contracts]
        B19[Summarize the impact of each restrictive clause]
        B20[LLM: Generate summaries]
        B21[Human: Verify summaries]
        B22[Organize contracts and summaries in a dedicated folder]
        B23[LLM: Sort and organize documents]

        B1 --> B2 --> B3 --> B4
        B3 --> B5 --> B6
        B1 --> B7 --> B8 --> B9
        B7 --> B10 --> B11
        B1 --> B12 --> B13 --> B14
        B13 --> B15
        B12 --> B16 --> B17
        B1 --> B18 --> B19 --> B20
        B19 --> B21
        B18 --> B22 --> B23
    end

    subgraph Obligations
        direction TB
        C1[Contracts with obligations such as covenants and indemnification]
        C2[List all contractual obligations]
        C3[Review the company's contract summary database]
        C4[LLM: Extract and list obligations]
        C5[Identify all obligations related to covenants and indemnification]
        C6[Human: Verify list]
        C7[Gather contracts containing these obligations]
        C8[Locate contracts in the document management system]
        C9[LLM: Find and list relevant contracts]
        C10[Download or scan copies]
        C11[LLM: Automate downloads, scan if required]
        C12[Review and summarize each contract]
        C13[Read through each contract]
        C14[LLM: Perform initial review]
        C15[Human: Validate summaries]
        C16[Summarize obligations in bullet points]
        C17[LLM: Generate bullet point summaries]
        C18[Compile copies and summaries]
        C19[Organize documents in a folder with an index]
        C20[LLM: Sort and index documents]

        C1 --> C2 --> C3 --> C4
        C3 --> C5 --> C6
        C1 --> C7 --> C8 --> C9
        C7 --> C10 --> C11
        C1 --> C12 --> C13 --> C14
        C13 --> C15
        C12 --> C16 --> C17
        C1 --> C18 --> C19 --> C20
    end

    subgraph Compliance
        direction TB
        D1[Summary of the target's compliance program and copies of all policies, procedures, and other related documentation]
        D2[Identify all compliance policies and procedures]
        D3[Review the compliance department's documentation]
        D4[LLM: Extract and list policies]
        D5[List all relevant policies and procedures]
        D6[Human: Verify list]
        D7[Gather documentation of these policies]
        D8[Download or request copies from the compliance department]
        D9[LLM: Automate downloads, request copies if needed]
        D10[Review and summarize the compliance program]
        D11[Read through the compliance program documentation]
        D12[LLM: Perform initial review]
        D13[Human: Validate summaries]
        D14[Write a summary highlighting key components]
        D15[LLM: Generate summary]
        D16[Compile copies of relevant documents]
        D17[Organize documents and summaries in a dedicated folder]
        D18[LLM: Sort and organize documents]

        D1 --> D2 --> D3 --> D4
        D3 --> D5 --> D6
        D1 --> D7 --> D8 --> D9
        D1 --> D10 --> D11 --> D12
        D11 --> D13
        D10 --> D14 --> D15
        D1 --> D16 --> D17 --> D18
    end

    subgraph Regulations
        direction TB
        E1[Confirm that the firm is not restricted from doing business under OFAC regulations or similar]
        E2[Identify relevant regulations (e.g., OFAC)]
        E3[Consult legal and compliance resources for applicable regulations]
        E4[Human: Identify regulations]
        E5[Check firm's status against these regulations]
        E6[Use the OFAC sanctions list search tool to check the firm's name]
        E7[Human: Perform search]
        E8[Document the results of the search]
        E9[Human: Document results]
        E10[Document findings]
        E11[Write a summary of the firm's compliance status]
        E12[LLM: Generate summary]
        E13[Human: Verify summary]

        E1 --> E2 --> E3 --> E4
        E1 --> E5 --> E6 --> E7
        E5 --> E8 --> E9
        E1 --> E10 --> E11 --> E12
        E11 --> E13
    end

    subgraph Presence
        direction TB
        F1[Confirm whether the target has any direct or indirect presence and/or other engagements]
        F2[List all business locations and engagements]
        F3[Consult the company's operations and marketing departments]
        F4[LLM: Extract and list locations and engagements]
        F5[Compile a list of all physical locations and partnerships]
        F6[Human: Verify list]
        F7[Verify presence and engagement details]
        F8[Cross-check information with business directories and partner records]
        F9[Human: Verify details]
        F10[Confirm details with relevant department heads]
        F11[Human: Confirm with department heads]
        F12[Document and compile findings]
        F13[Write a report summarizing the findings]
        F14[LLM: Generate report]
        F15[Human: Verify report]

        F1 --> F2 --> F3 --> F4
        F3 --> F5 --> F6
        F1 --> F7 --> F8 --> F9
        F7 --> F10 --> F11
        F1 --> F12 --> F13 --> F14
        F13 --> F15
    end

    subgraph ApplicableRegulations
        direction TB
        G1[Summary of regulations applicable and/or its business, and anticipated changes]
        G2[Identify applicable regulations]
        G3[Consult industry regulatory guides and legal resources]
        G4[Human: Identify regulations]
        G5[Review current regulatory landscape]
        G6[Analyze the current compliance status with each regulation]
        G7[LLM: Generate compliance analysis]
        G8[Human: Verify analysis]
        G9[Forecast potential regulatory changes]
        G10[Research upcoming regulatory changes]
        G11[LLM: Generate forecast report]
        G12[Human: Verify report]
        G13[Summarize findings]
        G14[Compile a comprehensive summary report]
        G15[LLM: Generate summary]
        G16[Human: Verify summary]

        G1 --> G2 --> G3 --> G4
        G1 --> G5 --> G6 --> G7
        G6 --> G8
        G1 --> G9 --> G10 --> G11
        G10 --> G12
        G1 --> G13 --> G14 --> G15
        G14 --> G16
    end

    subgraph Communications
        direction TB
        H1[Copies of any letters with any regulatory agencies or authorities]
        H2[Identify all communications with regulatory agencies]
        H3[Consult the legal and compliance departments]
        H4[LLM: Extract and list communications]
        H5[List all relevant communications]
        H6[Human: Verify list]
        H7[Gather copies of these letters]
        H8[Access the document management system or request from departments]
        H9[LLM: Automate downloads, request copies if needed]
        H10[Review and compile the documents]
        H11[Organize documents in a dedicated folder with an index]
        H12[LLM: Sort and index documents]

        H1 --> H2 --> H3 --> H4
        H3 --> H5 --> H6
        H1 --> H7 --> H8 --> H9
        H1 --> H10 --> H11 --> H12
    end

    subgraph Operations
        direction TB
        I1[List of states and countries in which the target has operations]
        I2[Identify all operational locations]
        I3[Consult the company's operations and HR departments]
        I4[LLM: Extract and list locations]
        I5[Compile a comprehensive list]
        I6[Human: Verify list]
        I7[Verify the list with department heads]
        I8[Confirm accuracy of the list]
        I9[Human: Verify with department heads]
        I10[Document the final list]
        I11[Write and organize the list]
        I12[LLM: Generate document]
        I13[Human: Verify document]

        I1 --> I2 --> I3 --> I4
        I3 --> I5 --> I6
        I1 --> I7 --> I8 --> I9
        I1 --> I10 --> I11 --> I12
        I11 --> I13
    end

    subgraph GoodStanding
        direction TB
        J1[Good-standing certificates or qualification to do business from state of incorporation and states where qualified]
        J2[Identify necessary good-standing certificates]
        J3[Consult legal and compliance resources]
        J4[Human: Identify certificates]
        J5[Gather these certificates]
        J6[Request certificates from relevant state authorities]
        J7[Human: Request certificates]
        J8[Download or scan copies]
        J9[LLM: Automate downloads, scan if required]
        J10[Verify the qualifications to do business]
        J11[Cross-check with state databases]
        J12[LLM: Verify qualifications]
        J13[Human: Validate findings]

        J1 --> J2 --> J3 --> J4
        J1 --> J5 --> J6 --> J7
        J5 --> J8 --> J9
        J1 --> J10 --> J11 --> J12
        J11 --> J13
    end

    subgraph ImportExport
        direction TB
        K1[Schedule of any significant U.S. import or export restrictions that relate to the target's operations]
        K2[Identify relevant import/export restrictions]
        K3[Consult trade compliance resources]
        K4[Human: Identify restrictions]
        K5[Review operational compliance with these restrictions]
        K6[Analyze the company's import/export activities]
        K7[LLM: Generate compliance report]
        K8[Human: Verify report]
        K9[Summarize and document findings]
        K10[Write a compliance report]
        K11[LLM: Generate report]
        K12[Human: Verify report]

        K1 --> K2 --> K3 --> K4
        K1 --> K5 --> K6 --> K7
        K6 --> K8
        K1 --> K9 --> K10 --> K11
        K10 --> K12
    end

    subgraph Shareholders
        direction TB
        L1[List of current shareholders detailing the amount of shares each owns]
        L2[Gather shareholder records]
        L3[Access the shareholder registry]
        L4[LLM: Extract and list shareholders]
        L5[Compile details into a list]
        L6[Human: Verify list]
        L7[Compile detailed list with share amounts]
        L8[Verify accuracy with the finance department]
        L9[Human: Verify with finance department]
        L10[Document the final list]
        L11[LLM: Generate document]

        L1 --> L2 --> L3 --> L4
        L3 --> L5 --> L6
        L1 --> L7 --> L8 --> L9
        L1 --> L10 --> L11
    end

    subgraph StockTransfers
        direction TB
        M1[List of stock transfer records]
        M2[Identify all stock transfers]
        M3[Access the stock transfer ledger]
        M4[LLM: Extract and list transfers]
        M5[List all transfer events]
        M6[Human: Verify list]
        M7[Gather transfer records]
        M8[Download or request copies of transfer documents]
        M9[LLM: Automate downloads, request copies if needed]
        M10[Compile and summarize these records]
        M11[Organize records chronologically]
        M12[LLM: Sort records]
        M13[Write summaries for each transfer]
        M14[LLM: Generate summaries]
        M15[Human: Verify summaries]

        M1 --> M2 --> M3 --> M4
        M3 --> M5 --> M6
        M1 --> M7 --> M8 --> M9
        M1 --> M10 --> M11 --> M12
        M10 --> M13 --> M14
        M13 --> M15
    end

    subgraph BrokerContracts
        direction TB
        N1[List of stock broker contracts and agreements]
        N2[Identify all broker contracts]
        N3[Consult the finance and legal departments]
        N4[LLM: Extract and list contracts]
        N5[List all relevant contracts]
        N6[Human: Verify list]
        N7[Gather these agreements]
        N8[Access the document management system]
        N9[LLM: Automate downloads, scan if required]
        N10[Review and summarize key terms]
        N11[Read each contract]
        N12[LLM: Perform initial review]
        N13[Human: Validate findings]
        N14[Highlight and summarize key terms]
        N15[LLM: Annotate clauses automatically]

        N1 --> N2 --> N3 --> N4
        N3 --> N5 --> N6
        N1 --> N7 --> N8 --> N9
        N1 --> N10 --> N11 --> N12
        N11 --> N13
        N10 --> N14 --> N15
    end

    subgraph StockPayment
        direction TB
        O1[Evidence that outstanding stock is paid in full]
        O2[Verify payment status of outstanding stock]
        O3[Consult the finance department]
        O4[Human: Verify payment status]
        O5[Gather evidence of full payment]
        O6[Download or request payment confirmation documents]
        O7[LLM: Automate downloads, request copies if needed]
        O8[Compile documentation]
        O9[Organize documents in a dedicated folder]
        O10[LLM: Sort and organize documents]

        O1 --> O2 --> O3 --> O4
        O1 --> O5 --> O6 --> O7
        O1 --> O8 --> O9 --> O10
    end

    subgraph EquityTransfer
        direction TB
        P1[Identify issues associated with transferring equity]
        P2[Identify potential equity transfer issues]
        P3[Consult legal and financial advisors]
        P4[Human: Identify issues]
        P5[Review related contracts and regulations]
        P6[Analyze contracts and regulatory requirements]
        P7[LLM: Perform initial review]
        P8[Human: Validate findings]
        P9[Summarize findings]
        P10[Write a report detailing potential issues and solutions]
        P11[LLM: Generate report]
        P12[Human: Verify report]

        P1 --> P2 --> P3 --> P4
        P1 --> P5 --> P6 --> P7
        P6 --> P8
        P1 --> P9 --> P10 --> P11
        P10 --> P12
    end

    subgraph Litigation
        direction TB
        Q1[List of all threatened, pending, current, and closed litigations from the past five years]
        Q2[Gather records of litigations]
        Q3[Access the legal department's case management system]
        Q4[LLM: Extract and list litigations]
        Q5[Compile a comprehensive list with details]
        Q6[Human: Verify list]
        Q7[Verify with legal counsel]
        Q8[Confirm accuracy of the list]
        Q9[Human: Verify with legal counsel]
        Q10[Document the final list]
        Q11[Write and organize the list]
        Q12[LLM: Generate document]

        Q1 --> Q2 --> Q3 --> Q4
        Q3 --> Q5 --> Q6
        Q1 --> Q7 --> Q8 --> Q9
        Q1 --> Q10 --> Q11 --> Q12
    end

    subgraph Arbitration
        direction TB
        R1[List of arbitrational proceedings from the past five years]
        R2[Identify all arbitration cases]
        R3[Consult the legal department]
        R4[LLM: Extract and list arbitrations]
        R5[List all relevant cases]
        R6[Human: Verify list]
        R7[Gather documentation of proceedings]
        R8[Access the case management system]
        R9[LLM: Automate downloads, request copies if needed]
        R10[Compile and summarize records]
        R11[Organize records by date]
        R12[LLM: Sort records]
        R13[Write summaries for each proceeding]
        R14[LLM: Generate summaries]
        R15[Human: Verify summaries]

        R1 --> R2 --> R3 --> R4
        R3 --> R5 --> R6
        R1 --> R7 --> R8 --> R9
        R1 --> R10 --> R11 --> R12
        R10 --> R13 --> R14
        R13 --> R15
    end

    subgraph Investigations
        direction TB
        S1[Summaries of current and closed governmental investigations and proceedings on the target, directors, and executives from the past five years]
        S2[Identify relevant investigations and proceedings]
        S3[Consult the legal and compliance departments]
        S4[LLM: Extract and list investigations]
        S5[List all relevant cases]
        S6[Human: Verify list]
        S7[Gather related documentation]
        S8[Access the case management system]
        S9[LLM: Automate downloads, request copies if needed]
        S10[Summarize and compile findings]
        S11[Write summaries for each case]
        S12[LLM: Generate summaries]
        S13[Human: Verify summaries]
        S14[Organize documents in a dedicated folder]
        S15[LLM: Sort and organize documents]

        S1 --> S2 --> S3 --> S4
        S3 --> S5 --> S6
        S1 --> S7 --> S8 --> S9
        S1 --> S10 --> S11 --> S12
        S11 --> S13
        S10 --> S14 --> S15
    end

    subgraph AuditResponses
        direction TB
        T1[Responses from the company regarding audit inquiries]
        T2[Identify all audit inquiries]
        T3[Consult the finance and legal departments]
        T4[LLM: Extract and list inquiries]
        T5[List all inquiries]
        T6[Human: Verify list]
        T7[Gather company responses]
        T8[Access the document management system]
        T9[LLM: Automate downloads, request copies if needed]
        T10[Review and compile these responses]
        T11[Organize responses by date]
        T12[LLM: Sort records]
        T13[Write summaries for each response]
        T14[LLM: Generate summaries]
        T15[Human: Verify summaries]

        T1 --> T2 --> T3 --> T4
        T3 --> T5 --> T6
        T1 --> T7 --> T8 --> T9
        T1 --> T10 --> T11 --> T12
        T10 --> T13 --> T14
        T13 --> T15
    end

    subgraph OrdersRulings
        direction TB
        U1[List of all statutory orders, decrees, and rulings to which the company is subject]
        U2[Identify relevant statutory orders, decrees, and rulings]
        U3[Consult legal resources]
        U4[Human: Identify orders and rulings]
        U5[Gather documentation of these rulings]
        U6[Access the document management system]
        U7[LLM: Automate downloads, request copies if needed]
        U8[Compile and summarize findings]
        U9[Organize documents in a dedicated folder]
        U10[LLM: Sort and organize documents]
        U11[Write summaries for each ruling]
        U12[LLM: Generate summaries]
        U13[Human: Verify summaries]

        U1 --> U2 --> U3 --> U4
        U1 --> U5 --> U6 --> U7
        U1 --> U8 --> U9 --> U10
        U8 --> U11 --> U12
        U11 --> U13
    end
`
