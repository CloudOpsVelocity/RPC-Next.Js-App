import Footer from '@/app/components/layouts/primary/footer'
import Header from '@/app/components/layouts/primary/header'
import React from 'react'
import { greenTick, } from '@/app/images/commonSvgs'
import { BuildingIconABout } from '@/app/images/commonSvgs'
type Props = {}

export default function page({}: Props) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
  return (
    <div>
    <Header />{" "}
    <div className="mt-[70px] w-full shrink-0 rounded-[10px] m-auto h-auto bg-[#FFF]">
         ABout Us
         {/*About */}
            <div className='flex flex-row items-start justify-start w-full gap-[4%] max-w-[80%] mx-auto'>
                <div className='content flex flex-col justify-start items-start max-w-[60%]'>
                    <h1 className='text-[#003] font-[Montserrat] text-[26px] not-italic font-bold leading-[normal] pt-[20px]'><span className='text-[#2AA327]'>About</span> Get Right Property</h1>
                    <p className='text-[#003] font-[Montserrat] text-[20px] not-italic font-normal leading-[26px] pt-[20px] break-words'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sequi unde error rerum libero, iste et, expedita consequuntur atque quaerat reprehenderit nisi porro illum repellendus culpa perferendis sint! Perspiciatis doloribus sunt similique porro eos Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima ea adipisci sequi explicabo. Molestiae nisi libero quo ut reprehenderit dolores ducimus dolorem? Et sequi perspiciatis hic dolorem ratione explicabo magni itaque voluptatum minima autem!.</p>
                    <p className='text-[#003] font-[Montserrat] text-[20px] not-italic font-normal leading-[26px] pt-[20px] break-words'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.Lorem </p>
                    <a className='text-[#FFF] mt-[34px] font-[Montserrat] text-[20px] not-italic font-bold leading-[normal] px-[20.514px] py-[13.676px] justify-center items-center gap-[7.598px] rounded-[4px] bg-[#0073C6]' href={url} target='_blank'>
                    Explore Now
                    </a>
                </div>
                 <div>
                    <img 
                    className='w-[36%] h-[299.576px]'
                    src={"/youtube.png"}
                    />
                </div> 
            </div> 
            {/* best services */}
            <div className=' min-w-[100%] mt-[80px]  bg-[#F3FFF2]'>
                <div className='flex flex-row items-center justify-start w-full gap-[4%] max-w-[80%] mx-auto'>
                <img 
                    className='w-[36%] h-[299.576px]'
                    src={"/youtube.png"}
                    />
                    <div className='pt-[60px] pb-[60px]'>
                        <h1 className='text-[#2AA327] font-[Montserrat] text-[26px] not-italic font-bold leading-[normal] capitalize'>
                        <span className='text-[#003] '>We offer </span>the best services
                        </h1>
                        <p className='mt-2 text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[20px] not-italic font-normal leading-[26px]'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime voluptatibus rerum voluptate expedita aspernatur saepe cumque nostrum repellat alias laborum, a ab? Quisquam ullam quasi velit iste eveniet minima? Ex sit voluptas earum doloribus, a facere molestiae. Laudantium voluptas assumenda harum quidem repudiandae?
                        </p>
                        <div className='flex flex-col gap-[12px] mt-4'>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Post your Listing for Free</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Post your Listing for Free</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Set property alerts for your requirement</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Showcase your property as Rental, or for Sell</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Get instant queries over Phone, Email and SMS</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Performance in search & Track responses & views online</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Add detailed listing information within 60 seconds</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat] text-[18px] not-italic font-medium leading-[normal]'>Add multiple images per listings  and projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*founder */}
            <div className='flex flex-col justify-start items-start max-w-[80%] mx-auto  mt-[60px]'>
            <h1 className='text-[#003] font-[Montserrat] text-[26px] not-italic font-bold leading-[32px] '>
             What Our <span className='text-[#2AA327]'>Founder</span> Says About
             <br/>  Get Right Property
            </h1>
            <div className='flex flex-row justify-center items-start gap-[5%] mt-7'>
                <img 
                    className='w-[36%] h-[318px]'
                    src={"/youtube.png"}
                    />
                <div className='flex flex-col justify-center items-start '>
                    <h1 className='text-[#000] font-[Montserrat] text-[24px] not-italic font-semibold leading-[normal] mb-1'>Rahul Vishwakarma</h1>
                    <h3 className='text-[#767270] font-[Montserrat] text-[20px] italic font-semibold leading-[normal]'>Founder, Get Right Property</h3>
                    <p className='text-[#003] font-[Montserrat] text-[20px] not-italic font-normal leading-[26px] mt-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.Lorem ipsum dolor sit amet, conse</p>
                    <p className='text-[#003] font-[Montserrat] text-[20px] not-italic font-normal leading-[26px] pt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p> 
                </div>
            </div>
            </div>
            {/*prefect solution */}
            <div className='flex flex-col justify-start items-start max-w-[80%] mx-auto  mt-[60px]'>
                <h1 className='text-[#003] font-[Montserrat] text-[26px] not-italic font-bold leading-[normal] mt-2 mx-auto capitalize'>The Perfect Solution to <span className='text-[#2AA327] mt-2'>Best Project Finding</span></h1>
                <p className='text-[rgba(0,_0,_51,_0.95)] mx-auto font-[Montserrat] text-[20px] not-italic font-normal leading-[26px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis <br/> euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus </p>
                    <div className='flex flex-row gap-[2%] mt-8 mx-auto'>
                        <div className='h-[autopx] max-w-[30%] p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                           <div className=' w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto'><BuildingIconABout /> </div>
                                <h1 className='text-[#003] font-[Montserrat] text-[20px] not-italic font-bold leading-[30px] mt-4'>Newly Launched Projects</h1>
                                <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[15px] not-italic font-medium leading-[26px] mt-3 mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat. </p>
                                <a className='rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[16.594px] py-[11.063px] justify-center items-center '>Explore Now</a>
                        </div>
                        <div className='h-[autopx] max-w-[30%] p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                           <div className=' w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto'><BuildingIconABout /> </div>
                                <h1 className='text-[#003] font-[Montserrat] text-[20px] not-italic font-bold leading-[30px] mt-4'>Newly Launched Projects</h1>
                                <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[15px] not-italic font-medium leading-[26px] mt-3 mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat. </p>
                                <a className='rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[16.594px] py-[11.063px] justify-center items-center '>Explore Now</a>
                        </div>
                        <div className='h-[autopx] max-w-[30%] p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                           <div className=' w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto'><BuildingIconABout /> </div>
                                <h1 className='text-[#003] font-[Montserrat] text-[20px] not-italic font-bold leading-[30px] mt-4'>Newly Launched Projects</h1>
                                <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[15px] not-italic font-medium leading-[26px] mt-3 mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat. </p>
                                <a className='rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[16.594px] py-[11.063px] justify-center items-center '>Explore Now</a>
                     </div>  
                </div>
            </div>
            {/* */}
            <div className='h-auto relative min-w-[100%] mt-[80px]  bg-[#F3FFF2]'>
                    <img 
                    className='w-[8%] h-[38px] absolute top-0 right-0 mb-8'
                    src={"/youtube.png"}
                    />
                                    <h1 className='text-[#003] font-[Montserrat] text-[26px] not-italic font-bold leading-[normal] mt-2 mx-auto capitalize'>What our <span className='text-[#2AA327] mt-2'>Customers</span> say About us</h1>

                     <div className='flex flex-row gap-[2%] mt-8 mx-auto'>
                        <div className='h-[autopx] max-w-[30%] flex flex-col p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                              <div className='flex flex-row gap-2 justify-between   '> 
                                <div className='flex felx-row items-center gap-2'>
                                <img 
                                    className='w-[56px] h-[56px] rounded-full '
                                    src={"/youtube.png"}
                                    />
                                     <p> manish kumar<br/><span>Kurnool</span></p>
                                </div>  
                                <p className='text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]'>“</p>
                            </div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam animi necessitatibus, provident officiis illo, et exercitationem inventore veritatis culpa non corrupti iste ad ut eos! Aliquam soluta veniam accusantium incidunt, temporibus atque facilis. Libero molestias quaerat eveniet fugit temporibus dolore quam deserunt quibusdam.</p>
                        </div>
                        <div className='h-[autopx] max-w-[30%] flex flex-col p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                              <div className='flex flex-row gap-2 justify-between'> 
                                <div className='flex felx-row items-center gap-2  '>
                                <img 
                                    className='w-[56px] h-[56px] rounded-full '
                                    src={"/youtube.png"}
                                    />
                                     <p> manish kumar<br/><span>Kurnool</span></p>
                                </div>  
                                <p className='text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]'>“</p>
                            </div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam animi necessitatibus, provident officiis illo, et exercitationem inventore veritatis culpa non corrupti iste ad ut eos! Aliquam soluta veniam accusantium incidunt, temporibus atque facilis. Libero molestias quaerat eveniet fugit temporibus dolore quam deserunt quibusdam.</p>
                        </div>
                        <div className='h-[autopx] max-w-[30%] flex flex-col p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                              <div className='flex flex-row gap-2 justify-between'> 
                                <div className=' flex felx-row items-center gap-2 '>
                                <img 
                                    className='w-[56px] h-[56px] rounded-full '
                                    src={"/youtube.png"}
                                    />
                                     <p> manish kumar<br/><span>Kurnool</span></p>
                                </div>  
                                <p className='text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]'>“</p>
                            </div>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam animi necessitatibus, provident officiis illo, et exercitationem inventore veritatis culpa non corrupti iste ad ut eos! Aliquam soluta veniam accusantium incidunt, temporibus atque facilis. Libero molestias quaerat eveniet fugit temporibus dolore quam deserunt quibusdam.</p>
                        </div>
                    </div>
                <img 
                    className='w-[8%] h-[38px] absolute mt-12 bottom-0 left-0 '
                    src={"/youtube.png"}
                    />
            </div>
    </div>{" "}
    <Footer />
  </div>
);
}