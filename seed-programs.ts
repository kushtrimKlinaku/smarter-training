import { getPayload } from 'payload';
import configPromise from './payload.config';

async function seed() {
  try {
    const payload = await getPayload({ config: configPromise });

    const programsToSeed = [
      {
        title: "Lidership dhe Ndikim",
        tag: "Lidership",
        description: "Zbuloni strategjitë më të mira për të udhëhequr dhe ndikuar tek të tjerët në mënyrë efektive.",
        duration: "3 Ditë",
        level: "Avancuar",
        category: "Lidershipë & Biznes",
        active: true,
      },
      {
        title: "Kultura e Kompanisë",
        tag: "Kulturë",
        description: "Ndërtoni një kulturë pozitive dhe gjithëpërfshirëse në vendin tuaj të punës.",
        duration: "2 Ditë",
        level: "Mesatar",
        category: "Lidershipë & Biznes",
        active: true,
      },
      {
        title: "Zgjidhje Kreative të Problemeve",
        tag: "Inovacion",
        description: "Mësoni teknikat për të gjeneruar ide inovative dhe për të zgjidhur problemet komplekse.",
        duration: "1 Ditë",
        level: "Bazë",
        category: "Kreativitet & Dizajn",
        active: true,
      },
      {
        title: "Të Menduarit Kritik",
        tag: "Zhvillim",
        description: "Mprehni aftësinë për të analizuar informacionin objektivisht dhe për të marrë vendime të arsyetuara.",
        duration: "2 Ditë",
        level: "Mesatar",
        category: "Zhvillim Personal",
        active: true,
      },
      {
        title: "Inteligjenca Sociale",
        tag: "Soft Skills",
        description: "Kuptoni dinamikat sociale për të përmirësuar marrëdhëniet profesionale.",
        duration: "2 Ditë",
        level: "Mesatar",
        category: "Zhvillim Personal",
        active: true,
      },
      {
        title: "Shitja Konsultative",
        tag: "Shitje",
        description: "Zotëroni qasjen e shitjes ku theksi vihet në krijimin e vlerës dhe besimit tek klienti.",
        duration: "3 Ditë",
        level: "Avancuar",
        category: "Shitje & Shërbime",
        active: true,
      },
      {
        title: "Shërbim ndaj Klientëve",
        tag: "Shërbim",
        description: "Përmirësoni eksperiencën e klientit duke zhvilluar aftësi të shkëlqyera komunikimi.",
        duration: "2 Ditë",
        level: "Bazë",
        category: "Shitje & Shërbime",
        active: true,
      },
      {
        title: "Vetëdijesim për Sigurinë Kibernetike",
        tag: "Siguri",
        description: "Njihuni me rreziqet kibernetike dhe si të mbroheni në mjedisin dixhital të punës.",
        duration: "1 Ditë",
        level: "Bazë",
        category: "Teknologji",
        active: true,
      }
    ];

    console.log("Po fshijmë programet ekzistuese (nëse ka)...");
    await payload.delete({
      collection: 'programs',
      where: {
        id: { exists: true }
      }
    });

    console.log("Po mbjellim të dhënat e reja në CMS...");
    for (const prog of programsToSeed) {
      await payload.create({
        collection: 'programs',
        data: prog as any,
      });
      console.log(`U krijua: ${prog.title}`);
    }

    console.log("Të dhënat u shtuan me sukses!");
    process.exit(0);
  } catch (err) {
    console.error("Gabim gjatë mbjelljes së të dhënave:", err);
    process.exit(1);
  }
}

seed();
