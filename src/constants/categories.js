export const categories = [
  {
    id: "education",
    name: "Education",
    description: "School, college, certificates, and academic requests",
    documentTypes: [
      {
        id: "edu-leave-application",
        name: "Leave Application",
        description: "Request temporary absence from classes or school",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "rollNumber", label: "Roll / Registration Number" },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
          { id: "reason", label: "Reason for Leave", type: "textarea" },
        ],
      },
      {
        id: "edu-scholarship-application",
        name: "Scholarship Application",
        description: "Apply for financial aid or merit assistance",
        fields: [
          { id: "studentName", label: "Applicant Name" },
          { id: "courseName", label: "Course / Class" },
          { id: "annualIncome", label: "Annual Family Income" },
          { id: "previousMarks", label: "Previous Year Percentage / GPA" },
          { id: "justification", label: "Why You Need This Scholarship", type: "textarea" },
        ],
      },
      {
        id: "edu-transfer-certificate",
        name: "Transfer Certificate (TC) Request",
        description: "Formal document required when moving institutions",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "admissionNumber", label: "Admission Number" },
          { id: "lastClassPassed", label: "Last Class Passed" },
          { id: "reasonForLeaving", label: "Reason for Relocation / Leaving", type: "textarea" },
        ],
      },
      {
        id: "edu-fee-concession",
        name: "Fee Concession Request",
        description: "Request tuition fee adjustment or waiver",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "rollNumber", label: "Roll Number" },
          { id: "parentOccupation", label: "Parent / Guardian Occupation" },
          { id: "concessionReason", label: "Reason for Request", type: "textarea" },
        ],
      },
      {
        id: "edu-bonafide-certificate",
        name: "Character / Bonafide Certificate",
        description: "Proof of enrollment for external verification",
        fields: [
          { id: "studentName", label: "Student Name" },
          { id: "enrollmentNumber", label: "Enrollment Number" },
          { id: "purpose", label: "Purpose of Certificate (e.g. Visa, Internship)" },
        ],
      },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical records, claims, leaves, and appointments",
    documentTypes: [
      {
        id: "health-medical-leave",
        name: "Medical Leave Certificate Request",
        description: "Formal doctor recommendation for sick leave",
        fields: [
          { id: "patientName", label: "Patient Full Name" },
          { id: "doctorName", label: "Treating Doctor" },
          { id: "startDate", label: "Leave Start Date", type: "date" },
          { id: "endDate", label: "Leave End Date", type: "date" },
          { id: "diagnosis", label: "Condition / Diagnosis Summary", type: "textarea" },
        ],
      },
      {
        id: "health-insurance-claim",
        name: "Health Insurance Claim Request",
        description: "Initiate reimbursement or cashless claim paperwork",
        fields: [
          { id: "policyNumber", label: "Policy Number" },
          { id: "patientName", label: "Patient Name" },
          { id: "hospitalName", label: "Hospital Name" },
          { id: "claimAmount", label: "Estimated Claim Amount" },
          { id: "admissionDate", label: "Admission Date", type: "date" },
        ],
      },
      {
        id: "health-medical-records",
        name: "Medical Records / Discharge Summary Request",
        description: "Obtain clinical case files and test histories",
        fields: [
          { id: "patientId", label: "Patient / UHID Number" },
          { id: "treatmentPeriod", label: "Period of Hospitalization" },
          { id: "requiredDocuments", label: "Specific Documents Needed (e.g. Lab reports, Bills)" },
        ],
      },
      {
        id: "health-reschedule-appointment",
        name: "Doctor Appointment Rescheduling",
        description: "Move an upcoming consultation to a different slot",
        fields: [
          { id: "patientName", label: "Patient Name" },
          { id: "currentBookingId", label: "Current Booking / Token ID" },
          { id: "preferredDate", label: "Preferred New Date", type: "date" },
          { id: "reason", label: "Reason for Rescheduling", optional: true },
        ],
      },
    ],
  },
  {
    id: "banking",
    name: "Banking",
    description: "Account modifications, cards, cheques, and closures",
    documentTypes: [
      {
        id: "bank-mobile-update",
        name: "Mobile Number Update",
        description: "Link a new mobile number to your bank account",
        fields: [
          { id: "accountHolder", label: "Account Holder Name" },
          { id: "accountNumber", label: "Account Number" },
          { id: "oldMobile", label: "Registered Mobile Number", type: "tel" },
          { id: "newMobile", label: "New Mobile Number", type: "tel" },
        ],
      },
      {
        id: "bank-address-change",
        name: "Address Change Request",
        description: "Update official residential or communication address",
        fields: [
          { id: "accountHolder", label: "Account Holder Name" },
          { id: "accountNumber", label: "Account Number" },
          { id: "newAddress", label: "New Residential Address", type: "textarea" },
          { id: "proofType", label: "Proof Document Submitted (e.g. Utility Bill)" },
        ],
      },
      {
        id: "bank-card-reissue",
        name: "ATM / Debit Card Block & Reissue",
        description: "Replace a stolen, lost, or malfunctioning card",
        fields: [
          { id: "accountNumber", label: "Account Number" },
          { id: "cardLast4", label: "Last 4 Digits of Lost/Damaged Card" },
          { id: "incidentReason", label: "Reason (Lost, Stolen, Expired, Damaged)" },
        ],
      },
      {
        id: "bank-cheque-book",
        name: "Cheque Book Request",
        description: "Order a fresh personalized cheque leaf booklet",
        fields: [
          { id: "accountNumber", label: "Account Number" },
          { id: "leavesCount", label: "Number of Cheque Leaves (e.g. 25, 50, 100)" },
          { id: "deliveryOption", label: "Delivery Mode (Branch Pickup / Postal)" },
        ],
      },
      {
        id: "bank-account-closure",
        name: "Account Closure Request",
        description: "Permanently close account and remit final balance",
        fields: [
          { id: "accountHolder", label: "Account Holder Name" },
          { id: "accountNumber", label: "Account Number" },
          { id: "balanceTransferAccount", label: "Account for Remaining Balance Transfer" },
          { id: "closureReason", label: "Reason for Closing Account", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "government-official",
    name: "Government / Official",
    description: "Certificates, RTI applications, and identity modifications",
    documentTypes: [
      {
        id: "gov-income-certificate",
        name: "Income Certificate Application",
        description: "Official revenue department proof of annual earnings",
        fields: [
          { id: "applicantName", label: "Applicant Name" },
          { id: "parentOrSpouse", label: "Father / Spouse Name" },
          { id: "annualIncome", label: "Declared Annual Income" },
          { id: "occupation", label: "Primary Occupation / Source of Income" },
        ],
      },
      {
        id: "gov-domicile-certificate",
        name: "Caste / Domicile Certificate",
        description: "Proof of state permanent residency or lineage",
        fields: [
          { id: "applicantName", label: "Applicant Name" },
          { id: "permanentAddress", label: "Permanent Address", type: "textarea" },
          { id: "yearsOfResidency", label: "Number of Years Residing at Address" },
        ],
      },
      {
        id: "gov-rti-application",
        name: "RTI (Right to Information) Application",
        description: "Formal information request under the RTI act",
        fields: [
          { id: "applicantName", label: "Applicant Name" },
          { id: "departmentName", label: "Public Authority / Department Name" },
          { id: "requestedInfo", label: "Information Sought (Specific Details)", type: "textarea" },
          { id: "timePeriod", label: "Relevant Time Period (e.g. 2024-2025)" },
        ],
      },
      {
        id: "gov-id-correction",
        name: "Official ID Correction Request",
        description: "Rectify errors on Voter ID, Domicile, or State Cards",
        fields: [
          { id: "currentIdRef", label: "Existing ID / Enrollment Number" },
          { id: "incorrectField", label: "Field Requiring Correction (Name, DOB, Address)" },
          { id: "correctedValue", label: "Corrected Value as per Proof" },
        ],
      },
    ],
  },
  {
    id: "workplace",
    name: "Workplace",
    description: "Leaves, resignations, letters, and HR requirements",
    documentTypes: [
      {
        id: "work-leave-request",
        name: "Casual / Sick Leave Request",
        description: "Apply for planned or unplanned workplace leave",
        fields: [
          { id: "employeeId", label: "Employee ID" },
          { id: "leaveType", label: "Leave Type (Casual, Sick, Earned)" },
          { id: "startDate", label: "Start Date", type: "date" },
          { id: "endDate", label: "End Date", type: "date" },
          { id: "handoverTo", label: "Work Handover Colleague", optional: true },
        ],
      },
      {
        id: "work-resignation-letter",
        name: "Resignation Letter",
        description: "Formal notification of departure and notice period",
        fields: [
          { id: "employeeName", label: "Employee Name" },
          { id: "employeeId", label: "Employee ID" },
          { id: "lastWorkingDay", label: "Requested Last Working Day", type: "date" },
          { id: "resignationNote", label: "Brief Reason / Note", type: "textarea", optional: true },
        ],
      },
      {
        id: "work-experience-certificate",
        name: "Experience / Relieving Certificate Request",
        description: "Request official service documentation upon exit",
        fields: [
          { id: "employeeId", label: "Employee ID" },
          { id: "designation", label: "Last Designation Held" },
          { id: "employmentTenure", label: "Tenure (e.g. Jan 2023 - Dec 2025)" },
        ],
      },
      {
        id: "work-salary-slip",
        name: "Salary Slip / Tax Statement Request",
        description: "Copies of payment advice or annual tax certificates",
        fields: [
          { id: "employeeId", label: "Employee ID" },
          { id: "monthsRequired", label: "Months / Financial Year Needed" },
          { id: "deliveryEmail", label: "Delivery Work Email", type: "email" },
        ],
      },
      {
        id: "work-wfh-request",
        name: "Work From Home (WFH) Request",
        description: "Request authorization to work off-site",
        fields: [
          { id: "startDate", label: "WFH Start Date", type: "date" },
          { id: "endDate", label: "WFH End Date", type: "date" },
          { id: "reason", label: "Reason for Remote Request", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "complaint-request",
    name: "Complaint / Request",
    description: "Lost items, consumer disputes, and utility complaints",
    documentTypes: [
      {
        id: "comp-police-report",
        name: "Police Complaint (Lost Item / General GD)",
        description: "Report missing documents, electronics, or personal articles",
        fields: [
          { id: "complainantName", label: "Complainant Name" },
          { id: "itemLost", label: "Item / Document Lost (e.g. Wallet, Certificate)" },
          { id: "incidentDate", label: "Date & Time of Incident", type: "date" },
          { id: "incidentLocation", label: "Approximate Location" },
          { id: "incidentDetails", label: "Description of Event", type: "textarea" },
        ],
      },
      {
        id: "comp-civic-issue",
        name: "Municipal Civic Issue (Garbage, Road, Drainage)",
        description: "Lodge public sanitation and utility infrastructure complaints",
        fields: [
          { id: "locality", label: "Ward / Street / Area" },
          { id: "issueCategory", label: "Category (Road, Sewage, Sanitation, Streetlight)" },
          { id: "description", label: "Problem Description", type: "textarea" },
        ],
      },
      {
        id: "comp-consumer-dispute",
        name: "Consumer Complaint / Defective Product",
        description: "Demand replacement or refund for faulty goods/services",
        fields: [
          { id: "sellerName", label: "Seller / Company Name" },
          { id: "orderOrInvoiceId", label: "Invoice / Order ID" },
          { id: "productName", label: "Product or Service Name" },
          { id: "issueSummary", label: "Defect or Grievance Details", type: "textarea" },
        ],
      },
      {
        id: "comp-utility-service",
        name: "Electricity / Water Supply Complaint",
        description: "Report erratic voltage, contamination, or billing flaws",
        fields: [
          { id: "consumerNumber", label: "Consumer / Meter Number" },
          { id: "serviceAddress", label: "Service Address", type: "textarea" },
          { id: "natureOfFault", label: "Nature of Fault (No supply, Billing error, Leakage)" },
        ],
      },
    ],
  },
  {
    id: "housing-society",
    name: "Housing / Society",
    description: "Residential NOCs, repairs, disputes, and parking slots",
    documentTypes: [
      {
        id: "house-noc-request",
        name: "NOC Request (Tenant / Renovation)",
        description: "Managing committee permission for modifications or move-in",
        fields: [
          { id: "flatNumber", label: "Flat / Unit Number" },
          { id: "nocType", label: "NOC Purpose (Tenant move-in, Interior renovation)" },
          { id: "durationOrStartDate", label: "Start Date or Proposed Period", type: "date" },
        ],
      },
      {
        id: "house-maintenance-repair",
        name: "Maintenance & Repair Request",
        description: "Report building common-area faults or urgent plumbing issues",
        fields: [
          { id: "flatNumber", label: "Flat Number" },
          { id: "repairType", label: "Repair Type (Plumbing, Electrical, Seepage)" },
          { id: "details", label: "Details of Issue", type: "textarea" },
        ],
      },
      {
        id: "house-parking-allocation",
        name: "Parking Space Allocation Request",
        description: "Register a newly acquired car or bike for parking slots",
        fields: [
          { id: "flatNumber", label: "Flat Number" },
          { id: "vehicleType", label: "Vehicle Type (2-Wheeler / 4-Wheeler)" },
          { id: "vehicleRegNumber", label: "Vehicle Registration Number" },
        ],
      },
      {
        id: "house-noise-complaint",
        name: "Complaint Against Disturbance / Noise",
        description: "Report violations of community quiet hours",
        fields: [
          { id: "targetUnit", label: "Unit Causing Disturbance (if known)", optional: true },
          { id: "disturbanceType", label: "Type of Disturbance (Construction, Loud music)" },
          { id: "dateTimeDetails", label: "Dates / Times of Recurring Disturbance" },
        ],
      },
    ],
  },
  {
    id: "general-letter",
    name: "General Letter",
    description: "Formal correspondence, apologies, notices, and permissions",
    documentTypes: [
      {
        id: "gen-formal-request",
        name: "Formal Request Letter",
        description: "Generic professional enquiry or petition",
        fields: [
          { id: "recipientTitle", label: "Recipient Title / Designation" },
          { id: "organization", label: "Recipient Organization" },
          { id: "subject", label: "Subject Line" },
          { id: "body", label: "Request Details", type: "textarea" },
        ],
      },
      {
        id: "gen-permission-letter",
        name: "Permission Letter",
        description: "Formal request to conduct activities or reserve venues",
        fields: [
          { id: "authorityName", label: "To (Authority Name/Designation)" },
          { id: "permissionFor", label: "Activity Requiring Permission" },
          { id: "eventDate", label: "Date of Activity / Event", type: "date" },
          { id: "explanation", label: "Details / Precautions Taken", type: "textarea" },
        ],
      },
      {
        id: "gen-apology-letter",
        name: "Apology Letter",
        description: "Official acknowledgement and regret for an incident",
        fields: [
          { id: "recipientName", label: "Recipient Name" },
          { id: "incidentReference", label: "Incident / Reference Subject" },
          { id: "explanation", label: "Explanation & Rectification Plan", type: "textarea" },
        ],
      },
      {
        id: "gen-formal-invitation",
        name: "Invitation / Formal Notice",
        description: "Official memo or gathering announcement",
        fields: [
          { id: "eventName", label: "Event / Occasion Name" },
          { id: "eventDate", label: "Event Date", type: "date" },
          { id: "venue", label: "Venue Address" },
          { id: "specialInstructions", label: "Additional Instructions / RSVP", optional: true },
        ],
      },
    ],
  },
];