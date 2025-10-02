export type ContentElement =
  | { type: "paragraph"; content: string }
  | { type: "paragraph-multiline"; lines: string[] }
  | { type: "paragraph-italic"; content: string; italicText: string }
  | {
      type: "paragraph-bold";
      content: string;
      boldParts: Array<{ text: string; isBold: boolean }>;
    }
  | { type: "definition"; term: string; definition: string }
  | { type: "list"; items: string[] }
  | { type: "heading"; level: 2 | 3 | 4; content: string };

export interface TermsSection {
  id: string;
  title: string;
  elements: ContentElement[];
}

export const POLICY_SECTIONS: TermsSection[] = [
  {
    id: "introducao",
    title: "Introdução",
    elements: [
      {
        type: "paragraph",
        content:
          "Esta Política de Privacidade descreve como a Isskin Diagnostics coleta, usa, armazena e protege informações pessoais dos usuários de nossa plataforma de auxílio diagnóstico dermatológico.",
      },
      {
        type: "paragraph",
        content:
          "Ao utilizar nossa plataforma, você concorda com as práticas descritas nesta política.",
      },
    ],
  },
  {
    id: "informacoes-sobre-o-controlador",
    title: "Informações sobre o Controlador",
    elements: [
      {
        type: "paragraph-multiline",
        lines: [
          "Isskin Diagnostics",
          "Avenida Papa João Paulo II, nº 68",
          "CEP 12244-597, Urbanova VI",
          "São José dos Campos - SP",
          "Email: contato@isskindiagnostics.com",
        ],
      },
    ],
  },
  {
    id: "dados-coletados",
    title: "Dados Coletados",
    elements: [
      {
        type: "paragraph",
        content:
          "Para oferecer nossos serviços, coletamos algumas informações necessárias:",
      },
      {
        type: "paragraph-bold",
        content: "Quando você se cadastra:",
        boldParts: [{ text: "Quando você se cadastra:", isBold: true }],
      },
      {
        type: "list",
        items: [
          "Seus dados básicos (nome, email, telefone)",
          "Informações profissionais (área de atuação, registro no conselho)",
          "Endereço para cobrança (se escolher um plano pago)",
          "Foto de perfil (opcional)",
        ],
      },
      {
        type: "paragraph-bold",
        content: "Durante o uso da plataforma:",
        boldParts: [{ text: "Durante o uso da plataforma:", isBold: true }],
      },
      {
        type: "list",
        items: [
          "Imagens médicas que você envia para análise",
          "Relatórios e análises que você gera",
          "Dados sobre como você usa a plataforma",
        ],
      },
      {
        type: "paragraph-bold",
        content: "Para pagamentos:",
        boldParts: [{ text: "Para pagamentos:", isBold: true }],
      },
      {
        type: "list",
        items: [
          "Informações do seu cartão (processadas com segurança pela Stripe)",
          "Detalhes da sua assinatura e cobranças",
        ],
      },
      {
        type: "paragraph-bold",
        content: "Para melhorar nossos serviços:",
        boldParts: [{ text: "Para melhorar nossos serviços:", isBold: true }],
      },
      {
        type: "list",
        items: [
          "Como você navega no site (através do Google Analytics)",
          "Páginas que você visita e tempo de uso",
        ],
      },
      {
        type: "paragraph",
        content:
          "Todos esses dados são tratados com máxima segurança e utilizados apenas para os fins descritos nesta política.",
      },
    ],
  },
  {
    id: "finalidades-do-tratamento",
    title: "Finalidades do Tratamento",
    elements: [
      {
        type: "paragraph",
        content:
          "Utilizamos suas informações exclusivamente para oferecer e melhorar nossos serviços, sempre com base em fundamentos legais sólidos. Quando você se cadastra e usa nossa plataforma, criamos um contrato que nos autoriza a processar seus dados para entregar exatamente o que você contratou - isso inclui manter sua conta funcionando, verificar suas credenciais profissionais, processar as análises de imagens médicas que você solicita e gerar os relatórios em PDF.",
      },
      {
        type: "paragraph",
        content:
          "Também temos interesse legítimo em aprimorar continuamente nossa plataforma e garantir sua segurança. Isso nos permite analisar como o serviço é utilizado, desenvolver recursos mais úteis, melhorar nossos algoritmos de análise e implementar medidas de proteção. Para funcionalidades extras como cookies de análise ou eventuais comunicações promocionais, sempre pedimos seu consentimento primeiro.",
      },
      {
        type: "paragraph",
        content:
          "Em algumas situações, somos obrigados por lei a manter ou fornecer certas informações para órgãos reguladores, especialmente considerando que lidamos com dados de saúde e profissionais da área médica. É importante destacar que seus dados nunca são vendidos, alugados ou compartilhados para fins comerciais com terceiros. Toda informação é tratada com máxima segurança e utilizada apenas para os propósitos descritos nesta política.",
      },
    ],
  },
  {
    id: "compartilhamento-de-dados",
    title: "Compartilhamento de Dados",
    elements: [
      {
        type: "paragraph",
        content:
          "Para que nossa plataforma funcione adequadamente, precisamos trabalhar com alguns parceiros tecnológicos confiáveis. Usamos o Google Analytics para entender como vocês navegam no site (com dados anonimizados), o Stripe para processar pagamentos com total segurança, e o Firebase do Google para armazenar os dados de forma segura.",
      },
      {
        type: "paragraph",
        content:
          "Cada um desses parceiros recebe apenas as informações necessárias para desempenhar sua função específica e está sujeito a rigorosos contratos de proteção de dados. Nunca compartilhamos suas informações com empresas de marketing, vendedores de dados, outras empresas para fins comerciais ou governos, exceto quando somos legalmente obrigados por decisão judicial.",
      },
      {
        type: "paragraph",
        content:
          "Você pode ter certeza de que seus dados médicos e informações pessoais permanecem protegidos e são usados exclusivamente para melhorar sua experiência em nossa plataforma.",
      },
    ],
  },
  {
    id: "armazenamento-e-segurança",
    title: "Armazenamento e Segurança",
    elements: [
      {
        type: "paragraph",
        content:
          "Seus dados são armazenados com máxima segurança usando o Firebase do Google e os serviços do Stripe, com servidores localizados principalmente nos EUA e Europa.",
      },
      {
        type: "paragraph",
        content:
          "Para reforçar a proteção, oferecemos autenticação multifator, mantemos controles rigorosos de acesso baseados em funções e monitoramos continuamente nossa infraestrutura contra ameaças.",
      },
      {
        type: "paragraph",
        content: "Mantemos os seus dados por diferentes períodos de tempo:",
      },
      {
        type: "list",
        items: [
          "Enquanto sua conta estiver ativa, mantemos todas as informações necessárias para o funcionamento do serviço",
          "Contas inativas há mais de 2 anos têm seus dados automaticamente excluídos",
          "Dados de pagamento seguem as políticas do Stripe e requisitos fiscais obrigatórios",
        ],
      },
      {
        type: "paragraph",
        content:
          "Você pode solicitar a exclusão de seus dados a qualquer momento através do nosso suporte.",
      },
    ],
  },
  {
    id: "direitos-dos-titulares",
    title: "Direitos dos Titulares",
    elements: [
      {
        type: "paragraph",
        content:
          "A lei brasileira (LGPD) garante que você tenha controle total sobre suas informações pessoais. Isso significa que você pode solicitar uma cópia completa de todos os dados que temos sobre você para confirmar quais informações estamos processando.",
      },
      {
        type: "paragraph",
        content:
          "Você também tem o direito de corrigir qualquer informação incorreta ou desatualizada, solicitar a exclusão completa de seus dados pessoais, revogar consentimentos que tenha dado anteriormente, ou até mesmo excluir sua conta permanentemente. Em situações específicas, você pode ainda restringir como processamos seus dados ou se opor ao tratamento baseado em nossos interesses legítimos.",
      },
      {
        type: "paragraph-bold",
        content:
          "Para exercer qualquer um desses direitos, basta enviar um email para contato@isskindiagnostics.com explicando o que você gostaria de fazer. Nossa equipe responderá em até 30 dias úteis com todas as informações ou ações solicitadas.",
        boldParts: [
          {
            text: "Para exercer qualquer um desses direitos,",
            isBold: true,
          },
          {
            text: " basta enviar um email para contato@isskindiagnostics.com explicando o que você gostaria de fazer. Nossa equipe responderá em até 30 dias úteis com todas as informações ou ações solicitadas.",
            isBold: false,
          },
        ],
      },
    ],
  },
  {
    id: "dados-de-menores-de-idade",
    title: "Dados de Menores de Idade",
    elements: [
      {
        type: "paragraph",
        content:
          "Quando nossa plataforma é usada para analisar imagens de pacientes menores de 18 anos, aplicamos proteções ainda mais rigorosas. Isso inclui exigir consentimento explícito dos pais ou responsáveis, limitar ao máximo o tempo de retenção desses dados e aplicar medidas extras de segurança e minimização de informações.",
      },
      {
        type: "paragraph",
        content:
          "É importante esclarecer que a responsabilidade por obter o consentimento adequado dos responsáveis é sempre do profissional de saúde que está usando nossa plataforma. O médico ou profissional deve informar aos pais sobre o uso da nossa tecnologia e garantir que possui todas as autorizações legais necessárias antes de fazer o upload de qualquer imagem.",
      },
      {
        type: "paragraph",
        content:
          "Nossa plataforma não coleta dados diretamente de menores. Sempre trabalhamos apenas com profissionais de saúde habilitados que são responsáveis por seguir todos os protocolos éticos e legais da sua profissão.",
      },
    ],
  },
  {
    id: "dados-fora-do-brasil",
    title: "Dados Fora do Brasil",
    elements: [
      {
        type: "paragraph",
        content:
          "Como nossa plataforma usa serviços tecnológicos globais como Google e Stripe, seus dados podem ser processados tanto no Brasil quanto em outros países, principalmente Estados Unidos e Europa. Isso é necessário para garantir a melhor performance e segurança da nossa aplicação.",
      },
      {
        type: "paragraph",
        content:
          "Para que essas transferências internacionais sejam totalmente legais e seguras, seguimos rigorosamente as exigências da LGPD e trabalhamos apenas com empresas que possuem certificações internacionais de segurança.",
      },
      {
        type: "paragraph",
        content:
          "Para que essas transferências internacionais sejam totalmente legais e seguras, seguimos rigorosamente as exigências da LGPD e trabalhamos apenas com empresas que possuem certificações internacionais de segurança.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    elements: [
      {
        type: "paragraph",
        content:
          "Nossa plataforma usa alguns cookies, pequenos arquivos que ajudam o site a funcionar melhor e lembrar de você. Os cookies essenciais são necessários para que você consiga fazer login, manter sua sessão segura e usar funcionalidades básicas como o checkout. Esses não podem ser desabilitados porque quebrariam o funcionamento da plataforma.",
      },
      {
        type: "paragraph",
        content:
          "Também usamos o Google Analytics para entender como vocês navegam no site e onde podemos melhorar a experiência. Esses dados são completamente anonimizados e agregados, nunca conseguimos identificar um usuário específico através deles. Você pode desabilitar esses cookies analíticos a qualquer momento sem afetar o uso da plataforma.",
      },
    ],
  },
  {
    id: "dados-de-saude",
    title: "Dados de Saúde",
    elements: [
      {
        type: "paragraph",
        content:
          "Reconhecemos que imagens médicas constituem dados sensíveis de saúde e implementamos criptografia sempre que tecnicamente possívele controles de acesso restritivos.",
      },
      {
        type: "paragraph",
        content:
          "Sempre que viável, aplicamos técnicas de anonimização para separar completamente suas informações pessoais das imagens médicas de seus pacientes. Isso inclui remover metadados que possam identificá-los e manter os dados de identificação em sistemas separados das imagens.",
      },
    ],
  },
  {
    id: "duvidas",
    title: "Dúvidas",
    elements: [
      {
        type: "paragraph",
        content:
          "Se você tiver qualquer dúvida sobre como tratamos seus dados ou quiser exercer algum dos seus direitos, nossa equipe está sempre disponível. ",
      },
      {
        type: "paragraph-multiline",
        lines: ["Email: contato@isskindiagnostics.com"],
      },
    ],
  },
];
