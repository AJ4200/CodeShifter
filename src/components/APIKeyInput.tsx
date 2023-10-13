interface Props {
  apiKey: string;
  onChange: (apiKey: string) => void;
}

export const APIKeyInput: React.FC<Props> = ({ apiKey, onChange }) => {
  return (
    <input
      className="shadow-2xl rounded-md w-96 bg-gray-900/30 p-1 backdrop-blur-sm"
      type="password"
      placeholder="OpenAI API Key"
      value={apiKey}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
