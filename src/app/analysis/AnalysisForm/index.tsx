"use client";
import { Button, DatePicker, InputField, Notification, Select } from "isskinui";
import Image from "next/image";
import { useEffect, useState } from "react";

import { startAnalysis } from "@/api/startAnalysis";
import ProfileImg from "@/assets/images/default-profile-image.png";
import AnalysisLoader from "@/components/AnalysisLoader";
import ContentBlock from "@/components/ContentBlock";
import HelpCardOverlay from "@/components/HelpCardOverlay";
import { saveAnalysisData } from "@/firebase/analysisData";

import {
  topBar,
  main,
  pageTitle,
  profileImg,
  pageContent,
  formSection,
  photoSection,
  fieldWrapper,
} from "./index.css";

const uid = "9prkhkBQPBxeAXmBEGRJ";

const insurances = [
  { label: "Amil", value: "amil" },
  { label: "Bradesco Saúde", value: "bradesco_saude" },
  { label: "SulAmérica", value: "sulamerica" },
  { label: "Unimed", value: "unimed" },
  { label: "NotreDame Intermédica", value: "notredame" },
  { label: "Hapvida", value: "hapvida" },
  { label: "Porto Seguro Saúde", value: "porto_seguro" },
  { label: "Cassi", value: "cassi" },
  { label: "Mediservice", value: "mediservice" },
  { label: "Omint", value: "omint" },
  { label: "Marítima Saúde", value: "maritima" },
  { label: "Life Empresarial", value: "life_empresarial" },
  { label: "Greenline", value: "greenline" },
  { label: "Prevent Senior", value: "prevent_senior" },
  { label: "One Health", value: "one_health" },
  { label: "Gama Saúde", value: "gama_saude" },
  { label: "Postal Saúde", value: "postal_saude" },
  { label: "Samp", value: "samp" },
  { label: "Santa Helena Saúde", value: "santa_helena" },
  { label: "São Cristóvão Saúde", value: "sao_cristovao" },
  { label: "Assim Saúde", value: "assim" },
  { label: "Biovida", value: "biovida" },
  { label: "Promed", value: "promed" },
  { label: "Vivest", value: "vivest" },
  { label: "Planserv", value: "planserv" },
];

const genders = [
  { label: "Feminino", value: "feminine" },
  { label: "Masculino", value: "masculine" },
  { label: "Outro", value: "other" },
  { label: "Prefiro não dizer", value: "preferNotToSay" },
];

const skinTypes = [
  { label: "Tipo I", value: "typeOne" },
  { label: "Tipo II", value: "typeTwo" },
  { label: "Tipo III", value: "typeThree" },
  { label: "Tipo IV", value: "typeFour" },
  { label: "Tipo V", value: "typeFive" },
  { label: "Tipo VI", value: "typeSix" },
];

const AnalysisForm = () => {
  const [showAnalysisError, setShowAnalysisError] = useState(false);

  const [name, setName] = useState("");
  const [insurance, setInsurance] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [gender, setGender] = useState("");
  const [skinLocation, setSkinLocation] = useState("");
  const [skinType, setSkinType] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    insurance: false,
    date: false,
    gender: false,
    skinLocation: false,
    skinType: false,
  });

  const nameInvalid = touched.name && name.trim() === "";
  const insuranceInvalid = touched.insurance && insurance.trim() === "";
  const dateInvalid = touched.date && !date;
  const genderInvalid = touched.gender && gender.trim() === "";
  const skinLocationInvalid =
    touched.skinLocation && skinLocation.trim() === "";

  const isFormValid =
    name.trim() !== "" &&
    date !== null &&
    gender.trim() !== "" &&
    skinLocation.trim() !== "" &&
    imageFile;

  const handleSubmit = async () => {
    console.log("clicking");
    if (!imageFile) return;

    try {
      setLoading(true);

      const jobId = await startAnalysis(imageFile, uid);

      await saveAnalysisData({
        uid: uid,
        jobId,
        name,
        insurance,
        date,
        gender,
        skinLocation,
        skinType,
      });

      setLoading(true);
    } catch (error) {
      console.error("Erro:", error);
      setShowAnalysisError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showAnalysisError) return;

    const timeout = setTimeout(() => {
      setShowAnalysisError(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showAnalysisError]);

  return (
    <main className={main}>
      {showAnalysisError && (
        <Notification
          type="error"
          label={"Não foi possível realizar sua análise."}
        />
      )}

      <div className={topBar}>
        <h1 className={pageTitle}>Análise</h1>
        <Button
          variant="solid"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Analisar
        </Button>
        <Image
          className={profileImg}
          src={ProfileImg}
          alt="Sua foto de perfil"
          width={34}
          height={34}
        />
      </div>

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
                selected={date}
                onChange={(value) => setDate(value)}
                errorMessage={dateInvalid ? "Esse campo é obrigatório" : ""}
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
            {/* Substituir pelo componente */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
            {/* Substituir pelo componente */}
            <HelpCardOverlay />
          </ContentBlock>
        </div>
      )}
    </main>
  );
};

export default AnalysisForm;
