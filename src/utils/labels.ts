import { DxPrediction } from "@/types/job";

export function getSkinTypeLabel(type: string): string {
  const skinTypeLabels: Record<string, string> = {
    typeOne: "Tipo I",
    typeTwo: "Tipo II",
    typeThree: "Tipo III",
    typeFour: "Tipo IV",
    typeFive: "Tipo V",
    typeSix: "Tipo VI",
  };

  return skinTypeLabels[type] ?? type;
}

export function getGenderLabel(gender: string): string {
  const genderLabels: Record<string, string> = {
    feminine: "Feminino",
    masculine: "Masculino",
    other: "Outro",
    preferNoToSay: "Nenhum",
  };

  return genderLabels[gender] ?? gender;
}

export function getProbabilityLabel(probability: number): {
  title: string;
  subline: string;
} {
  if (probability < 50) {
    return {
      title: "Probabilidade Baixa",
      subline: "As chances da lesão do seu paciente ser maligna são baixas.",
    };
  } else if (probability < 80) {
    return {
      title: "Probabilidade Média",
      subline: "Existe uma possibilidade moderada da lesão ser maligna.",
    };
  } else {
    return {
      title: "Probabilidade Alta",
      subline:
        "As chances da lesão do seu paciente ser maligna são altas. Recomendado encaminhamento.",
    };
  }
}

export function getDxLabel(dx: DxPrediction): string {
  const dxLabels: Record<string, string> = {
    ak: "Ceratoactinose",
    bcc: "Carcinoma Basocelular",
    df: "Dermatofibroma",
    lentigo: "Lentigo",
    melanoma: "Melanoma",
    nevus: "Nevus",
    scc: "Carcinoma Espinocelular",
    seborrheic_keratosis: "Queratose Seborreica",
    uncertain: "Diagnóstico Incerto",
    vasc: "Lesão Vascular",
  };

  const [key] = Object.entries(dx).reduce((max, current) =>
    current[1] > max[1] ? current : max
  );

  return dxLabels[key];
}

export function getRecCardLabel(
  probability: number
): { title: string; subline: string; img: string }[] {
  if (probability < 50) {
    return [
      {
        title: "Monitore esta área",
        subline:
          "Observe regularmente a área da pele e procure orientação médica se ocorrer alguma alteração.",
        img: "/images/skin-lesion.png",
      },
      {
        title: "Cuidados Preventivos",
        subline: "Mantenha a pele protegida do sol e adote hábitos saudáveis.",
        img: "/images/sunscreen.png",
      },
    ];
  } else if (probability < 80) {
    return [
      {
        title: "Monitore a lesão",
        subline:
          "Continue o monitoramento frequente e anote qualquer alteração observada.",
        img: "/images/monitor-skin.png",
      },
    ];
  } else {
    return [
      {
        title: "Consulte um dermatologista imediatamente",
        subline:
          "Encaminhamento urgente para diagnóstico e tratamento especializado.",
        img: "/images/skin-lesion.png",
      },
      {
        title: "Monitore esta área",
        subline:
          "Observe regularmente a área da pele e procure orientação médica se ocorrer alguma alteração.",
        img: "/images/skin-lesion.png",
      },
    ];
  }
}

export function getInsuranceLabel(value: string): string {
  const insuranceMap: Record<string, string> = {
    amil: "Amil",
    bradesco_saude: "Bradesco Saúde",
    sulamerica: "SulAmérica",
    unimed: "Unimed",
    notredame: "NotreDame Intermédica",
    hapvida: "Hapvida",
    porto_seguro: "Porto Seguro Saúde",
    cassi: "Cassi",
    mediservice: "Mediservice",
    omint: "Omint",
    maritima: "Marítima Saúde",
    life_empresarial: "Life Empresarial",
    greenline: "Greenline",
    prevent_senior: "Prevent Senior",
    one_health: "One Health",
    gama_saude: "Gama Saúde",
    postal_saude: "Postal Saúde",
    samp: "Samp",
    santa_helena: "Santa Helena Saúde",
    sao_cristovao: "São Cristóvão Saúde",
    assim: "Assim Saúde",
    biovida: "Biovida",
    promed: "Promed",
    vivest: "Vivest",
    planserv: "Planserv",
  };

  return insuranceMap[value] ?? value;
}
