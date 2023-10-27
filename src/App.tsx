import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./searchBar";
import axios from "axios";
import { useDebounce } from "./hooks";

interface User {
  id: number;
  name: string;
}
const App = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  //  this will help to wait until user stops typing in search box.
  //  to avoid multiple calls to api
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const controller = new AbortController();
    // below code forms a race condition bcz of each letter user tries to filter
    (async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          "/api/users?search=" + debouncedSearch,
          {
            signal: controller.signal,
          }
        );
        if (response.data) {
          setUsers(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request cancelled");
          return;
        }
        setError(true);
        setLoading(false);
      }
    })();

    //clean up to clear controller for every use effect call
    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);
  return (
    <div className="tutorial">
      <SearchBar onChange={setSearch} />
      {loading && <h1>Loading ...</h1>}
      {error && <h1>Error</h1>}
      <h1>Good way of handling API calls</h1>

      <h1>{users.length}</h1>

      {!loading &&
        users.map((user) => {
          return <div key={user.id}>{user.name}</div>;
        })}
    </div>
  );
};

export default App;
