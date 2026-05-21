export interface Training {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  price: string;
  audience: string;
  duration: string;
  icon: string;
  color: string;
  curriculum: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  whyAttend: string;
}

export const trainings: Training[] = [
  {
    slug: "adaptueshmeria-inteligjente",
    title: "Adaptueshmëria Inteligjente",
    subtitle: "Mëso si të përshtatesh dhe të lulëzosh në çdo situatë",
    description:
      "Trajnimi për Adaptueshmërinë Inteligjente ju ndihmon të zhvilloni fleksibilitet mendor dhe aftësi për të menaxhuar ndryshimin me sukses.",
    longDescription:
      "Në një botë që ndryshon me shpejtësi, aftësia për t'u përshtatur dhe për t'u zhvilluar nuk është thjesht e dobishme — është thelbësore. Ky trajnim full-day ju pajis me mjete praktike për të zhvilluar fleksibilitet mendor, për të menaxhuar pasigurinë dhe për të kthyer sfidat në mundësi rritjeje.",
    date: "15 Maj 2026",
    time: "09:00 – 17:00",
    location: "Prishtinë, Kosovë",
    price: "149€",
    audience: "Profesionistë, Menaxherë, Liderë ekipesh",
    duration: "1 ditë (8 orë)",
    icon: "Brain",
    color: "#00bfa5",
    curriculum: [
      {
        title: "Bazat e Adaptueshmërisë",
        description:
          "Kuptimi i llojeve të ndryshimit dhe si reagojmë ndaj tyre neurologjikisht dhe emocionalisht.",
      },
      {
        title: "Fleksibiliteti Mendor",
        description:
          "Teknika për të zhvilluar mendësinë e rritjes dhe për të sfiduar besimet kufizuese.",
      },
      {
        title: "Menaxhimi i Pasigurisë",
        description:
          "Strategji praktike për të vepruar me vendosmëri kur informacioni është i kufizuar.",
      },
      {
        title: "Rezilienca Emocionale",
        description:
          "Si të ruani qetësinë dhe fokusin gjatë periudhave të stresit dhe ndryshimit.",
      },
      {
        title: "Komunikimi Adaptiv",
        description:
          "Përshtatja e stilit të komunikimit për audiences dhe situata të ndryshme.",
      },
      {
        title: "Plani i Veprimit Personal",
        description:
          "Hartimi i një plani konkret për aplikimin e mësimeve në jetën e përditshme profesionale.",
      },
    ],
    benefits: [
      "Zhvilloni fleksibilitet mendor për t'u përballuar me ndryshimet",
      "Mësoni strategji praktike për menaxhimin e stresit",
      "Përmirësoni aftësinë për vendimmarrje nën presion",
      "Ndërtoni reziliencë emocionale afatgjatë",
      "Merrni certifikatë pjesëmarrjeje nga Smarter Training",
    ],
    whyAttend:
      "Në këtë trajnim, do të mësoni teknika që përdoren nga liderët globalë dhe organizatat e suksesshme për të naviguar ndryshimin. Me një qasje praktike dhe interaktive, do të largoheni me mjete konkrete që mund t'i aplikoni menjëherë.",
  },
  {
    slug: "inteligjenca-sociale",
    title: "Inteligjenca Sociale",
    subtitle: "Ndërtoni marrëdhënie më të forta profesionale",
    description:
      "Zhvilloni aftësinë për të kuptuartë tjetrët, për të ndërtuar marrëdhënie kuptimplota, dhe për të komunikuar me ndikim.",
    longDescription:
      "Inteligjenca Sociale është aftësia kryesore që dallon liderët e jashtëzakonshëm nga ata mesatarë. Ky trajnim ju ndihmon të kuptuartë dinamikat sociale, të lexoni emocionet e tjerëve, dhe të ndërtoni besim me çdo bashkëbisedues.",
    date: "22 Maj 2026",
    time: "09:00 – 17:00",
    location: "Prishtinë, Kosovë",
    price: "149€",
    audience: "Profesionistë, Drejtues, Shitës, HR",
    duration: "1 ditë (8 orë)",
    icon: "Users",
    color: "#5c6bc0",
    curriculum: [
      {
        title: "Bazat e Inteligjencës Sociale",
        description:
          "Çfarë është IS dhe pse ka rëndësi në vendin e punës moderne.",
      },
      {
        title: "Leximi i Sinjaleve Sociale",
        description:
          "Si të lexoni gjuhën e trupit, tonin e zërit, dhe ndjesinën emocionale.",
      },
      {
        title: "Empatia Strategjike",
        description:
          "Përdorimi i empatisë si mjet lidershipi, jo vetëm si cilësi njerëzore.",
      },
      {
        title: "Ndërtimi i Besimit",
        description:
          "Teknika për të krijuar marrëdhënie besimi me kolegët, klientët dhe partnerët.",
      },
      {
        title: "Menaxhimi i Konflikteve",
        description:
          "Si të trajtoni mosmarrëveshjet në mënyrë konstruktive dhe profesionale.",
      },
      {
        title: "Ndikimi pa Autoritet",
        description:
          "Strategji për të bindur dhe motivuar edhe kur nuk keni pozitë zyrtare.",
      },
    ],
    benefits: [
      "Kuptoni dinamikat sociale në mjedise profesionale",
      "Zhvilloni aftësi ndikuese dhe bindëse",
      "Përmirësoni marrëdhëniet me kolegët dhe klientët",
      "Mësoni teknika për menaxhimin efektiv të konflikteve",
      "Ndërtoni prezencë profesionale të fortë",
    ],
    whyAttend:
      "85% e suksesit profesional vjen nga aftësitë e buta, jo nga njohuritë teknike. Ky trajnim ju jep mjetet për të shtuar ndikimin tuaj dhe për të ndërtuar marrëdhënie kuptimplota në çdo aspekt të karrierës.",
  },
  {
    slug: "lidershpi-transformues",
    title: "Lidershipi Transformues",
    subtitle: "Frymëzoni dhe udhëhiqni ekipet drejt ekselencës",
    description:
      "Mësoni si të bëheni liderë që frymëzojnë, motivojnë dhe transformojnë ekipet dhe organizatat.",
    longDescription:
      "Lidershipi Transformues shkon përtej menaxhimit — ai krijon vizion, frymëzon shpirt ekipi, dhe ndërton kulturë ekselence. Në këtë trajnim intensiv, do të eksploroni stil-et e ndryshme të lidershipit dhe do të zhvilloni qasjen tuaj unike.",
    date: "5 Qershor 2026",
    time: "09:00 – 17:00",
    location: "Tiranë, Shqipëri",
    price: "179€",
    audience: "Menaxherë, Drejtues, Sipërmarrës",
    duration: "1 ditë (8 orë)",
    icon: "Trophy",
    color: "#f59e0b",
    curriculum: [
      {
        title: "Vizoni dhe Strategjia",
        description:
          "Si të artikuloni vizionin tuaj dhe ta përktheni në strategji veprimi.",
      },
      {
        title: "Stile të Lidershipit",
        description:
          "Eksplorimi i styleve të ndryshme dhe gjetja e qasjes suaj autentike.",
      },
      {
        title: "Motivimi i Ekipeve",
        description:
          "Teknika të provuara për të motivuar dhe angazhuar anëtarët e ekipit.",
      },
      {
        title: "Vendimmarrja Strategjike",
        description:
          "Korniza për vendimmarrje efektive nën presion dhe pasiguri.",
      },
      {
        title: "Komunikimi si Lider",
        description:
          "Si të komunikoni me qartësi, fuqi dhe ndikim në çdo situatë.",
      },
      {
        title: "Ndërtimi i Kulturës",
        description:
          "Strategji për të ndërtuar dhe ruajtur kulturë organizative pozitive.",
      },
    ],
    benefits: [
      "Zhvilloni stilin tuaj autentik të lidershipit",
      "Mësoni teknika për motivimin e ekipeve",
      "Përmirësoni aftësinë për vendimmarrje strategjike",
      "Ndërtoni prezencë ekzekutive të fortë",
      "Krijuani kulturë ekselence në organizatë",
    ],
    whyAttend:
      "Lidershipi nuk lind — mësohet. Ky trajnim kombinon teori të avancuar me ushtrime interaktive për t'ju dhënë mjetet praktike që do të transformojnë si ju drejtoni njerëzit dhe si arritni rezultate.",
  },
  {
    slug: "komunikimi-kritik",
    title: "Komunikimi Kritik",
    subtitle: "Komunikoni me ndikim në situata sfiduese",
    description:
      "Përvetësoni artin e komunikimit efektiv në biseda të vështira, negociata, dhe situata me presion.",
    longDescription:
      "Bisedat më të rëndësishme janë shpesh ato më të vështirat. Ky trajnim ju mëson si të navigoni bisedat kritike me vetëbesim, qartësi dhe empati — qoftë me kolegë, klientë apo drejtues.",
    date: "19 Qershor 2026",
    time: "09:00 – 17:00",
    location: "Prishtinë, Kosovë",
    price: "149€",
    audience: "Të gjithë profesionistët",
    duration: "1 ditë (8 orë)",
    icon: "MessageCircle",
    color: "#ec4899",
    curriculum: [
      {
        title: "Anatomia e Bisedave Kritike",
        description:
          "Kuptimi i pse disa biseda janë të vështira dhe si t'i qasemi atyre.",
      },
      {
        title: "Dëgjimi Aktiv",
        description:
          "Teknika për dëgjim të thellë që ndërton besim dhe kuptime.",
      },
      {
        title: "Trajtimi i Emocioneve",
        description:
          "Si të menaxhoni emocionet tuaja dhe të tjerëve gjatë bisedave intensive.",
      },
      {
        title: "Feedback Konstruktiv",
        description:
          "Korniza për dhënien dhe marrjen e feedback-ut në mënyrë konstruktive.",
      },
      {
        title: "Negocimi i Efektshëm",
        description:
          "Strategji negociimi që arrijnë rezultate tëjta fitimprurëse.",
      },
      {
        title: "Praktikë me Role-Play",
        description:
          "Ushtrime praktike me skenare reale nga jeta profesionale.",
      },
    ],
    benefits: [
      "Fitoni vetëbesim në biseda të vështira",
      "Mësoni teknika efektive dëgjimi",
      "Përmirësoni aftësinë për dhënien e feedback-ut",
      "Zhvilloni aftësi negociimi strategjike",
      "Reduktoni konfliktet në vendin e punës",
    ],
    whyAttend:
      "Suksesi profesional varet nga aftësia për të komunikuar qartë, veçanërisht kur situata janë sfiduese. Ky trajnim ju jep besimin dhe teknikat për t'u dalluar në çdo bisedë.",
  },
];

export function getTrainingBySlug(slug: string): Training | undefined {
  return trainings.find((t) => t.slug === slug);
}

export function getAllTrainingSlugs(): string[] {
  return trainings.map((t) => t.slug);
}
