import { Badge, Button, Check, theme } from "isskinui";
import { HTMLAttributes } from "react";

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
  cardText,
} from "./index.css";

type PricingCardProps = HTMLAttributes<HTMLButtonElement> & {
  subscription: string;
  price: number;
  description: string;
  features: readonly string[];
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
  variant = "default",
  ...props
}: PricingCardProps) => {
  return (
    <button
      className={`${container} ${variant === "highlight" && containerHighlight}`}
      {...props}
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
        <p
          className={`${cardText} ${variant === "highlight" ? textWhite : ""}`}
        >
          {description}
        </p>
        <ul className={list}>
          {features.map((feature, idx) => (
            <li className={listItem} key={idx}>
              <Check className={checkIcon} />
              <p
                className={`${cardText} ${variant === "highlight" ? textWhite : ""}`}
              >
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* <Button
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
      </Button> */}
    </button>
  );
};
export default PricingCard;
