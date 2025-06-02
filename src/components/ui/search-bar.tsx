import { Input } from "@/components/ui/input";
import React from "react";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const ICON_SIZE = 20;
const ICON_PADDING = 12;
const INPUT_HEIGHT = 48;

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  ...props
}) => (
  <Input
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    {...props}
  />
);

export default SearchBar;

