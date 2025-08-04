export type JobDataWithId = JobData & { id: string };

export type JobData = {
  protocol: string;
  createdAt: string;
  completedAt?: string;
  imageUrl: string;
  status: "pending" | "processing" | "done" | "error";

  patientData: {
    name: string;
    gender: "masculine" | "feminine" | "other" | "preferNotToSay";
    birthDate: string;
    insurance: string;
    skinLocation: string;
    skinType: string;
  };

  comment?: string;

  result: {
    binary_prediction: {
      benign: number;
      malignant: number;
    };
    dx_prediction: DxPrediction;
    metadata: {
      image_path_binary: string;
      image_path_dx: string;
      processing_time_binary: TimingInfo;
      processing_time_dx: TimingInfo;
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

type TimingInfo = {
  preprocess: number;
  inference: number;
  postprocess: number;
};
