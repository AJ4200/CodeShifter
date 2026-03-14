interface Props {
  text: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  onChange = () => {},
}) => {
  return (
    <div className="flex-1 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center border-b border-border px-3 py-1.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
      </div>
      <textarea
        className="h-[280px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted focus:outline-none"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!editable}
        placeholder={editable ? "Describe your code in plain English..." : ""}
      />
    </div>
  );
};
