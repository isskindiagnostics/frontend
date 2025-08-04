import { HelpCard, IconLink } from "isskinui";
import { HTMLAttributes, useState } from "react";

import { container } from "./index.css";

type HelpCardOverlayProps = HTMLAttributes<HTMLDivElement> & {};

const cards = [
  {
    title: "Como tirar uma boa imagem da lesão?",
    text: "Para que a análise seja feita de forma mais precisa o possível, é importante que você siga algumas dicas quando estiver fotografando a lesão do seu paciente.",
    images: [{ src: "/images/card-1.png", alt: "" }],
    buttonText: "Próximo",
  },
  {
    title: "1. Use uma boa iluminação",
    text: "Prefira luz natural ou um ambiente bem iluminado. Evite sombras, luz direta ou reflexos que escondam detalhes da pele.",
    images: [
      { src: "/images/card-2-wrong.png", alt: "" },
      { src: "/images/card-2-right.png", alt: "" },
    ],
    buttonText: "Continuar",
  },
  {
    title: "2. Garanta nitidez e foco",
    text: "Segure o celular com firmeza ou apoie em uma superfície. A imagem deve estar nítida, sem tremores nem desfoque.",
    images: [
      { src: "/images/card-3-wrong.png", alt: "" },
      { src: "/images/card-3-right.png", alt: "" },
    ],
    buttonText: "Continuar",
  },
  {
    title: "3. Mantenha a distância ideal",
    text: "Aproxime a câmera cerca de 10–15 cm da lesão. Ela deve estar centralizada e ocupar a maior parte da imagem, mas sem cortar as bordas.",
    images: [
      { src: "/images/card-4-wrong.png", alt: "" },
      { src: "/images/card-4-right.png", alt: "" },
    ],
    buttonText: "Continuar",
  },
  {
    title: "4. Não use filtros ou zoom",
    text: "Evite qualquer edição, zoom digital ou filtros. Use a câmera do celular como está, para garantir uma boa análise.",
    images: [
      { src: "/images/card-5-wrong.png", alt: "" },
      { src: "/images/card-5-right.png", alt: "" },
    ],
    buttonText: "Continuar",
  },
  {
    title: "5. Deixe o fundo limpo",
    text: "Remova acessórios, roupas ou objetos próximos. A lesão deve ser o único destaque na imagem.",
    images: [
      { src: "/images/card-6-wrong.png", alt: "" },
      { src: "/images/card-6-right.png", alt: "" },
    ],
    buttonText: "Entendi!",
  },
];

const HelpCardOverlay = ({}: HelpCardOverlayProps) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [visibility, setVisibility] = useState<boolean>(false);
  const totalCards = cards.length;

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % totalCards);
  };

  const handlePaginationChange = (pageIndex: number) => {
    setCurrentCard(pageIndex);
  };

  return (
    <>
      <IconLink
        icon="Info"
        renderAs="button"
        onClick={() => setVisibility(true)}
      >
        Orientações de captura
      </IconLink>
      {visibility && (
        <div className={`${container}`}>
          {cards.map((card, idx) => {
            return (
              <HelpCard
                style={{ display: idx === currentCard ? "block" : "none" }}
                key={idx}
                title={card.title}
                total={totalCards}
                current={currentCard}
                images={card.images}
                text={card.text}
                buttonText={card.buttonText}
                onButtonClick={
                  idx === cards.length - 1
                    ? () => {
                        setVisibility(false);
                        setCurrentCard(0);
                      }
                    : handleNext
                }
                onPaginationChange={handlePaginationChange}
                onCardClose={() => {
                  setVisibility(false);
                  setCurrentCard(0);
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default HelpCardOverlay;
