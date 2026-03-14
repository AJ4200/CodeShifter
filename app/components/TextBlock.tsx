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
    <div className="flex-1 overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm">
      <div className="flex items-center border-b border-border/60 bg-muted/40 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
      </div>
      <textarea
        className="h-[300px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!editable}
        placeholder={editable ? "Describe your code in plain English..." : ""}
      />
    </div>
  );
};
