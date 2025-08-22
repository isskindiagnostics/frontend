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

export const TERMS_SECTIONS: TermsSection[] = [
  {
    id: "introducao",
    title: "Introdução",
    elements: [
      {
        type: "paragraph",
        content:
          "Bem-vindo ao Isskin Diagnostics, uma plataforma desenvolvida como protótipo acadêmico para auxiliar profissionais de saúde na análise de lesões de pele através de tecnologia de inteligência artificial.",
      },
      {
        type: "paragraph-italic",
        content:
          "Estes Termos e Condições regulam o uso da plataforma Isskin Diagnostics, operada pela Isskin Diagnostics, com sede na ",
        italicText:
          "Avenida Papa João Paulo II, nº 68, CEP 12244-597, Urbanova VI, São José dos Campos - SP",
      },
    ],
  },
  {
    id: "definicoes",
    title: "Definições",
    elements: [
      {
        type: "paragraph",
        content:
          "Para os fins destes Termos e Condições de Uso, aplicam-se as seguintes definições:",
      },
      {
        type: "definition",
        term: "Plataforma",
        definition:
          "refere-se ao sistema web Isskin Diagnostics, acessível através do endereço eletrônico isskindiagnostics.com, incluindo todas as suas funcionalidades, ferramentas e recursos disponibilizados aos usuários.",
      },
      {
        type: "definition",
        term: "Usuário",
        definition:
          "designa o profissional de saúde devidamente registrado e habilitado a utilizar a Plataforma, que possui credenciais válidas de acesso e está autorizado a realizar análises diagnósticas através do sistema.",
      },
      {
        type: "definition",
        term: "Análise",
        definition:
          "compreende o processamento automatizado de imagens de lesões cutâneas por meio de tecnologia de inteligência artificial integrada à Plataforma, gerando resultados e relatórios diagnósticos para auxílio profissional.",
      },
      {
        type: "definition",
        term: "Dados de Paciente",
        definition:
          "abrangem todas as informações, imagens, resultados de exames e demais dados relacionados aos pacientes dos usuários que são inseridos, processados ou armazenados na Plataforma durante o uso dos serviços oferecidos.",
      },
    ],
  },
  {
    id: "elegibilidade",
    title: "Elegibilidade e Cadastro",
    elements: [
      {
        type: "paragraph",
        content:
          "Para utilizar nossa plataforma, você deve ser profissional de saúde licenciado (médico generalista, dermatologista ou enfermeiro), possuir registro ativo no CRM (médicos) ou COREN (enfermeiros), ter capacidade legal para firmar contratos e fornecer informações verdadeiras e atualizadas durante o cadastro.",
      },
      {
        type: "paragraph",
        content:
          "A Isskin Diagnostics verifica a autenticidade dos registros profissionais fornecidos, sendo que o acesso à plataforma está condicionado à aprovação desta verificação. O usuário é integralmente responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta, devendo comunicar imediatamente qualquer uso não autorizado ou violação de segurança.",
      },
    ],
  },
  {
    id: "descricao-servico",
    title: "Descrição do Serviço",
    elements: [
      {
        type: "paragraph",
        content:
          "O Isskin Diagnostics é uma plataforma digital que oferece os serviços de:",
      },
      {
        type: "list",
        items: [
          "Upload e análise de imagens de lesões cutâneas",
          "Relatórios de análise baseados em IA",
          "Gerenciamento de casos clínicos",
          "Geração de relatórios em PDF",
        ],
      },
      {
        type: "paragraph",
        content:
          "A ferramenta funciona como um apoio diagnóstico, onde as análises fornecidas são baseadas em algoritmos de inteligência artificial e servem apenas como auxílio ao diagnóstico médico.",
      },
      {
        type: "paragraph-bold",
        content:
          "É importante destacar que o Isskin Diagnostics NÃO substitui o julgamento clínico profissional e NÃO constitui diagnóstico médico definitivo. Oferecemos diferentes planos de assinatura para atender às necessidades dos usuários:",
        boldParts: [
          {
            text: "É importante destacar que o Isskin Diagnostics ",
            isBold: false,
          },
          { text: "NÃO substitui", isBold: true },
          { text: " o julgamento clínico profissional e ", isBold: false },
          { text: "NÃO constitui", isBold: true },
          {
            text: " diagnóstico médico definitivo. Oferecemos diferentes planos de assinatura para atender às necessidades dos usuários:",
            isBold: false,
          },
        ],
      },
      {
        type: "list",
        items: [
          "Plano Gratuito com número limitado de análises mensais",
          "Plano Premium com análises ilimitadas e funcionalidades adicionais",
        ],
      },
    ],
  },
  {
    id: "responsabilidades-do-usuario",
    title: "Responsabilidades do Usuário",
    elements: [
      {
        type: "paragraph",
        content:
          "O usuário compromete-se a utilizar a plataforma apenas para fins profissionais legítimos, não compartilhar credenciais de acesso, manter atualizadas suas informações profissionais e cumprir todas as regulamentações de sua profissão. É integralmente responsável por todas as decisões diagnósticas e terapêuticas, comunicação com pacientes sobre resultados, cumprimento de protocolos médicos e éticos, além da obtenção de consentimento adequado dos pacientes.",
      },
      {
        type: "paragraph",
        content:
          "Quanto aos dados de pacientes, o usuário deve obter consentimento explícito para uso da plataforma, garantir que possui autorização para processar imagens médicas e informar aos pacientes sobre o uso de IA na análise. É fundamental manter a confidencialidade médica conforme a legislação aplicável, assegurando que todos os aspectos éticos e legais sejam respeitados no uso da ferramenta.",
      },
    ],
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade Intelectual",
    elements: [
      {
        type: "paragraph",
        content:
          "Todo conteúdo da plataforma, incluindo algoritmos, interface e relatórios, é propriedade exclusiva da Isskin Diagnostics. Concedemos aos usuários uma licença limitada, não exclusiva e intransferível para uso da plataforma conforme estabelecido nestes termos de uso.",
      },
      {
        type: "paragraph",
        content:
          "Os usuários mantêm todos os direitos sobre as imagens médicas enviadas e concedem à Isskin Diagnostics licença limitada apenas para processá-las e gerar os relatórios de análise solicitados. As imagens não são utilizadas para treinamento ou aprimoramento de algoritmos, sendo processadas exclusivamente para fornecer o serviço de análise diagnóstica ao usuário.",
      },
    ],
  },
  {
    id: "limitacoes-de-responsabilidade",
    title: "Limitações de Responsabilidade",
    elements: [
      {
        type: "paragraph-bold",
        content:
          "A Isskin Diagnostics NÃO fornece conselhos médicos diretos, não garante precisão absoluta das análises, não assume responsabilidade por decisões clínicas e não substitui a consulta médica tradicional. Nossa plataforma funciona exclusivamente como ferramenta de apoio diagnóstico, cabendo ao profissional médico a interpretação e aplicação clínica dos resultados.",
        boldParts: [
          {
            text: "A Isskin Diagnostics ",
            isBold: false,
          },
          { text: "NÃO", isBold: true },
          {
            text: " fornece conselhos médicos diretos, ",
            isBold: false,
          },
          { text: "NÃO", isBold: true },
          {
            text: " garante precisão absoluta das análises, ",
            isBold: false,
          },
          { text: "NÃO", isBold: true },
          {
            text: " assume responsabilidade por decisões clínicas e ",
            isBold: false,
          },
          { text: "NÃO", isBold: true },
          {
            text: " substitui a consulta médica tradicional. Nossa plataforma funciona exclusivamente como ferramenta de apoio diagnóstico, cabendo ao profissional médico a interpretação e aplicação clínica dos resultados.",
            isBold: false,
          },
        ],
      },
      {
        type: "paragraph",
        content:
          'Não garantimos disponibilidade ininterrupta da plataforma, ausência total de falhas técnicas ou compatibilidade com todos os dispositivos. O serviço é fornecido "como está", sem garantias expressas ou implícitas, e os usuários devem estar cientes das limitações técnicas inerentes a qualquer sistema digital. É fundamental que os profissionais mantenham sempre seu julgamento clínico independente e utilizem a ferramenta como complemento, não como substituto, de sua expertise médica.',
      },
    ],
  },
  {
    id: "privacidade-e-protecao-de-dados",
    title: "Privacidade e Proteção de Dados",
    elements: [
      {
        type: "paragraph",
        content:
          "Coletamos apenas os dados estritamente necessários para o funcionamento adequado da plataforma, conforme detalhado em nossa Política de Privacidade. Implementamos medidas de segurança robustas e apropriadas para proteger as informações dos usuários e dos pacientes, porém não podemos garantir segurança absoluta contra todas as possíveis ameaças digitais.",
      },
      {
        type: "paragraph",
        content:
          "Nos comprometemos a cumprir todas as regulamentações aplicáveis de proteção de dados, incluindo legislações nacionais e internacionais pertinentes ao tratamento de dados pessoais e informações médicas sensíveis. Trabalhamos continuamente para manter nossos protocolos de segurança atualizados e em conformidade com as melhores práticas do setor de saúde digital.",
      },
    ],
  },
  {
    id: "pagamentos-e-cancelamentos",
    title: "Pagamentos e Cancelamentos",
    elements: [
      {
        type: "paragraph",
        content:
          "Os pagamentos dos planos premium são processados de forma segura através da plataforma Stripe, e os preços podem ser alterados mediante aviso prévio de 30 dias aos usuários. Os assinantes têm total flexibilidade para cancelar suas assinaturas a qualquer momento diretamente através da plataforma, sem burocracias ou taxas adicionais.",
      },
      {
        type: "paragraph",
        content:
          "As solicitações de reembolso são analisadas individualmente, caso a caso, seguindo nossa política específica de reembolsos. Nos comprometemos a avaliar cada situação de forma justa e transparente, considerando as circunstâncias particulares de cada usuário e sempre buscando a melhor solução para ambas as partes.",
      },
    ],
  },
  {
    id: "suspensao-e-rescisao",
    title: "Suspensão e Rescisão",
    elements: [
      {
        type: "paragraph",
        content:
          "Reservamo-nos o direito de suspender contas em casos de violação destes termos de uso, uso inadequado da plataforma ou fornecimento de informações profissionais inválidas ou fraudulentas. A suspensão visa proteger a integridade do serviço e garantir que apenas profissionais qualificados tenham acesso à ferramenta diagnóstica.",
      },
      {
        type: "paragraph",
        content:
          "Qualquer uma das partes pode rescindir este acordo a qualquer momento mediante aviso adequado. Os usuários têm liberdade total para encerrar sua participação na plataforma, enquanto a Isskin Diagnostics se reserva o direito de interromper o fornecimento do serviço quando necessário, sempre respeitando os direitos dos usuários e cumprindo as obrigações legais aplicáveis.",
      },
    ],
  },
  {
    id: "modificacoes-dos-termos",
    title: "Modificações dos Termos",
    elements: [
      {
        type: "paragraph",
        content:
          "Reservamo-nos o direito de modificar estes termos. Usuários serão notificados sobre mudanças significativas com antecedência de 30 dias.",
      },
    ],
  },
  {
    id: "lei-aplicavel-e-jurisdicao",
    title: "Lei Aplicável e Jurisdição",
    elements: [
      {
        type: "paragraph",
        content:
          "Estes termos são regidos pelas leis brasileiras, com jurisdição no foro da comarca de São Paulo, Estado de São Paulo.",
      },
      {
        type: "paragraph",
        content:
          "Aplicam-se as disposições do Código de Defesa do Consumidor, Lei Geral de Proteção de Dados (LGPD), Código Civil e demais legislações brasileiras pertinentes.",
      },
    ],
  },
  {
    id: "contato",
    title: "Contato",
    elements: [
      {
        type: "paragraph",
        content: "Para dúvidas sobre estes termos:",
      },
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
    id: "disposicoes-gerais",
    title: "Disposições Gerais",
    elements: [
      {
        type: "paragraph",
        content:
          "Estes termos de uso constituem o acordo integral entre as partes, substituindo qualquer entendimento ou acordo anterior relacionado ao uso da plataforma Isskin Diagnostics. Caso qualquer cláusula ou disposição deste documento seja considerada inválida ou inaplicável por autoridade competente, as demais cláusulas permanecerão em pleno vigor e efeito, garantindo a continuidade da relação contratual.",
      },
      {
        type: "paragraph",
        content:
          "A eventual não aplicação ou tolerância quanto ao descumprimento de qualquer direito ou obrigação estabelecida nestes termos não constitui renúncia a esse direito, podendo ser exercido a qualquer momento pela parte interessada. Esta flexibilidade permite que ambas as partes mantenham seus direitos preservados mesmo diante de situações excepcionais ou temporárias.",
      },
    ],
  },
];
