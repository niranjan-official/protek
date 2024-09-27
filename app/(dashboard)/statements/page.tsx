import React from "react";

const getStatements = async() =>{
  
}
const page = async() => {
  const statements = await getStatements();
  return (
    <div className="flex h-screen w-full flex-col bg-slate-100 p-4">
      <h1 className="text-4xl font-bold">Problem statements</h1>
      <hr className="w-full my-4" />
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((obj) => (
          <div key={obj} className="rounded-xl bg-green-500 text-white p-2">
            <h2 className="text-xl font-bold">title</h2>
            <p className="text-sm">description</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
