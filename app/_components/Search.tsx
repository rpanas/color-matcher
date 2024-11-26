import { ChangeEvent, InputHTMLAttributes, ReactElement } from "react";


export interface SearchValue {
  searchQuery: string;
  minPercent: number;
}

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'type' | 'onChange'> {
  value: SearchValue;
  onChange?: (value: SearchValue) => void;
}


export default function Search({ value, onChange, ...rest }: SearchProps): ReactElement {

  const handleChange = (key: keyof SearchValue, event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      ...value,
      [key]: event.currentTarget.value
    });
  }

  return (
    <div className="search">
      <div className="flex items-center w-full">
        <span>#</span>
        <input
          type="text"
          maxLength={6}
          value={value.searchQuery}
          onChange={handleChange.bind(null, 'searchQuery')}
          {...rest}
        />
      </div>

      <label className="flex">
        <input
          type="text items-center"
          className="percent"
          value={value.minPercent}
          maxLength={3}
          onChange={handleChange.bind(null, 'minPercent')}
        />
        <span>%</span>
      </label>
    </div>
  );
}
