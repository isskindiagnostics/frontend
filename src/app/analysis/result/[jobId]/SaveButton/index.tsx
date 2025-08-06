"use client";

import { doc, getDoc } from "firebase/firestore";
import { Button } from "isskinui";
import { Notification } from "isskinui";
import { useEffect, useState } from "react";

import { db } from "@/firebase/config";
import { saveAnalysisComment } from "@/firebase/queryAnalysis";
import { useCommentStore } from "@/stores/useCommentStore";

type NotificationText = {
  type: "success" | "error" | "general" | "warning";
  label: string;
};

export const SaveButton = ({ jobId, uid }: { jobId: string; uid: string }) => {
  const { comment, setComment } = useCommentStore();
  const [savedComment, setSavedComment] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [notificationText, setNotificationText] = useState<NotificationText>({
    type: "success",
    label: "Alterações salvas com sucesso!",
  });

  const hasChanges = comment.trim() !== savedComment.trim();

  useEffect(() => {
    const fetchSavedComment = async () => {
      try {
        const docRef = doc(db, "users", uid, "jobs", jobId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const saved = docSnap.data().comment ?? "";
          setSavedComment(saved.trim());
          setComment(saved);
        }
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    fetchSavedComment();
  }, [jobId, uid, setComment]);

  useEffect(() => {
    if (!showNotification) return;

    const timeout = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showNotification]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const saved = await saveAnalysisComment({ uid, jobId, comment });
      setNotificationText({
        type: "success",
        label: "Alterações salvas com sucesso!",
      });
      setSavedComment(saved);
      setShowNotification(true);
    } catch (error) {
      console.log("Error:", error);
      setNotificationText({
        type: "error",
        label: "Erro ao salvar comentário",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showNotification && (
        <Notification
          type={notificationText.type}
          label={notificationText.label}
        />
      )}
      <Button
        variant="solid"
        disabled={!hasChanges || comment.trim() === "" || loading}
        onClick={handleSave}
      >
        {loading ? "Carregando" : "Salvar comentários"}
      </Button>
    </>
  );
};
