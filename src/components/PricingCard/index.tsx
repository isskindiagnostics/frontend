import { Badge, Check } from "isskinui";
import { ButtonHTMLAttributes } from "react";

import * as componentStyles from "./index.css";

type PricingCardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  subscription: string;
  price: number;
  description: string;
  features: readonly string[];
  variant?: "default" | "highlight";
  selected?: boolean;
};

const formatPrice = (priceInCents: number) => {
  if (priceInCents === 0) return "R$0,00";
  return (priceInCents / 100)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace(/\s/g, "");
};

const getStyleClasses = (
  disabled: boolean,
  variant: "default" | "highlight",
  selected: boolean
) => {
  const isHighlight = variant === "highlight";

  return {
    container: (() => {
      if (selected && isHighlight)
        return `${componentStyles.container} ${componentStyles.containerHighlightSelected}`;
      if (selected && !isHighlight)
        return `${componentStyles.container} ${componentStyles.containerSelected}`;
      if (isHighlight)
        return `${componentStyles.container} ${componentStyles.containerHighlight}`;
      return componentStyles.container;
    })(),

    badge: (() => {
      if (disabled && isHighlight)
        return `${componentStyles.badge} ${componentStyles.badgeHighlightDisabled}`;
      if (disabled && !isHighlight)
        return `${componentStyles.badge} ${componentStyles.badgeDisabled}`;
      if (!disabled && isHighlight)
        return `${componentStyles.badge} ${componentStyles.badgeHighlight}`;
      return componentStyles.badge;
    })(),

    textContent: (() => {
      if (disabled && isHighlight)
        return `${componentStyles.highlightTextDisabled}`;
      if (disabled && !isHighlight)
        return `${componentStyles.defaultTextDisabled}`;
      if (!disabled && isHighlight) return `${componentStyles.textWhite}`;
      return "";
    })(),

    checkIcon: (() => {
      if (disabled && isHighlight)
        return `${componentStyles.highlightTextDisabled}`;
      if (disabled && !isHighlight)
        return `${componentStyles.defaultTextDisabled}`;
      return `${componentStyles.checkIcon}`;
    })(),
  };
};

const PricingCard = ({
  subscription,
  price,
  description,
  features,
  disabled = false,
  variant = "default",
  selected = false,
  ...props
}: PricingCardProps) => {
  const styles = getStyleClasses(disabled, variant, selected);

  return (
    <button
      type="button"
      className={styles.container}
      disabled={disabled}
      {...props}
    >
      <div className={componentStyles.contentWrapper}>
        <Badge label={subscription} className={styles.badge} />

        <div className={componentStyles.priceWrapper}>
          <p className={`${componentStyles.priceLabel} ${styles.textContent}`}>
            {formatPrice(price)}
          </p>
          {price !== 0 && (
            <p className={`${componentStyles.perMonth} ${styles.textContent}`}>
              /mês
            </p>
          )}
        </div>

        <p className={`${componentStyles.cardText} ${styles.textContent}`}>
          {description}
        </p>

        <ul className={componentStyles.list}>
          {features.map((feature, idx) => (
            <li className={componentStyles.listItem} key={idx}>
              <Check width={20} className={styles.checkIcon} />
              <p
                className={`${componentStyles.cardText} ${styles.textContent}`}
              >
                {feature}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
};

export default PricingCard;
