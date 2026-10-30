/**
 * Initial dataset of exactly 12 premier Indian hospitals.
 * Strict geographical distribution:
 * - Total: 12
 * - Tamil Nadu: 4
 *   - Chennai: 2 (Apollo Greams Road, MIOT International)
 *   - Other Tamil Nadu cities: 2 (KMCH Coimbatore, CMC Vellore)
 * - Other Indian States: 8
 *   (Karnataka: 2, Telangana: 2, Maharashtra: 1, Kerala: 1, Delhi: 1, Haryana: 1)
 */

export const INITIAL_HOSPITALS = [
  // --- 1. Chennai, Tamil Nadu ---
  {
    _id: 'hosp-apollo-greams-chennai',
    id: 'hosp-apollo-greams-chennai',
    name: 'Apollo Hospitals, Greams Road',
    category: 'Private',
    type: 'Multi Specialty Hospital',
    description: 'The flagship hospital of the Apollo Group, world-renowned for cardiology, organ transplants, oncology, and robotic surgery with state-of-the-art medical technology.',
    address: {
      street: '21 Greams Lane, Off Greams Road',
      area: 'Thousand Lights',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600006',
      landmark: 'Near Thousand Lights Mosque'
    },
    location: {
      type: 'Point',
      coordinates: [80.2503, 13.0569] // [lng, lat]
    },
    phone: '044-DEMO-APOLLO',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'greams_info@apollohospitals.demo',
    website: 'https://www.apollohospitals.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '1066 (Emergency Helpline)',
      traumaCenter: true,
      ambulanceCount: 12,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/apollo-chennai.jpg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.6,
    googleReviewCount: 14820,
    appRating: 4.8,
    appReviewCount: 312,
    numberOfBeds: 600,
    establishedYear: 1983,
    facilities: ['24x7 Emergency', 'ICU & CCU', 'Pharmacy', 'Diagnostic Lab', 'Blood Bank', 'CT & MRI', 'Robotic Surgery', 'Organ Transplant Unit'],
    specialties: ['Cardiology', 'Oncology', 'Neurology', 'Orthopedics', 'Nephrology', 'Gastroenterology']
  },

  // --- 2. Chennai, Tamil Nadu ---
  {
    _id: 'hosp-miot-chennai',
    id: 'hosp-miot-chennai',
    name: 'MIOT International',
    category: 'Private',
    type: 'Super Specialty Hospital',
    description: 'Premier quaternary healthcare center known internationally for joint replacements, trauma care, thoracic surgery, and multi-organ transplants.',
    address: {
      street: '4/112 Mount Poonamallee Road',
      area: 'Manapakkam',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600089',
      landmark: 'Near DLF Cybercity'
    },
    location: {
      type: 'Point',
      coordinates: [80.1834, 13.0232] // [lng, lat]
    },
    phone: '044-DEMO-MIOT-INT',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'contact@miotinternational.demo',
    website: 'https://www.miotinternational.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '044-DEMO-EMERGENCY',
      traumaCenter: true,
      ambulanceCount: 10,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/miot-chennai.jpg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.4,
    googleReviewCount: 8950,
    appRating: 4.6,
    appReviewCount: 184,
    numberOfBeds: 1000,
    establishedYear: 1999,
    facilities: ['Level 1 Trauma Care', 'ICU', 'Modular OT', 'PET-CT Scan', 'Blood Bank', 'Pharmacy', 'Air Ambulance Access'],
    specialties: ['Orthopedics', 'Trauma Care', 'Cardiology', 'Neurosurgery', 'Hepatology', 'Nephrology']
  },

  // --- 3. Coimbatore, Tamil Nadu ---
  {
    _id: 'hosp-kmch-coimbatore',
    id: 'hosp-kmch-coimbatore',
    name: 'Kovai Medical Center and Hospital',
    category: 'Private',
    type: 'Multi Specialty Hospital',
    description: 'One of Western Tamil Nadu’s most comprehensive multi-specialty medical centers, recognized for interventional radiology, liver transplant, and oncology.',
    address: {
      street: '99 Avinashi Road, Peelamedu',
      area: 'Civil Aerodrome Post',
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      pincode: '641014',
      landmark: 'Near Coimbatore International Airport'
    },
    location: {
      type: 'Point',
      coordinates: [77.0371, 11.0427] // [lng, lat]
    },
    phone: '0422-DEMO-KMCH',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'info@kmch.demo',
    website: 'https://www.kmchhospitals.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '0422-DEMO-999',
      traumaCenter: true,
      ambulanceCount: 8,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/kmch-coimbatore.jpg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.5,
    googleReviewCount: 7200,
    appRating: 4.7,
    appReviewCount: 142,
    numberOfBeds: 1000,
    establishedYear: 1990,
    facilities: ['24x7 Emergency', 'Advanced ICU', 'Cancer Centre', 'Cardiac Cath Lab', 'Pharmacy', 'Helipad'],
    specialties: ['Oncology', 'Cardiology', 'Interventional Radiology', 'Pediatrics', 'Gastroenterology']
  },

  // --- 4. Vellore, Tamil Nadu ---
  {
    _id: 'hosp-cmc-vellore',
    id: 'hosp-cmc-vellore',
    name: 'Christian Medical College',
    category: 'Government / Public',
    type: 'Super Specialty Hospital',
    description: 'Renowned charitable tertiary care hospital and teaching institution celebrated for pioneering medical breakthroughs, low-cost compassionate care, and hematology.',
    address: {
      street: 'Ida Scudder Road',
      area: 'Heritage Campus',
      city: 'Vellore',
      state: 'Tamil Nadu',
      pincode: '632004',
      landmark: 'Opposite Vellore Town Hall'
    },
    location: {
      type: 'Point',
      coordinates: [79.1354, 12.9246] // [lng, lat]
    },
    phone: '0416-DEMO-CMC-VEL',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'directorate@cmcvellore.demo',
    website: 'https://www.cmch-vellore.edu',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '0416-DEMO-EMG',
      traumaCenter: true,
      ambulanceCount: 15,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/cmc-vellore.jpg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.7,
    googleReviewCount: 11500,
    appRating: 4.9,
    appReviewCount: 420,
    numberOfBeds: 3000,
    establishedYear: 1900,
    facilities: ['24x7 Emergency & Trauma', 'Affordable Wards', 'Bone Marrow Transplant', 'Specialty OPDs', 'Pathology Network'],
    specialties: ['Hematology', 'Stem Cell Research', 'Gastroenterology', 'Neurology', 'Endocrinology']
  },

  // --- 5. Bengaluru, Karnataka ---
  {
    _id: 'hosp-manipal-bengaluru',
    id: 'hosp-manipal-bengaluru',
    name: 'Manipal Hospital, Old Airport Road',
    category: 'Private',
    type: 'Multi Specialty Hospital',
    description: 'A benchmark of clinical excellence in Karnataka, offering comprehensive tertiary and quaternary care with advanced robotic surgical platforms.',
    address: {
      street: '98 HAL Old Airport Road',
      area: 'Kodihalli',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560017',
      landmark: 'Near Leela Palace'
    },
    location: {
      type: 'Point',
      coordinates: [77.6528, 12.9592] // [lng, lat]
    },
    phone: '080-DEMO-MANIPAL',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'info@manipalhospitals.demo',
    website: 'https://www.manipalhospitals.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '080-DEMO-EMERGENCY',
      traumaCenter: true,
      ambulanceCount: 9,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/manipal-bengaluru.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.6,
    googleReviewCount: 9340,
    appRating: 4.7,
    appReviewCount: 210,
    numberOfBeds: 650,
    establishedYear: 1991,
    facilities: ['Emergency Department', 'ICU', 'Robotic Surgery', 'Pediatric ICU', 'Cath Lab', 'Day Care Surgery'],
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Orthopedics', 'Nephrology']
  },

  // --- 6. Bengaluru, Karnataka ---
  {
    _id: 'hosp-fortis-bannerghatta',
    id: 'hosp-fortis-bannerghatta',
    name: 'Fortis Hospital, Bannerghatta Road',
    category: 'Private',
    type: 'Super Specialty Hospital',
    description: 'Multi-super specialty hospital providing specialized care across cardiovascular sciences, neurosurgery, orthopedics, and minimal access surgery.',
    address: {
      street: '154/9 Bannerghatta Road',
      area: 'Opposite IIM-B',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560076',
      landmark: 'Opposite IIM Bangalore'
    },
    location: {
      type: 'Point',
      coordinates: [77.5976, 12.8932] // [lng, lat]
    },
    phone: '080-DEMO-FORTIS-BLR',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'bannerghatta@fortishealthcare.demo',
    website: 'https://www.fortishealthcare.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '105711 (Fortis Emergency)',
      traumaCenter: true,
      ambulanceCount: 7,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/fortis-bengaluru.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.3,
    googleReviewCount: 6800,
    appRating: 4.5,
    appReviewCount: 162,
    numberOfBeds: 400,
    establishedYear: 2006,
    facilities: ['24x7 Cardiac Emergency', 'ICU', 'Dialysis Centre', 'Advanced Radiology', 'Pharmacy'],
    specialties: ['Cardiology', 'Neurosurgery', 'Urology', 'Orthopedics', 'General Surgery']
  },

  // --- 7. Hyderabad, Telangana ---
  {
    _id: 'hosp-apollo-jubilee-hills',
    id: 'hosp-apollo-jubilee-hills',
    name: 'Apollo Hospitals, Jubilee Hills',
    category: 'Private',
    type: 'Multi Specialty Hospital',
    description: 'Integrated healthcare city known for Apollo Cancer Centre, Joint Commission International (JCI) accreditation, and high-volume cardiac procedures.',
    address: {
      street: 'Road No. 72, Film Nagar',
      area: 'Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      landmark: 'Near Durgam Cheruvu'
    },
    location: {
      type: 'Point',
      coordinates: [78.4116, 17.4265] // [lng, lat]
    },
    phone: '040-DEMO-APOLLO-HYD',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'jubileehills@apollohospitals.demo',
    website: 'https://www.apollohospitals.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '1066 (Apollo Emergency)',
      traumaCenter: true,
      ambulanceCount: 11,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/apollo-hyderabad.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.5,
    googleReviewCount: 12100,
    appRating: 4.8,
    appReviewCount: 290,
    numberOfBeds: 550,
    establishedYear: 1988,
    facilities: ['24x7 Emergency', 'JCI Accredited ICU', 'Comprehensive Cancer Institute', 'PET Scan', 'Pharmacy'],
    specialties: ['Oncology', 'Cardiovascular Sciences', 'Neurology', 'Organ Transplant', 'Gastroenterology']
  },

  // --- 8. Hyderabad, Telangana ---
  {
    _id: 'hosp-yashoda-hyderabad',
    id: 'hosp-yashoda-hyderabad',
    name: 'Yashoda Hospitals',
    category: 'Private',
    type: 'Super Specialty Hospital',
    description: 'A trusted healthcare institution in Telangana offering high-end medical expertise in heart, lung, kidney transplants, and rapid trauma interventions.',
    address: {
      street: 'Alexander Road',
      area: 'Secunderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500003',
      landmark: 'Near Clock Tower'
    },
    location: {
      type: 'Point',
      coordinates: [78.4878, 17.3821] // [lng, lat]
    },
    phone: '040-DEMO-YASHODA',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'info@yashodahospitals.demo',
    website: 'https://www.yashodahospitals.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '040-DEMO-EMG',
      traumaCenter: true,
      ambulanceCount: 8,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/yashoda-hyderabad.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.4,
    googleReviewCount: 8400,
    appRating: 4.6,
    appReviewCount: 175,
    numberOfBeds: 800,
    establishedYear: 1989,
    facilities: ['Emergency & Trauma', 'Advanced Cath Labs', 'Organ Transplant ICU', 'Pharmacy', 'Diagnostic Imaging'],
    specialties: ['Pulmonology', 'Heart & Lung Transplant', 'Nephrology', 'Medical Oncology', 'Neurosurgery']
  },

  // --- 9. Mumbai, Maharashtra ---
  {
    _id: 'hosp-kokilaben-mumbai',
    id: 'hosp-kokilaben-mumbai',
    name: 'Kokilaben Dhirubhai Ambani Hospital',
    category: 'Private',
    type: 'Multi Specialty Hospital',
    description: 'Premier quaternary hospital in Mumbai featuring FTDS (Full Time Specialist System), robotic radiosurgery, and multi-organ transplant programs.',
    address: {
      street: 'Rao Saheb Achutrao Patwardhan Marg',
      area: 'Four Bungalows, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      landmark: 'Near Versova Metro Station'
    },
    location: {
      type: 'Point',
      coordinates: [72.8251, 19.1312] // [lng, lat]
    },
    phone: '022-DEMO-KOKILABEN',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'contact@kdahhospital.demo',
    website: 'https://www.kokilabenhospital.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '022-DEMO-HELP',
      traumaCenter: true,
      ambulanceCount: 14,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/kokilaben-mumbai.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.5,
    googleReviewCount: 7900,
    appRating: 4.7,
    appReviewCount: 195,
    numberOfBeds: 750,
    establishedYear: 2009,
    facilities: ['24x7 Emergency', 'Intra-operative MRI', 'Children’s Heart Centre', 'Robotic Surgery', 'Blood Bank'],
    specialties: ['Robotic Surgery', 'Pediatric Cardiac Sciences', 'Neurosciences', 'Bone & Joint', 'Cancer Care']
  },

  // --- 10. Kochi, Kerala ---
  {
    _id: 'hosp-aster-medcity-kochi',
    id: 'hosp-aster-medcity-kochi',
    name: 'Aster Medcity',
    category: 'Private',
    type: 'Multi Specialty Hospital',
    description: 'South Asia’s premier medical destination set on a scenic 67-acre waterfront campus, offering Centres of Excellence in 8 core medical disciplines.',
    address: {
      street: 'Kuttisahib Road, Near Kothad Bridge',
      area: 'Cheranallur',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682027',
      landmark: 'Near Aster Waterfront'
    },
    location: {
      type: 'Point',
      coordinates: [76.2758, 10.0544] // [lng, lat]
    },
    phone: '0484-DEMO-ASTER-KOC',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'astermedcity@asterdmhealthcare.demo',
    website: 'https://www.astermedcity.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '0484-DEMO-999',
      traumaCenter: true,
      ambulanceCount: 9,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/aster-kochi.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.6,
    googleReviewCount: 5200,
    appRating: 4.8,
    appReviewCount: 140,
    numberOfBeds: 670,
    establishedYear: 2014,
    facilities: ['Waterfront Medical City', 'JCI Accredited ICU', 'Emergency Care', 'Minimal Invasive Surgery', 'Helipad'],
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Gastro Sciences', 'Orthopedics', 'Women & Child']
  },

  // --- 11. New Delhi, Delhi ---
  {
    _id: 'hosp-fortis-escorts-delhi',
    id: 'hosp-fortis-escorts-delhi',
    name: 'Fortis Escorts Heart Institute',
    category: 'Private',
    type: 'Cardiology Hospital',
    description: 'Pioneering cardiac hospital renowned across Asia for adult and pediatric cardiac surgery, interventional cardiology, electrophysiology, and heart failure management.',
    address: {
      street: 'Okhla Road',
      area: 'New Friends Colony',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110025',
      landmark: 'Near Sukhdev Vihar Metro'
    },
    location: {
      type: 'Point',
      coordinates: [77.2757, 28.5603] // [lng, lat]
    },
    phone: '011-DEMO-ESCORTS-DEL',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'escorts@fortishealthcare.demo',
    website: 'https://www.fortishealthcare.com',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '105711 (Cardiac Emergency)',
      traumaCenter: true,
      ambulanceCount: 10,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/fortis-escorts-delhi.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.5,
    googleReviewCount: 6100,
    appRating: 4.7,
    appReviewCount: 188,
    numberOfBeds: 310,
    establishedYear: 1988,
    facilities: ['24x7 Cardiac Emergency', 'Dedicated Coronary Care Units', 'Pediatric Heart Centre', 'Cardiac Cath Labs', 'ECMO Support'],
    specialties: ['Cardiology', 'Pediatric Cardiac Surgery', 'Electrophysiology', 'Vascular Surgery', 'Heart Transplant']
  },

  // --- 12. Gurugram, Haryana ---
  {
    _id: 'hosp-medanta-the-medicity',
    id: 'hosp-medanta-the-medicity',
    name: 'Medanta – The Medicity',
    category: 'Private',
    type: 'Super Specialty Hospital',
    description: 'Sprawling 43-acre multi-super specialty medical institute founded by Dr. Naresh Trehan, housing 6 clinical institutes with high-end clinical care and clinical research.',
    address: {
      street: 'CH Bakhtawar Singh Road',
      area: 'Sector 38, Islampur Colony',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122001',
      landmark: 'Near Rajiv Chowk Flyover'
    },
    location: {
      type: 'Point',
      coordinates: [77.0659, 28.4345] // [lng, lat]
    },
    phone: '0124-DEMO-MEDANTA',
    isDemoContact: true,
    contactNotice: 'DEMO / NOT VERIFIED — Direct dialing disabled for demonstration records',
    email: 'info@medanta.demo',
    website: 'https://www.medanta.org',
    emergencyAvailable: true,
    emergencyDetails: {
      contactNumber: '0124-DEMO-EMG',
      traumaCenter: true,
      ambulanceCount: 16,
      doctors24x7: true
    },
    images: [
      '/images/hospitals/medanta-gurugram.svg',
      '/images/hospitals/hospital-fallback.svg'
    ],
    googleRating: 4.4,
    googleReviewCount: 15400,
    appRating: 4.8,
    appReviewCount: 350,
    numberOfBeds: 1250,
    establishedYear: 2009,
    facilities: ['Level 1 Emergency & Trauma', 'CyberKnife Radiosurgery', 'Organ Transplant Units', 'Dedicated Air Ambulance Fleet', 'Pharmacy'],
    specialties: ['Cardiac Care', 'Neurosciences', 'Bone & Joint', 'Kidney & Urology', 'Liver Transplant', 'Cancer Institute']
  }
];

export default INITIAL_HOSPITALS;
