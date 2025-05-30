import React, { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [itemResult, setItemResult] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [cache, setCache] = useState({});
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  // const handleAddItem = () => {
  //   if (input.trim() !== "") {
  //     setItem([...item, input]);
  //     setInput("");
  //   }
  // };
  const fetchSearchData = async () => {
    if(cache[input]) {
      setItemResult(cache[input]);
      return;
    }
    console.log(input, "this the api calll");
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );

    const data = await response.json();
    setItemResult(data?.recipes);
    // updating the cache in the with the help modfiy  and // setCache
    setCache((prevCache) => ({
      ...prevCache,
      [input]: data?.recipes,
    }));
    // console.log(data?.recipes);
  };
  useEffect(() => {
    const timer = setTimeout(fetchSearchData, 500);
    return () => clearTimeout(timer);
  }, [input]);
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-center bg-slate-900 text-white p-4">
        AutoCompleted Searching Bar with Tailwind CSS and React
      </h1>
      <div className="flex justify-center items-start h-screen w-full bg-slate-200 pt-10">
        <div className="bg-white p-6 rounded-lg shadow-md w-[90%] md:w-2/3 lg:w-1/2">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="flex-1 p-4 rounded-lg border-2 border-slate-400 focus:outline-none focus:border-blue-500 transition duration-300"
              type="text"
              placeholder="Search"
              onChange={handleInputChange}
              value={input}
              onFocus={() => setshowResult(true)}
            />
            {/* <button
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-6 py-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 focus:outline-none"
            >
              Enter Item
            </button> */}
          </div>

          {showResult && (
            <div className="mt-6 max-h-60 overflow-y-auto">
              <ul>
                {itemResult.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 border-b border-slate-200 hover:bg-slate-100 transition duration-300"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
