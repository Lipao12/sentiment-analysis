interface DividerProps {
  h?: string;
  dashed?: boolean;
}

export const Divider = ({ h = "", dashed = true }: DividerProps) => {
  return (
    <div
      className={`border border-zinc-200 ${h ? h : "w-full"} ${
        dashed ? "border-dashed" : "border"
      }`}
    />
  );
};
