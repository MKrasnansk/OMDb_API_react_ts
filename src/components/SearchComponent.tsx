import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import FindReplaceIcon from "@material-ui/icons/FindReplace";
import { Pagination } from "@material-ui/lab";
import React, { ChangeEvent, FormEvent, useState } from "react";
interface Props {
  onSearchSubmit: (query: string, page: number) => void;
}
export const SearchComponent: React.FC<Props> = (props) => {
  const [input, setInput] = useState("");
  const [page, setPage] = useState<number>(1);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchItunesSongs();
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const searchItunesSongs = () => {
    let searchString = input;
    let searchPage = page;
    if (searchString) {
      props.onSearchSubmit(searchString, searchPage);
    }
  };
  const handlePage = (e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    searchItunesSongs();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="search">Search field</InputLabel>
          <OutlinedInput
            id="search"
            value={input}
            startAdornment={
              <InputAdornment position="start">
                <FindReplaceIcon />
              </InputAdornment>
            }
            labelWidth={85}
            onChange={handleInput}
            autoFocus
          />
        </FormControl>
      </form>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
          hideNextButton
          hidePrevButton
          count={10}
          onChange={handlePage}
        />
    </>
  );
};
