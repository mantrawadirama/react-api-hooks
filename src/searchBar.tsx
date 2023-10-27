interface SearchBarProps {
  onChange: (value: string) => void;
}
const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <input
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder="search users"
    />
  );
};

export default SearchBar;
