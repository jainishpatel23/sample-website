import { Service } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'back-pain-treatment',
    name: 'Back Pain & Spine Rehabilitation',
    category: 'Spine & Posture',
    shortDescription: 'Targeted spinal mobilization, decompression techniques, and core muscle reactivation to alleviate acute and chronic back discomfort.',
    fullDescription: 'Our Back Pain & Spine Rehabilitation program is tailored to the exact biomechanics of your lumbar and thoracic spine. Whether recovering from a herniated disc, muscle spasm, or long hours of seated desk work, we evaluate pelvic tilt, spinal mobility, and muscular imbalances before initiating treatment.',
    image: '/src/assets/images/therapy_manual_spine_1790420537042.jpg',
    iconName: 'Activity',
    durationMinutes: 45,
    status: 'active',
    symptoms: [
      'Persistent dull or sharp pain in the lower or mid-back',
      'Stiffness when bending forward or standing from a seated position',
      'Radiating discomfort into the buttocks or legs (sciatica symptoms)',
      'Localized muscle spasms and postural fatigue'
    ],
    treatmentApproach: [
      'Comprehensive spinal range of motion and segmental mobility check',
      'Gentle hands-on joint mobilization and myofascial trigger release',
      'Lumbar stabilization and deep abdominal core re-education',
      'Ergonomic workstation and lumbar support posture counseling'
    ],
    benefits: [
      'Significant reduction in local spinal tenderness',
      'Restored spinal flexion and rotational freedom',
      'Strengthened core musculature protecting vulnerable vertebrae',
      'Practical daily habits to avoid recurrence during work and sleep'
    ]
  },
  {
    id: 'neck-pain-treatment',
    name: 'Neck Pain & Cervical Care',
    category: 'Spine & Posture',
    shortDescription: 'Relief for cervical stiffness, tension headaches, and forward-head posture caused by digital screen strain.',
    fullDescription: 'Cervical spine discomfort is one of the most common complaints in modern life. Our targeted cervical care combines soft tissue release of the upper trapezius and suboccipitals with gentle cervical traction and scapular stabilization exercises.',
    image: '/src/assets/images/hero_physio_care_1790420512285.jpg',
    iconName: 'Smile',
    durationMinutes: 45,
    status: 'active',
    symptoms: [
      'Inability to comfortably turn head left or right while driving',
      'Tension headaches starting at the base of the skull',
      'Aching shoulder blades and tight neck muscles',
      'Numbness or tingling sensation in fingers or upper arm'
    ],
    treatmentApproach: [
      'Cervical spine range testing and nerve tension assessment',
      'Suboccipital de-tensioning and gentle manual distraction',
      'Deep neck flexor activation and chin-tuck retraining',
      'Scapular retractors strengthening (rhomboids & middle traps)'
    ],
    benefits: [
      'Decreased frequency of tension headaches',
      'Smooth, pain-free cervical rotation and extension',
      'Balanced head-on-neck posture reducing spinal load'
    ]
  },
  {
    id: 'sports-injury-rehab',
    name: 'Sports Injury Rehabilitation',
    category: 'Sports & Performance',
    shortDescription: 'Structured phase-based return-to-sport protocols for ligament sprains, muscle tears, and tendon issues.',
    fullDescription: 'Designed for runners, gym enthusiasts, and competitive athletes. We manage injuries from the acute inflammation stage through progressive tissue loading, neuromuscular control, and sport-specific biomechanical drills.',
    image: '/src/assets/images/sports_rehab_exercise_1790420578802.jpg',
    iconName: 'Flame',
    durationMinutes: 60,
    status: 'active',
    symptoms: [
      'ACL, PCL, or meniscus strain/tear recovery',
      'Hamstring, groin, or calf muscle strains',
      'Rotator cuff impingement or shoulder instability',
      'Ankle sprains and lingering lateral instability'
    ],
    treatmentApproach: [
      'Objective functional movement screen (FMS) and strength testing',
      'Proprioception and balance board neuromuscular retraining',
      'Eccentric strengthening for tendon tolerance and healing',
      'Gradual agility and plyometric re-integration'
    ],
    benefits: [
      'Accelerated tissue repair without reinjury risk',
      'Rebuilt explosive strength and joint stability',
      'Confidence to return to full competition and training'
    ]
  },
  {
    id: 'post-surgery-rehab',
    name: 'Post-Surgery Rehabilitation',
    category: 'Surgical Recovery',
    shortDescription: 'Safe, surgeon-aligned recovery for joint replacements, ligament reconstructions, and spinal surgeries.',
    fullDescription: 'Post-operative recovery requires careful adherence to medical protocols. We guide you through early gentle passive movement, swelling management, scar tissue desensitization, and progressive weight-bearing progression.',
    image: '/src/assets/images/clinic_modern_gym_1790420548646.jpg',
    iconName: 'ShieldCheck',
    durationMinutes: 50,
    status: 'active',
    symptoms: [
      'Post Total Knee Replacement (TKR) or Total Hip Replacement (THR)',
      'Post ACL reconstruction or shoulder arthroscopy',
      'Post-fracture stiffness after cast or external fixator removal',
      'Reduced walking tolerance and muscle atrophy following surgery'
    ],
    treatmentApproach: [
      'Lymphatic drainage and cryotherapy for edema reduction',
      'Gentle passive and active-assisted range of motion protocols',
      'Isometric muscle activation preventing prolonged disuse atrophy',
      'Gait retraining with assistive devices to independent walking'
    ],
    benefits: [
      'Optimal joint articulation without surgical compromise',
      'Rapid restoration of independent mobility and stairs climbing',
      'Regained confidence in daily self-care activities'
    ]
  },
  {
    id: 'arthritis-management',
    name: 'Arthritis & Joint Health',
    category: 'Chronic Care',
    shortDescription: 'Gentle, low-impact exercise therapy and joint mobilization to maintain flexibility and relieve chronic arthritis.',
    fullDescription: 'Osteoarthritis and degenerative joint changes can cause morning stiffness and functional limitations. Our physiotherapy protocols emphasize joint lubrication through gentle motion, offloading surrounding tendons, and strengthening supporting muscles.',
    image: '/src/assets/images/electrotherapy_tens_1790420590836.jpg',
    iconName: 'HeartPulse',
    durationMinutes: 45,
    status: 'active',
    symptoms: [
      'Morning joint stiffness lasting 20 to 30 minutes',
      'Crepitus (grating or crunching sensations) in knees or hips',
      'Aching discomfort that worsens with prolonged damp weather or inactivity',
      'Difficulty standing from deep armchairs or kneeling'
    ],
    treatmentApproach: [
      'Grade I & II joint mobilization for synovial fluid dispersion',
      'Closed-kinetic-chain strengthening to protect cartilage',
      'Therapeutic heat therapy and electro-analgesia modalities',
      'Energy conservation and joint protection techniques'
    ],
    benefits: [
      'Eased morning joint stiffness and reduced daily aches',
      'Prolonged joint preservation and delayed surgical need',
      'Improved stamina for walking and family activities'
    ]
  },
  {
    id: 'joint-pain-treatment',
    name: 'Joint Pain & Tendinopathy Care',
    category: 'Orthopaedics',
    shortDescription: 'Specialized interventions for frozen shoulder, tennis elbow, plantar fasciitis, and hip bursitis.',
    fullDescription: 'Overuse tendinopathies and capsular restrictions respond best to a combination of accurate biomechanical diagnosis and progressive tendon loading rather than prolonged complete rest.',
    image: '/src/assets/images/therapy_manual_spine_1790420537042.jpg',
    iconName: 'Zap',
    durationMinutes: 45,
    status: 'active',
    symptoms: [
      'Frozen shoulder (adhesive capsulitis) with restricted reach',
      'Lateral elbow pain when gripping objects (tennis elbow)',
      'Sharp heel pain with the first steps out of bed (plantar fasciitis)',
      'Trochanteric hip pain when sleeping on the side'
    ],
    treatmentApproach: [
      'Deep friction massage and targeted myofascial release',
      'Isometric and heavy-slow-resistance (HSR) tendon exercises',
      'Stretching of tight antagonistic muscle groups',
      'Taping and biomechanical footwear guidance'
    ],
    benefits: [
      'Breakdown of painful capsular adhesions',
      'Increased tensile strength in affected tendons',
      'Resumption of pain-free manual tasks and sports'
    ]
  },
  {
    id: 'posture-correction',
    name: 'Posture & Ergonomic Correction',
    category: 'Spine & Posture',
    shortDescription: 'Comprehensive posture analysis, spinal alignment exercises, and practical workplace ergonomic solutions.',
    fullDescription: 'Sedentary lifestyles and laptop usage often result in rounded shoulders, anterior pelvic tilt, and chronic muscular fatigue. We conduct postural screening to identify muscle tightness and weakness patterns.',
    image: '/src/assets/images/hero_physio_care_1790420512285.jpg',
    iconName: 'Compass',
    durationMinutes: 45,
    status: 'active',
    symptoms: [
      'Rounded forward shoulders and humped upper back appearance',
      'Persistent mid-back burning after sitting at a desk',
      'Excessive arching of lower back (anterior pelvic tilt)',
      'Chronic general fatigue due to poor respiratory mechanics'
    ],
    treatmentApproach: [
      'Photographic posture grid assessment and plumb-line analysis',
      'Pectoral and hip flexor dynamic release routines',
      'Thoracic spine extension and foam roller mobility training',
      'Personalized workplace desk and monitor setup blueprint'
    ],
    benefits: [
      'Upright, natural, fatigue-free posture',
      'Eliminated evening shoulder tightness and upper back fatigue',
      'Better breathing capacity and confident physical presence'
    ]
  },
  {
    id: 'senior-physiotherapy',
    name: 'Senior Citizen Physiotherapy',
    category: 'Geriatric Care',
    shortDescription: 'Safe balance retraining, fall prevention, and mobility preservation to maintain independence in everyday life.',
    fullDescription: 'Maintaining independence, balance, and leg strength is crucial for older adults. Our geriatric rehabilitation focuses on safe, supervised exercises to enhance bone density, gait stability, and functional endurance.',
    image: '/src/assets/images/clinic_modern_gym_1790420548646.jpg',
    iconName: 'Award',
    durationMinutes: 45,
    status: 'active',
    symptoms: [
      'Hesitation or unsteadiness when walking or turning corners',
      'History of falls or fear of falling restricting daily outings',
      'Generalized weakness, loss of muscle mass (sarcopenia)',
      'Difficulty navigating steps or getting in and out of vehicles'
    ],
    treatmentApproach: [
      'Berg balance scale and Timed Up & Go (TUG) testing',
      'Lower limb functional strengthening (sit-to-stands, heel raises)',
      'Static and dynamic balance drills with sturdy safety support',
      'Safe home environment consultation (lighting, rugs, grab rails)'
    ],
    benefits: [
      'Substantially reduced risk of falls and related fractures',
      'Confident, steady gait for outdoor walks and family gatherings',
      'Greater independence in daily personal routines'
    ]
  },
  {
    id: 'stroke-neuro-rehab',
    name: 'Stroke & Neurological Recovery',
    category: 'Neurology',
    shortDescription: 'Neuro-developmental therapy, motor retraining, and functional coordination for neurological conditions.',
    fullDescription: 'Our neurological rehabilitation utilizes principles of neuroplasticity to help rebuild motor pathways following a stroke, Parkinsonian condition, or peripheral nerve neuropathy.',
    image: '/src/assets/images/sports_rehab_exercise_1790420578802.jpg',
    iconName: 'Cpu',
    durationMinutes: 60,
    status: 'active',
    symptoms: [
      'Unilateral limb weakness or hemiparesis following a stroke',
      'Spasticity or muscle stiffness hindering normal hand or leg movement',
      'Loss of fine motor skills such as writing, buttoning, or holding cutlery',
      'Impaired balance and coordination during walking'
    ],
    treatmentApproach: [
      'Proprioceptive Neuromuscular Facilitation (PNF) patterns',
      'Constraint-induced movement strategies and task-specific training',
      'Weight-bearing functional transitions and safe gait training',
      'Caregiver training for safe home assistance and transfers'
    ],
    benefits: [
      'Promoted neural rewiring and neuromuscular recruitment',
      'Decreased spastic muscle tone and contracture prevention',
      'Progressive regain of meaningful functional independence'
    ]
  },
  {
    id: 'home-physiotherapy',
    name: 'Home Physiotherapy Consultation',
    category: 'Specialized Care',
    shortDescription: 'Professional, one-on-one physiotherapy delivered in the comfort and privacy of the patient’s home.',
    fullDescription: 'For patients recovering immediately after surgery, experiencing acute immobilizing back spasms, or senior citizens who find clinic travel strenuous, we bring our expertise and portable treatment equipment right to your doorstep.',
    image: '/src/assets/images/hero_physio_care_1790420512285.jpg',
    iconName: 'Home',
    durationMinutes: 60,
    status: 'active',
    symptoms: [
      'Immediate post-operative hospital discharge requiring bed rehabilitation',
      'Acute severe pain making car or taxi travel intolerable',
      'Bedbound patients needing passive joint maintenance and chest care',
      'Caregivers needing customized transfers training in patient’s bedroom'
    ],
    treatmentApproach: [
      'Full clinical assessment in the home setting',
      'Bedside mobilization, gentle stretching, and early assisted walking',
      'Setup of ergonomic furniture and customized home exercise stations',
      'Direct guidance for family members and nursing attendants'
    ],
    benefits: [
      'Zero travel stress and zero risk of aggravation during transport',
      'Directly customized to the patient’s actual home environment',
      'Peace of mind for family members receiving direct guidance'
    ]
  }
];

const STORAGE_KEY = 'physiocare_services';

export const getStoredServices = (): Service[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SERVICES));
      return INITIAL_SERVICES;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_SERVICES;
  }
};

export const saveStoredServices = (services: Service[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch (error) {
    console.error('Failed to save services to localStorage', error);
  }
};

export const resetStoredServices = (): Service[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SERVICES));
  } catch (error) {
    console.error('Failed to reset services in localStorage', error);
  }
  return INITIAL_SERVICES;
};
