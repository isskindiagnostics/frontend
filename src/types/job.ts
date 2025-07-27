import { Timestamp } from "firebase/firestore";

export type JobData = {
  createdAt: Date;
  completedAt?: Date;
  imageUrl: string;
  status: "pending" | "processing" | "done" | "error";

  patientData: {
    name: string;
    gender: "masculine" | "feminine" | "other" | "preferNotToSay";
    birthDate: Timestamp;
    insurance: string;
    skinLocation: string;
    skinType: string;
  };

  result: {
    binary_prediction: {
      benign: number;
      malignant: number;
    };
    dx_prediction: {
      ak: number;
      bcc: number;
      df: number;
      lentigo: number;
      melanoma: number;
      nevus: number;
      scc: number;
      seborrheic_keratosis: number;
      uncertain: number;
      vasc: number;
    };
    metadata: {
      image_path_binary: string;
      image_path_dx: string;

      processing_time_binary: {
        preprocess: number;
        inference: number;
        postprocess: number;
      };

      processing_time_dx: {
        preprocess: number;
        inference: number;
        postprocess: number;
      };
    };
  };
};

export type DxPrediction = {
  ak: number;
  bcc: number;
  df: number;
  lentigo: number;
  melanoma: number;
  nevus: number;
  scc: number;
  seborrheic_keratosis: number;
  uncertain: number;
  vasc: number;
};
