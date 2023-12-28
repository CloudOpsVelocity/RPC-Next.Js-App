const Searchbar = () => {
  return (
    <div
      className="border border-[#CBE9FF] rounded-3xl bg-white h-[80px] w-[100%] overflow-hidden flex justify-between items-center  pr-[3%] pl-[3%]"
      style={{ boxShadow: "0px 4px 14px 0px rgba(116, 196, 255, 0.19)" }}
    >

      <div className="border-r-2  items-center">
        <h3 className=" text-center text-[16px] md:text-[20px] lg:text-[24px] font-[500] text-[#737579] whitespace-nowrap w-[20%]">Residential</h3>
      </div>

      <div className="w-[30%] bg-white">
        <Input />
      </div>

      <button className=" text-[16px] md:text-[20px] lg:text-[24px] font-[400] text-[#737579] whitespace-nowrap w-[20%]">near me</button>

      <button className="bg-[#148B16] h-[39px] md:h-[50px] rounded-[10px] text-[16px] md:text-[20px] lg:text-[24px] font-[700] text-[#FFF] whitespace-nowrap w-[15%] flex justify-center items-center"
      >
        Search
      </button>

    </div>
  );
};

export default Searchbar;




const Input = () => {
  return (
    <div>
      <input
        className=" text-[16px] md:text-[20px] lg:text-[24px] font-[500] text-[#737579] w-auto bg-white"
        placeholder="Search By Location" type="text" />
    </div>
  );
};
