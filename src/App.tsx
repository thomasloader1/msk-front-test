import React, { useEffect } from "react";
import MyRouter from "routers/index";

function App() {

  useEffect(() => {
    const { VITE_OM_WP_API } = import.meta.env

    const fetchData = async () => {
      const request = await fetch(`${VITE_OM_WP_API}/categories`)
      const data = await request.json()
      console.log({data})
    }

    fetchData()

  }, [])
  


  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <MyRouter />
    </div>
  );
}

export default App;
