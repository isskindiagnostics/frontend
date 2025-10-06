"use client";
import { doc, getDoc } from "firebase/firestore";
import { Button, DatePicker, InputField, Notification, Select } from "isskinui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { startAnalysis } from "@/app/api/startAnalysis";
import { main, pageContent } from "@/app/global.css";
import AnalysisLoader from "@/components/AnalysisLoader";
import ContentBlock from "@/components/ContentBlock";
import HelpCardOverlay from "@/components/HelpCardOverlay";
import PhotoAnalysis from "@/components/PhotoAnalysis";
import TopBar from "@/components/TopBar";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import { ANALYSIS_ERROR_MESSAGES } from "@/firebase/constants";
import { saveAnalysisData } from "@/firebase/queryAnalysis";
import {
  // canPerformAnalysis,
  incrementAnalysisCount,
} from "@/firebase/queryAnalysis";
import { useShowToast } from "@/hooks/useShowToast";
import generateProtocol from "@/utils/generateProtocol";

import { formSection, photoSection, fieldWrapper } from "./index.css";
import { genders, insurances, skinTypes } from "./staticData";

const AnalysisForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useShowToast();

  const [name, setName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [skinLocation, setSkinLocation] = useState("");
  const [skinType, setSkinType] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    insurance: false,
    birthDate: false,
    gender: false,
    skinLocation: false,
    skinType: false,
  });

  const nameInvalid = touched.name && name.trim() === "";
  const insuranceInvalid = touched.insurance && insurance.trim() === "";
  const birthDateInvalid = touched.birthDate && !birthDate;
  const genderInvalid = touched.gender && gender.trim() === "";
  const skinLocationInvalid =
    touched.skinLocation && skinLocation.trim() === "";

  const isFormValid =
    name.trim() !== "" &&
    birthDate !== null &&
    gender.trim() !== "" &&
    skinLocation.trim() !== "" &&
    imageFile;

  const handleSubmit = async () => {
    if (!imageFile) return;

    try {
      setLoading(true);

      // const allowed = await canPerformAnalysis(user?.uid || "");
      // if (!allowed) {
      //   setLoading(false);
      // setErrorMessage(ANALYSIS_ERROR_MESSAGES.limit);
      //   return;
      // }

      const jobId = await startAnalysis(imageFile, user?.uid || "");
      setJobId(jobId);

      await saveAnalysisData({
        uid: user?.uid || "",
        jobId,
        protocol: generateProtocol(),
        name,
        insurance,
        birthDate,
        gender,
        skinLocation,
        skinType,
      });
      await incrementAnalysisCount(user?.uid || "");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const checkStatus = async () => {
      const docRef = doc(db, "users", user?.uid || "", "jobs", jobId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setErrorMessage(ANALYSIS_ERROR_MESSAGES.notFound);
        return;
      }

      const data = docSnap.data();
      if (data.status === "done") {
        router.push(`/analysis/result/${jobId}`);
      } else if (data.status === "error") {
        setErrorMessage(ANALYSIS_ERROR_MESSAGES.generic);
      }
    };

    const interval = setInterval(checkStatus, 1000);
    checkStatus();

    return () => clearInterval(interval);
  }, [jobId, router, setErrorMessage, user?.uid]);

  return (
    <main className={main}>
      {errorMessage && <Notification type="error" label={errorMessage} />}

      <TopBar title="Análise">
        {!loading && (
          <Button disabled={!isFormValid} onClick={handleSubmit}>
            Analisar
          </Button>
        )}
      </TopBar>

      {loading ? (
        <AnalysisLoader />
      ) : (
        <div className={pageContent}>
          <ContentBlock className={formSection}>
            <h2>Dados do Paciente</h2>
            <InputField
              label="Nome"
              type="text"
              width="100%"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              error={nameInvalid ? "Esse campo é obrigatório" : ""}
            />

            <Select
              label="Convênio"
              width="100%"
              options={insurances}
              value={insurance}
              onValueChange={(value) => setInsurance(value)}
              error={insuranceInvalid ? "Esse campo é obrigatório" : ""}
            />

            <div className={fieldWrapper}>
              <DatePicker
                label="Data de Nascimento"
                placeholder="DD/MM/AAAA"
                width="100%"
                selected={birthDate}
                onChange={(value) => setBirthDate(value)}
                errorMessage={
                  birthDateInvalid ? "Esse campo é obrigatório" : ""
                }
              />

              <Select
                label={"Gênero"}
                width="100%"
                options={genders}
                value={gender}
                onValueChange={(value) => setGender(value)}
                error={genderInvalid ? "Esse campo é obrigatório" : ""}
              />
            </div>

            <InputField
              label="Local da Lesão"
              type="text"
              width="100%"
              value={skinLocation}
              onChange={(e) => setSkinLocation(e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, skinLocation: true }))
              }
              error={skinLocationInvalid ? "Esse campo é obrigatório" : ""}
            />

            <Select
              label="Tipo de Pele (opcional)"
              width="100%"
              options={skinTypes}
              value={skinType}
              onValueChange={(value) => setSkinType(value)}
            />
          </ContentBlock>

          <ContentBlock className={photoSection}>
            <h2>Foto da Lesão</h2>
            <PhotoAnalysis onImageSelect={(file) => setImageFile(file)} />
            <HelpCardOverlay />
          </ContentBlock>
        </div>
      )}
    </main>
  );
};

export default AnalysisForm;
