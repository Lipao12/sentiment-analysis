import { CardSentiment } from "../../ui/components/card-sentiment";
import { Loading } from "../../ui/components/loading";

interface ShowResultsProps {
  sentiments: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const ShowResults = ({
  sentiments,
  loading,
  setLoading,
}: ShowResultsProps) => {
  if (sentiments.length > 0) {
    console.log("Aqui temos: ", sentiments);
  }
  return (
    <div className="">
      {loading && (
        <div className="flex justify-center mt-4">
          <Loading />
        </div>
      )}
      {sentiments.length > 0 ? (
        <div className="mt-2 p-4 gap-4 flex flex-col-reverse">
          {sentiments.map((sentiment: any) => {
            return (
              <CardSentiment
                key={sentiment.id}
                sentiment={sentiment.label}
                confiability={Math.floor(sentiment.score * 100)}
                text={sentiment.text}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full p-4">
          <h1 className="text-slate-700 text-xl">
            Histórico de frases, ao adicionar frases acima, o resultado irá
            aparecer aqui
          </h1>
        </div>
      )}
    </div>
  );
};
