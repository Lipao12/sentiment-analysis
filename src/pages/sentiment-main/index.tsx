import { useState } from "react";
import { Divider } from "../../ui/components/divider";
import { SwitchSelection } from "../../ui/components/switcher-selection";
import { UploadComponent } from "../../ui/components/uptload";
import { ShowChartResult } from "./show-chart-result";
import { ShowResults } from "./show-results";
import { UserInput } from "./user-input";
import { UserInputLink } from "./user-input-link";

export const SentimentPage = () => {
  const [sentiments, setSentiments] = useState<any>([]);
  const [counts, setCountsSentiments] = useState<any>({
    neutral: 10,
    positive: 5,
    negative: 13,
  });
  const [uploadTxts, setUploadTxts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedLinkFile, setSelectedLinkFile] = useState("file");
  const [selectedChartFile, setSelectedChartFile] = useState("file");

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 text-secundary">
          Análise de sentimento de frases
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {selectedLinkFile === "file"
            ? "No espaço abaixo, adicione a frase que deseja ser inferida na análise de sentimentos."
            : "No espaço abaixo, adicione o link para verificar os comentários do twitter."}
        </p>
      </div>
      <div className="ml-4">
        <SwitchSelection
          selected={selectedLinkFile}
          setSelected={setSelectedLinkFile}
        />
      </div>
      {selectedLinkFile === "file" ? (
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
      <div className="w-full flex justify-end py-3 pr-4">
        <UploadComponent setUploadTxts={setUploadTxts} />
      </div>
      <Divider />
      <div className="mr-4 mt-4 justify-end flex">
        <SwitchSelection
          selected={selectedChartFile}
          setSelected={setSelectedChartFile}
          result={true}
        />
      </div>
      {selectedChartFile === "file" ? (
        <ShowResults
          sentiments={sentiments}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <ShowChartResult counts={counts} sentiments={sentiments} />
      )}
    </div>
  );
};
