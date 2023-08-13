import "./App.css";

import { Shows } from "./components/Shows/Shows.tsx";
import { useDebounce, useLocalStorage } from "usehooks-ts";
import { tvMazeApi } from "./api.ts";
import { useMemo } from "react";

const QUERY_DEBOUNCE_MS = 300;

function App() {
  const [query, setQuery] = useLocalStorage("query", "");

  const debouncedQuery = useDebounce(query, QUERY_DEBOUNCE_MS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // while `useFetch` does the job, in real-world apps we wouldn't use something
  // as simple as that, because it lacks useful states like "`isInitialized`,
  // `isFetching`" and ignore flags (for avoiding unnecessary requests). Without
  // these, the UX is not as good. Other than that, it's also less flexible,
  // because it's a hook. Namely, we can't use it in async thunks and or share
  // our own query client code with it. Actual libraries we would use are
  // `react-query` (https://tanstack.com/query/v3/) and `redux-toolkit`
  // (https://redux-toolkit.js.org/rtk-query/api/created-api/overview#api-slice-overview),
  // which has a builtin of the first.
  const { data: showsBase = [], error } =
    tvMazeApi.useSearchShows(debouncedQuery);

  // some data might be missing, resulting in nullable for `item.show`
  const shows = useMemo(
    () => showsBase.filter((item) => item.show),
    [showsBase]
  );

  return (
    <>
      <h1>The TV Series Database</h1>
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      {error ? <p>There is an error.</p> : <Shows data={shows} />}
    </>
  );
}

export default App;
