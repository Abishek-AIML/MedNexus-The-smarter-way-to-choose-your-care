/**
 * Initial dataset of exactly 10 representative diagnostic laboratories across India.
 * Includes representative branch listings for demo and discovery.
 * Supported ownership labels: 'Independent', 'Franchise', 'Chain'
 */

export const INITIAL_LABORATORIES = [
  // --- 1. Apollo Diagnostics – Chennai ---
  {
    _id: 'lab-apollo-diagnostics-chennai',
    id: 'lab-apollo-diagnostics-chennai',
    name: 'Apollo Diagnostics – Chennai',
    category: 'Diagnostic & Pathology Lab',
    type: 'Chain',
    ownership: 'Chain',
    description: 'NABL accredited pathology and diagnostic center from Apollo Health & Lifestyle, delivering trusted clinical biochemistry, hematology, and preventive health screenings.',
    address: {
      street: '48 Cathedral Road',
      area: 'Gopalapuram',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600086',
      landmark: 'Near Semmozhi Poonga'
    },
    location: {
      type: 'Point',
      coordinates: [80.2496, 13.0604] // [lng, lat]
    },
    phone: '044-DEMO-APOLLO-LAB',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'chennai.lab@apollodiagnostics.demo',
    website: 'https://www.apollodiagnostics.in',
    homeCollection: true,
    operatingHours: {
      monday: '07:00 AM - 08:30 PM',
      tuesday: '07:00 AM - 08:30 PM',
      wednesday: '07:00 AM - 08:30 PM',
      thursday: '07:00 AM - 08:30 PM',
      friday: '07:00 AM - 08:30 PM',
      saturday: '07:00 AM - 08:30 PM',
      sunday: '07:00 AM - 01:00 PM'
    },
    images: [
      '/images/labs/apollo-diagnostics.jpg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.5,
    googleReviewCount: 3840,
    appRating: 4.8,
    appReviewCount: 165,
    diagnosticServices: ['Blood Tests', 'Pathology', 'Clinical Biochemistry', 'Thyroid Profile', 'Lipid Profile', 'Diabetes HbA1c', 'Urine Routine'],
    accreditations: ['NABL Accredited', 'CAP Certified', 'ISO 15189:2012']
  },

  // --- 2. Aarthi Scans & Labs – Chennai ---
  {
    _id: 'lab-aarthi-scans-chennai',
    id: 'lab-aarthi-scans-chennai',
    name: 'Aarthi Scans & Labs – Chennai',
    category: 'Integrated Scans & Diagnostics',
    type: 'Chain',
    ownership: 'Chain',
    description: 'Pioneering affordable advanced diagnostic imaging across South India, equipped with 3T MRI, 128-slice CT scans, ultrasound, and high-throughput pathology analyzers.',
    address: {
      street: '60 100 Feet Road',
      area: 'Vadapalani',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600026',
      landmark: 'Near Forum Vijaya Mall'
    },
    location: {
      type: 'Point',
      coordinates: [80.2100, 13.0500] // [lng, lat]
    },
    phone: '044-DEMO-AARTHI-LAB',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'info@aarthiscans.demo',
    website: 'https://www.aarthiscans.com',
    homeCollection: true,
    operatingHours: {
      monday: '24 Hours',
      tuesday: '24 Hours',
      wednesday: '24 Hours',
      thursday: '24 Hours',
      friday: '24 Hours',
      saturday: '24 Hours',
      sunday: '24 Hours'
    },
    images: [
      '/images/labs/aarthi-labs.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.3,
    googleReviewCount: 5120,
    appRating: 4.6,
    appReviewCount: 210,
    diagnosticServices: ['3T MRI Scan', '128-Slice CT Scan', 'Ultrasound & Doppler', 'Digital X-Ray', 'Pathology', 'Mammography', 'Dexa Bone Scan'],
    accreditations: ['NABL Accredited', 'AERB Approved']
  },

  // --- 3. Neuberg Diagnostics – Chennai ---
  {
    _id: 'lab-neuberg-diagnostics-chennai',
    id: 'lab-neuberg-diagnostics-chennai',
    name: 'Neuberg Diagnostics – Chennai',
    category: 'Advanced Genomics & Pathology',
    type: 'Chain',
    ownership: 'Chain',
    description: 'Leading international alliance of specialized clinical diagnostic labs offering cutting-edge genomics, molecular biology, histopathology, and personalized health diagnostics.',
    address: {
      street: '46/47 Royapettah High Road',
      area: 'Mylapore',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600004',
      landmark: 'Opposite Luz Church'
    },
    location: {
      type: 'Point',
      coordinates: [80.2341, 13.0418] // [lng, lat]
    },
    phone: '044-DEMO-NEUBERG',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'support@neubergdiagnostics.demo',
    website: 'https://www.neubergdiagnostics.com',
    homeCollection: true,
    operatingHours: {
      monday: '06:30 AM - 09:00 PM',
      tuesday: '06:30 AM - 09:00 PM',
      wednesday: '06:30 AM - 09:00 PM',
      thursday: '06:30 AM - 09:00 PM',
      friday: '06:30 AM - 09:00 PM',
      saturday: '06:30 AM - 09:00 PM',
      sunday: '07:00 AM - 02:00 PM'
    },
    images: [
      '/images/labs/neuberg-diagnostics.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.4,
    googleReviewCount: 2980,
    appRating: 4.7,
    appReviewCount: 135,
    diagnosticServices: ['Molecular Diagnostics', 'Genomics & NGS', 'Histopathology', 'Cancer Biomarkers', 'Blood Tests', 'Infectious Disease PCR'],
    accreditations: ['CAP Certified', 'NABL Accredited', 'ISO 15189']
  },

  // --- 4. Medall Diagnostics – Coimbatore ---
  {
    _id: 'lab-medall-diagnostics-coimbatore',
    id: 'lab-medall-diagnostics-coimbatore',
    name: 'Medall Diagnostics – Coimbatore',
    category: 'Diagnostic & Imaging Centre',
    type: 'Franchise',
    ownership: 'Franchise',
    description: 'South India’s extensive diagnostic network with complete radiology, clinical pathology, corporate health checkups, and fast turnaround sample analysis.',
    address: {
      street: 'Trichy Road, Near Sungam Roundabout',
      area: 'Ramanathapuram',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641045',
      landmark: 'Near Sungam Junction'
    },
    location: {
      type: 'Point',
      coordinates: [76.9558, 11.0168] // [lng, lat]
    },
    phone: '0422-DEMO-MEDALL',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'coimbatore@medall.demo',
    website: 'https://www.medall.in',
    homeCollection: true,
    operatingHours: {
      monday: '07:00 AM - 08:00 PM',
      tuesday: '07:00 AM - 08:00 PM',
      wednesday: '07:00 AM - 08:00 PM',
      thursday: '07:00 AM - 08:00 PM',
      friday: '07:00 AM - 08:00 PM',
      saturday: '07:00 AM - 08:00 PM',
      sunday: '07:00 AM - 01:00 PM'
    },
    images: [
      '/images/labs/medall-diagnostics.jpg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.3,
    googleReviewCount: 2150,
    appRating: 4.5,
    appReviewCount: 110,
    diagnosticServices: ['Pathology', 'Digital X-Ray', 'Ultrasound Scan', 'Blood Tests', 'Cardiac TMT', 'Echocardiogram', 'Executive Health Check'],
    accreditations: ['NABL Accredited', 'ISO 9001:2015']
  },

  // --- 5. Vijaya Diagnostic Centre – Hyderabad ---
  {
    _id: 'lab-vijaya-diagnostics-hyderabad',
    id: 'lab-vijaya-diagnostics-hyderabad',
    name: 'Vijaya Diagnostic Centre – Hyderabad',
    category: 'Comprehensive Diagnostic Centre',
    type: 'Chain',
    ownership: 'Chain',
    description: 'Premier integrated diagnostic chain in Telangana and Andhra Pradesh with over 40 years of trusted radiological scans and computerized pathology services.',
    address: {
      street: '3-6-16/1 Himayat Nagar Main Road',
      area: 'Himayat Nagar',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500029',
      landmark: 'Near Old MLA Quarters'
    },
    location: {
      type: 'Point',
      coordinates: [78.4071, 17.4326] // [lng, lat]
    },
    phone: '040-DEMO-VIJAYA-LAB',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'care@vijayadiagnostic.demo',
    website: 'https://www.vijayadiagnostic.com',
    homeCollection: true,
    operatingHours: {
      monday: '06:30 AM - 09:30 PM',
      tuesday: '06:30 AM - 09:30 PM',
      wednesday: '06:30 AM - 09:30 PM',
      thursday: '06:30 AM - 09:30 PM',
      friday: '06:30 AM - 09:30 PM',
      saturday: '06:30 AM - 09:30 PM',
      sunday: '07:00 AM - 02:00 PM'
    },
    images: [
      '/images/labs/vijaya-diagnostics.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.6,
    googleReviewCount: 6420,
    appRating: 4.8,
    appReviewCount: 230,
    diagnosticServices: ['3T MRI', '128-Slice CT Scan', 'Nuclear Medicine', 'Digital Mammography', 'Automated Pathology', 'Endoscopy', 'Health Packages'],
    accreditations: ['NABL Accredited', 'NABH Accredited Imaging']
  },

  // --- 6. Dr Lal PathLabs – New Delhi ---
  {
    _id: 'lab-dr-lal-pathlabs-delhi',
    id: 'lab-dr-lal-pathlabs-delhi',
    name: 'Dr Lal PathLabs – New Delhi',
    category: 'National Reference Pathology Lab',
    type: 'Chain',
    ownership: 'Chain',
    description: 'India’s foremost national diagnostic chain with a state-of-the-art National Reference Laboratory running advanced automated clinical assays and specialty tests.',
    address: {
      street: 'Block E, Connaught Place',
      area: 'Central Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110001',
      landmark: 'Near Rajiv Chowk Metro Gate 5'
    },
    location: {
      type: 'Point',
      coordinates: [77.2197, 28.6328] // [lng, lat]
    },
    phone: '011-DEMO-LAL-PATH',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'customer.care@lalpathlabs.demo',
    website: 'https://www.lalpathlabs.com',
    homeCollection: true,
    operatingHours: {
      monday: '07:00 AM - 08:30 PM',
      tuesday: '07:00 AM - 08:30 PM',
      wednesday: '07:00 AM - 08:30 PM',
      thursday: '07:00 AM - 08:30 PM',
      friday: '07:00 AM - 08:30 PM',
      saturday: '07:00 AM - 08:30 PM',
      sunday: '07:30 AM - 01:30 PM'
    },
    images: [
      '/images/labs/dr-lal-pathlabs.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.5,
    googleReviewCount: 8900,
    appRating: 4.8,
    appReviewCount: 380,
    diagnosticServices: ['Blood Chemistry', 'Hematology', 'Microbiology', 'Oncology Testing', 'Immunology', 'Genetic Screening', 'Home Sample Collection'],
    accreditations: ['CAP (College of American Pathologists)', 'NABL Accredited', 'ISO 15189']
  },

  // --- 7. Metropolis Healthcare – Mumbai ---
  {
    _id: 'lab-metropolis-mumbai',
    id: 'lab-metropolis-mumbai',
    name: 'Metropolis Healthcare – Mumbai',
    category: 'Global Reference Pathology Lab',
    type: 'Chain',
    ownership: 'Chain',
    description: 'Recognized globally for superior diagnostic precision, offering over 4,000 clinical tests, predictive cancer genomics, and comprehensive wellness profiles.',
    address: {
      street: '250-D Udyog Bhavan, Hind Cycle Marg',
      area: 'Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400030',
      landmark: 'Near Doordarshan Kendra'
    },
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.0760] // [lng, lat]
    },
    phone: '022-DEMO-METROPOLIS',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'support@metropolisindia.demo',
    website: 'https://www.metropolisindia.com',
    homeCollection: true,
    operatingHours: {
      monday: '06:30 AM - 09:00 PM',
      tuesday: '06:30 AM - 09:00 PM',
      wednesday: '06:30 AM - 09:00 PM',
      thursday: '06:30 AM - 09:00 PM',
      friday: '06:30 AM - 09:00 PM',
      saturday: '06:30 AM - 09:00 PM',
      sunday: '07:00 AM - 02:00 PM'
    },
    images: [
      '/images/labs/metropolis.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.4,
    googleReviewCount: 4750,
    appRating: 4.7,
    appReviewCount: 195,
    diagnosticServices: ['Specialized Pathology', 'Molecular Biology', 'Cytogenetics', 'Infectious Diseases', 'Allergy Panels', 'TruHealth Health Checkups'],
    accreditations: ['CAP Accredited', 'NABL Accredited', 'ISO 15189']
  },

  // --- 8. Agilus Diagnostics – Bengaluru ---
  {
    _id: 'lab-agilus-diagnostics-bengaluru',
    id: 'lab-agilus-diagnostics-bengaluru',
    name: 'Agilus Diagnostics – Bengaluru',
    category: 'Clinical Diagnostic Centre',
    type: 'Franchise',
    ownership: 'Franchise',
    description: 'Formerly SRL Diagnostics, Agilus brings India’s largest clinical lab footprint with deep expertise in pathology, radiology scans, and preventative testing.',
    address: {
      street: 'Indiranagar 100 Feet Road',
      area: 'HAL 2nd Stage',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      landmark: 'Near CMH Hospital Road'
    },
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716] // [lng, lat]
    },
    phone: '080-DEMO-AGILUS-BLR',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'bengaluru@agilus.demo',
    website: 'https://www.agilusdiagnostics.com',
    homeCollection: true,
    operatingHours: {
      monday: '07:00 AM - 08:30 PM',
      tuesday: '07:00 AM - 08:30 PM',
      wednesday: '07:00 AM - 08:30 PM',
      thursday: '07:00 AM - 08:30 PM',
      friday: '07:00 AM - 08:30 PM',
      saturday: '07:00 AM - 08:30 PM',
      sunday: '07:30 AM - 01:00 PM'
    },
    images: [
      '/images/labs/agilus-diagnostics.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.3,
    googleReviewCount: 3120,
    appRating: 4.6,
    appReviewCount: 145,
    diagnosticServices: ['Routine Blood Tests', 'Thyroid & Diabetes Care', 'Radiology Scans', 'Clinical Biochemistry', 'Prenatal Screening'],
    accreditations: ['NABL Accredited', 'CAP Accredited']
  },

  // --- 9. Thyrocare – Pune ---
  {
    _id: 'lab-thyrocare-pune',
    id: 'lab-thyrocare-pune',
    name: 'Thyrocare – Pune',
    category: 'Automated Central Pathology Lab',
    type: 'Independent',
    ownership: 'Independent',
    description: 'High-speed automated clinical chemistry laboratory offering preventative Aarogyam health packages, thyroid panels, and standardized quality testing.',
    address: {
      street: 'FC Road, Deccan Gymkhana',
      area: 'Shivajinagar',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
      landmark: 'Opposite Fergusson College'
    },
    location: {
      type: 'Point',
      coordinates: [73.8567, 18.5204] // [lng, lat]
    },
    phone: '020-DEMO-THYROCARE',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'pune.support@thyrocare.demo',
    website: 'https://www.thyrocare.com',
    homeCollection: true,
    operatingHours: {
      monday: '06:00 AM - 07:30 PM',
      tuesday: '06:00 AM - 07:30 PM',
      wednesday: '06:00 AM - 07:30 PM',
      thursday: '06:00 AM - 07:30 PM',
      friday: '06:00 AM - 07:30 PM',
      saturday: '06:00 AM - 07:30 PM',
      sunday: '06:30 AM - 12:30 PM'
    },
    images: [
      '/images/labs/thyrocare.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.2,
    googleReviewCount: 2890,
    appRating: 4.5,
    appReviewCount: 120,
    diagnosticServices: ['Aarogyam Preventive Profiles', 'Thyroid Complete', 'Vitamin D & B12', 'Lipid & Liver Function', 'Kidney Screening'],
    accreditations: ['NABL Accredited', 'CAP Accredited']
  },

  // --- 10. Aster Labs – Kochi ---
  {
    _id: 'lab-aster-labs-kochi',
    id: 'lab-aster-labs-kochi',
    name: 'Aster Labs – Kochi',
    category: 'Advanced Reference Laboratory',
    type: 'Independent',
    ownership: 'Independent',
    description: 'Flagship reference laboratory network of Aster DM Healthcare in Kerala, delivering precision diagnostic services, rapid report delivery, and home sample collection.',
    address: {
      street: 'MG Road, Jos Junction',
      area: 'Ernakulam',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682016',
      landmark: 'Near Medical Trust Flyover'
    },
    location: {
      type: 'Point',
      coordinates: [76.3125, 10.0261] // [lng, lat]
    },
    phone: '0484-DEMO-ASTER-LAB',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'kochi.labs@asterdmhealthcare.demo',
    website: 'https://www.asterlabs.in',
    homeCollection: true,
    operatingHours: {
      monday: '07:00 AM - 08:30 PM',
      tuesday: '07:00 AM - 08:30 PM',
      wednesday: '07:00 AM - 08:30 PM',
      thursday: '07:00 AM - 08:30 PM',
      friday: '07:00 AM - 08:30 PM',
      saturday: '07:00 AM - 08:30 PM',
      sunday: '07:00 AM - 01:00 PM'
    },
    images: [
      '/images/labs/aster-labs.svg',
      '/images/labs/lab-fallback.svg'
    ],
    googleRating: 4.6,
    googleReviewCount: 1940,
    appRating: 4.8,
    appReviewCount: 115,
    diagnosticServices: ['Clinical Pathology', 'Molecular Genetics', 'Biochemistry', 'Serology', 'Histopathology', 'Immuno-assay'],
    accreditations: ['NABL Accredited', 'ISO 15189 Certified']
  }
];

export default INITIAL_LABORATORIES;
