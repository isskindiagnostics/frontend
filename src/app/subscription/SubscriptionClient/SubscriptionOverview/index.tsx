import { Button, IconLink } from "isskinui";
import { useState, useEffect } from "react";

import { uid } from "@/app/uid";
import { getAnalysisUsage } from "@/firebase/queryAnalysis";
import { getSubscriptionData } from "@/firebase/querySubscription";

import {
  button,
  container,
  iconLink,
  memberDate,
  price,
  summary,
  title,
} from "./index.css";
import { formatDate } from "@/utils/date";

type SubscriptionOverviewProps = {
  onClick: () => void;
};

const SubscriptionOverview = ({ onClick }: SubscriptionOverviewProps) => {
  const [count, setCount] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const [memberSince, setMemberSince] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsage = async () => {
      const usage = await getAnalysisUsage(uid);
      if (!usage) return;

      const { count, limit } = usage;
      setCount(count);
      setLimit(limit);
    };

    fetchUsage();
  }, []);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      const data = await getSubscriptionData(uid);
      if (!data) return;

      const { startDate } = data;
      setMemberSince(startDate);
    };

    fetchSubscriptionData();
  }, []);

  return (
    <div className={container}>
      <div className={summary}>
        <div>
          <p className={title}>Básico</p>
          <p className={memberDate}>
            Membro desde {formatDate(memberSince || "", "long")}
          </p>
        </div>
        <p className={price}>
          {count}/{limit} análises
        </p>
      </div>
      {/* <Button variant="solid" className={button} onClick={onClick}>
        Cancelar Assinatura
      </Button> */}
      <IconLink icon="ExternalLink" className={iconLink} onClick={onClick}>
        Saiba mais sobre assinaturas
      </IconLink>
    </div>
  );
};

export default SubscriptionOverview;
