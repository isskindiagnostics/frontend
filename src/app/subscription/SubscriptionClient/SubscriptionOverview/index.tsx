import { Button, IconLink } from "isskinui";
import { useState, useEffect } from "react";

import { uid } from "@/app/uid";
import SkeletonCell from "@/components/SkeletonCell";
import { getAnalysisUsage } from "@/firebase/queryAnalysis";
import { getSubscriptionData } from "@/firebase/querySubscription";
import { formatDate } from "@/utils/date";

import {
  button,
  container,
  iconLink,
  memberDate,
  price,
  summary,
  title,
} from "./index.css";

type SubscriptionOverviewProps = {
  href?: string;
};

const SubscriptionOverview = ({ href }: SubscriptionOverviewProps) => {
  const [count, setCount] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsage = async () => {
      setLoading(true);
      const usage = await getAnalysisUsage(uid);
      if (!usage) {
        setLoading(false);
        return;
      }

      const { count, limit } = usage;
      setCount(count);
      setLimit(limit);
      setLoading(false);
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

  const colors = {
    wrapper: "#343434ff",
    shimmer:
      "linear-gradient(90deg, rgba(249, 249, 249, 0) 0%, #6d6d6db6 50%, rgba(249, 249, 249, 0) 100%)",
  };

  return (
    <div className={container}>
      <div className={summary}>
        {loading ? (
          <div>
            <SkeletonCell
              width={120}
              height={23}
              style={{ marginBottom: 10 }}
              colors={colors}
            />
            <SkeletonCell width={250} height={23} colors={colors} />
          </div>
        ) : (
          <div>
            <div>
              <p className={title}>Básico</p>
              <p className={memberDate}>
                Membro desde {formatDate(memberSince || "", "long")}
              </p>
            </div>
          </div>
        )}

        {loading ? (
          <SkeletonCell width={103} height={23} colors={colors} />
        ) : (
          <p className={price}>
            {count}/{limit} análises
          </p>
        )}
      </div>
      {/* <Button variant="solid" className={button} onClick={onClick}>
        Cancelar Assinatura
      </Button> */}
      <IconLink
        icon="ExternalLink"
        className={iconLink}
        href={href}
        target="_blank"
      >
        Saiba mais sobre assinaturas
      </IconLink>
    </div>
  );
};

export default SubscriptionOverview;
