import { Badge, Button, Check, theme } from "isskinui";

import {
  list,
  listItem,
  checkIcon,
  container,
  contentWrapper,
  badge,
  priceLabel,
  priceWrapper,
  perMonth,
  button,
  containerHighlight,
  badgeHighlight,
  textWhite,
  buttonHighlight,
} from "./index.css";

type PricingCardProps = {
  subscription: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
  variant?: "default" | "highlight";
};

const formatPrice = (price: number) => {
  if (price === 0) return "R$ 0";
  return price
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace(/\s/g, "");
};

const PricingCard = ({
  subscription,
  price,
  description,
  features,
  cta,
  buttonDisabled,
  onButtonClick,
  variant = "default",
}: PricingCardProps) => {
  return (
    <div
      className={`${container} ${variant === "highlight" && containerHighlight}`}
    >
      <div className={contentWrapper}>
        <Badge
          label={subscription}
          className={`${badge} ${variant === "highlight" && badgeHighlight}`}
        />
        <div className={priceWrapper}>
          <p
            className={`${priceLabel} ${variant === "highlight" && textWhite}`}
          >
            {formatPrice(price)}
          </p>
          {price !== 0 && (
            <p
              className={`${perMonth} ${variant === "highlight" && textWhite}`}
            >
              /mês
            </p>
          )}
        </div>
        <p className={variant === "highlight" ? textWhite : ""}>
          {description}
        </p>
        <ul className={list}>
          {features.map((feature, idx) => (
            <li className={listItem} key={idx}>
              <Check className={checkIcon} />
              <p className={variant === "highlight" ? textWhite : ""}>
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant={variant === "highlight" ? "solid" : "outlined"}
        disabled={buttonDisabled}
        className={`${button} ${variant === "highlight" && buttonHighlight}`}
        onClick={onButtonClick}
        style={
          buttonDisabled
            ? {
                borderColor: theme.colors.baseGrey300,
                color: theme.colors.baseGrey300,
              }
            : {}
        }
      >
        {cta}
      </Button>
    </div>
  );
};
export default PricingCard;
