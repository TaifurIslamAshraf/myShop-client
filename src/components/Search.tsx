import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = ({ intl }: any) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Input
        className="max-w-[500px]"
        name="search"
        placeholder={intl?.searchPlacholder}
      />
      <Button variant={"outline"}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;