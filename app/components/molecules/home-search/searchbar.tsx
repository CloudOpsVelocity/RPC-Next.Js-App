const Searchbar = () => {
  return (
    <div
      className="border border-[#CBE9FF] rounded-3xl bg-white h-[80px] w-full overflow-hidden grid grid-cols-[300px_auto]"
      style={{ boxShadow: "0px 4px 14px 0px rgba(116, 196, 255, 0.19)" }}
    >
      <div className="border-r grid items-center">
        <h3 className="text-xl text-slate-600 text-center">Residential</h3>
      </div>
      <div className="flex">
        <Input />
        <button>near me</button>
        <button>Search</button>
      </div>
    </div>
  );
};

export default Searchbar;

const Input = () => {
  return (
    <div>
      <input placeholder="Search By Location" type="text" />
    </div>
  );
};
