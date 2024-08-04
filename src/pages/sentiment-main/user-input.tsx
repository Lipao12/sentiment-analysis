export const UserInput = () => {
  return (
    <div className="p-4 flex flex-col justify-end items-end">
      <textarea
        className="w-full p-4 border border-gray-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-secundary"
        placeholder="Digite ou cole o texto aqui..."
      ></textarea>
      <button
        type="button"
        className="mt-4 w-auto p-2 bg-secundary text-slate-50 rounded hover:bg-gray-900 transition-colors duration-200"
      >
        Analisar Sentimento
      </button>
    </div>
  );
};
