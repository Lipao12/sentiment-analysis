import { useState } from "react";
import { Divider } from "../../ui/components/divider";
import { UploadComponent } from "../../ui/components/uptload";
import { ShowResults } from "./show-results";
import { UserInput } from "./user-input";

export const SentimentPage = () => {
  const [sentiments, setSentiments] = useState<any>([]);
  const [uploadTxts, setUploadTxts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 text-secundary">
          Análise de sentimento de frases
        </h1>
        <p className="text-gray-600 text-center mb-6">
          No espaço abaixo, adicione a frase que deseja ser inferida na análise
          de sentimentos.
        </p>
      </div>
      <UserInput
        setSentiments={setSentiments}
        loading={loading}
        setLoading={setLoading}
        uploadTxts={uploadTxts}
        setUploadTxts={setUploadTxts}
      />
      <Divider />
      <div className="w-full flex justify-end py-3">
        <UploadComponent setUploadTxts={setUploadTxts} />
      </div>
      <ShowResults
        sentiments={sentiments}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
