import { useEffect, useState, useMemo } from 'react';

interface SearchFieldProps {
  initialData: Array<{ [key: string]: any }>;
  setData: React.Dispatch<React.SetStateAction<Array<{ [key: string]: any }>>>;
}

export const SearchField: React.FC<SearchFieldProps> = ({ setData, initialData }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const memoizedInitialData = useMemo(() => initialData, [initialData]);

  useEffect(() => {
    const filteredRows = memoizedInitialData.filter((row) =>
      Object.values(row.service).some((value) =>
        value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setData(filteredRows);
  }, [searchQuery, memoizedInitialData, setData]);

  return (
    <input
      value={searchQuery}
      type="search"
      className='w-full bg-white p-3 border-0  rounded-xl '
      placeholder="البحث... "
      dir='rtl'
      onChange={handleSearchChange}
    />
  );
};
