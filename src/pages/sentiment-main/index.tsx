import { useState } from "react";
import { Divider } from "../../ui/components/divider";
import { SwitchSelection } from "../../ui/components/switcher-selection";
import { UploadComponent } from "../../ui/components/uptload";
import { ShowResults } from "./show-results";
import { UserInput } from "./user-input";
import { UserInputLink } from "./user-input-link";

export const SentimentPage = () => {
  const [sentiments, setSentiments] = useState<any>([]);
  const [counts, setCountsSentiments] = useState<any>([]);
  const [uploadTxts, setUploadTxts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState("file");

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 text-secundary">
          Análise de sentimento de frases
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {selected === "file"
            ? "No espaço abaixo, adicione a frase que deseja ser inferida na análise de sentimentos."
            : "No espaço abaixo, adicione o link para verificar os comentários do twitter."}
        </p>
      </div>
      <div className="ml-4">
        <SwitchSelection selected={selected} setSelected={setSelected} />
      </div>
      {selected === "file" ? (
        <UserInput
          setSentiments={setSentiments}
          loading={loading}
          setLoading={setLoading}
          uploadTxts={uploadTxts}
          setUploadTxts={setUploadTxts}
        />
      ) : (
        <UserInputLink
          loading={loading}
          setLoading={setLoading}
          setSentiments={setSentiments}
          setCountsSentiments={setCountsSentiments}
        />
      )}
      <div className="w-full flex justify-end py-3">
        <UploadComponent setUploadTxts={setUploadTxts} />
      </div>
      <Divider />
      <ShowResults
        sentiments={sentiments}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
