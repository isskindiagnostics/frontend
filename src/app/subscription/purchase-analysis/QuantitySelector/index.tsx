import { Button, InputField } from "isskinui";

import { formButtonContainer } from "@/components/CompleteSignup/index.css";
import ContentBlock from "@/components/ContentBlock";
import { formatPrice } from "@/components/PricingCard";
import { SUBSCRIPTION_PLANS_SHORT } from "@/stripe/config";

import {
  headingAction,
  quantityBlock,
  quantityBtnColor,
  quantityController,
  quantityInput,
  quantityLabel,
  quantityWrapper,
  titleAndDescription,
} from "../index.css";
import { QuantitySelectorProps } from "../types";

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  totalPrice,
  isProcessing,
  onCancel,
  onPurchase,
  hasPaymentMethod,
}: QuantitySelectorProps) {
  const flexPrice = SUBSCRIPTION_PLANS_SHORT.flex.price;

  return (
    <ContentBlock className={quantityBlock}>
      <div className={titleAndDescription}>
        <div className={headingAction}>
          <h3>Comprar Análises</h3>
        </div>
        <p>
          Seu cartão será cobrado imediatamente e você receberá seus créditos na
          hora. Os créditos não expiram, compre quantos precisar, quando
          precisar.
        </p>
      </div>

      <div className={quantityWrapper}>
        <div>
          <p className={quantityLabel}>Quantidade</p>
          <div className={quantityController}>
            <Button
              variant="outlined"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1 || isProcessing}
              className={quantity <= 1 || isProcessing ? "" : quantityBtnColor}
            >
              -
            </Button>

            <InputField
              label="Quantidade"
              type="number"
              min="1"
              max="50"
              value={quantity}
              onChange={(e) =>
                onQuantityChange(
                  Math.max(1, Math.min(50, parseInt(e.target.value) || 1))
                )
              }
              disabled={isProcessing}
              className={quantityInput}
            />

            <Button
              variant="outlined"
              onClick={() => onQuantityChange(Math.min(50, quantity + 1))}
              disabled={quantity >= 50 || isProcessing}
              className={quantityBtnColor}
            >
              +
            </Button>
          </div>
        </div>

        <div>
          <p>
            {quantity} {quantity === 1 ? "análise" : "análises"} ×{" "}
            {formatPrice(flexPrice)}
          </p>
          <p>
            <strong>Total: {formatPrice(totalPrice)}</strong>
          </p>
        </div>
      </div>

      <div className={formButtonContainer}>
        <Button variant="outlined" onClick={onCancel} disabled={isProcessing}>
          Cancelar
        </Button>

        <Button
          onClick={onPurchase}
          disabled={isProcessing || !hasPaymentMethod}
        >
          {isProcessing ? "Processando..." : `Pagar ${formatPrice(totalPrice)}`}
        </Button>
      </div>
    </ContentBlock>
  );
}
