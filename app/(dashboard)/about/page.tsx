import Footer from '@/app/components/layouts/primary/footer'
import Header from '@/app/components/layouts/primary/header'
import React from 'react'
import { BlogCOnatainerSVg, greenTick, Illustrationcircles, } from '@/app/images/commonSvgs'
import { BuildingIconABout } from '@/app/images/commonSvgs'
import { Input } from '@mantine/core'
type Props = {}

export default function page({}: Props) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}`
  return (
    <div>
    <Header />{" "}
    <div className="mt-[70px] w-full shrink-0 rounded-[10px] m-auto h-auto bg-[#F5F7F8]">
         ABout Us
         {/*About */}
            <div className='flex flex-row items-center justify-start w-full gap-[4%] max-w-[80%] mx-auto'>
                <div className='content flex flex-col justify-start items-start max-w-[60%]'>
                    <h1 className='text-[#003] font-[Montserrat] text-[14px] sm:text-[20px] xl:text-[26px] not-italic font-bold leading-[normal] sm:pt-[10px] xl:pt-[20px]'><span className='text-[#2AA327] '>About</span> Get Right Property</h1>
                    <p className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-normal leading-[26px] sm:pt-[10px] pt-[20px] break-words  '>Get Right Property is your ultimate real estate companion, designed to streamline buying, selling, and property exploration. Our app allows users to effortlessly post properties and inquire about those of interest. With a user-friendly interface, you can list your property, search for available listings, and browse a diverse range of options.</p>
                    <p className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-normal leading-[26px] sm:pt-[10px] pt-[20px] break-words'>Connect with buyers, sellers, and agents seamlessly, and stay updated with the latest real estate news and trends. Whether you're looking to advertise, find your dream home, or simply explore the market, Get Right Property offers a comprehensive platform for all your real estate needs. Experience a smarter way to navigate property transactions and make informed decisions with ease.</p>
                    <a className='text-[#FFF] sm:mt-[20px] xl:mt-[34px] font-[Montserrat] sm:text-[17px] xl:text-[20px] not-italic font-bold leading-[normal] px-[20.514px] py-[13.676px] justify-center items-center gap-[7.598px] rounded-[4px] bg-[#0073C6]' href={url} target='_blank'>
                    Explore Now
                    </a>
                </div>
                    <img 
                    className='w-[30%] h-[299.576px]'
                    src={"https://d2l0lb5gc1bw3t.cloudfront.net/staticmedia-images-icons/About%20us%20/About%20getrightproperty.png"}
                    />
            </div> 
            {/* best services */}
            <div className=' min-w-[100%] sm:mt-[60px] xl:mt-[80px]  bg-[#F3FFF2]'>
                <div className='flex flex-row items-center justify-start w-full gap-[4%] max-w-[80%] mx-auto'>
                <img 
                    className='w-[36%] h-[299.576px]'
                    src={"https://d2l0lb5gc1bw3t.cloudfront.net/staticmedia-images-icons/About%20us%20/best%20service.png"}
                    />
                    <div className='pt-[60px] pb-[60px]'>
                        <h1 className='text-[#2AA327] font-[Montserrat] sm:text-[20px] xl:text-[26px] not-italic font-bold leading-[normal] capitalize'>
                        <span className='text-[#003] '>We offer </span>the best services
                        </h1>
                        <p className='mt-2  text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-normal leading-[26px]'>
                        Get Right Property provides a streamlined platform to post and browse property listings, connect with buyers and sellers, and access the latest market trends. Experience effortless property transactions with our user-friendly tools designed for all your real estate needs.
                        </p>
                        <div className='flex flex-col gap-[12px] mt-4'>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Post your Listing for Free</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Post your Listing for Free</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Set property alerts for your requirement</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Showcase your property as Rental, or for Sell</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Get instant queries over Phone, Email and SMS</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Performance in search & Track responses & views online</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Add detailed listing information within 60 seconds</p>
                            </div>
                            <div className='flex flex-row items-center justify-start gap-1 '>
                                {greenTick}
                                <p className='text-[#242424] font-[Montserrat]  sm:text-[14px] xl:text-[18px] not-italic font-medium leading-[normal]'>Add multiple images per listings  and projects</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*founder */}
            <div className='flex flex-col justify-start items-start max-w-[80%] mx-auto  sm:mt-[50px] xl:mt-[60px]'>
            <h1 className='text-[#003] font-[Montserrat] sm:text-[20px] xl:text-[26px] not-italic font-bold leading-[32px] '>
             What Our <span className='text-[#2AA327]'>Founder</span> Says About
             <br/>  Get Right Property
            </h1>
            <div className='flex flex-row justify-center items-start gap-[5%] mt-7'>
                <img 
                    className='w-[36%] h-[318px]'
                    src={"https://d2l0lb5gc1bw3t.cloudfront.net/staticmedia-images-icons/About%20us%20/founder.png"}
                    />
                <div className='flex flex-col justify-center items-start '>
                    <h1 className='text-[#000] font-[Montserrat] sm:text-[20px] xl:text-[24px] not-italic font-semibold leading-[normal] mb-1'>Rahul Vishwakarma</h1>
                    <h3 className='text-[#767270] font-[Montserrat] sm:text-[16px] xl:text-[20px] italic font-semibold leading-[normal]'>Founder, Get Right Property</h3>
                    <p className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-normal leading-[26px] mt-4'>At Get Right Property, we're dedicated to reshaping real estate through cutting-edge professionalism training and collaborative environments. Our commitment to comprehensive market analysis and innovative solutions drives us. With a focus on results and maximizing sales potential, we're rewriting industry norms and surpassing client needs.</p>
                    <p className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-normal leading-[26px] pt-3'>Join us in this journey to redefine excellence in real estate. Together, let's create a future where every transaction is exceptional and every client's dream finds its perfect home.</p> 
                </div>
            </div>
            </div>
            {/*prefect solution */}
            <div className='flex flex-col justify-start items-start max-w-[80%] mx-auto  sm:mt-[50px] xl:mt-[60px]'>
                <h1 className='text-[#003] font-[Montserrat] sm:text-[20px] xl:text-[26px] not-italic font-bold leading-[normal] mt-2 mx-auto capitalize'>The Perfect Solution to <span className='text-[#2AA327] mt-2'>Best Project Finding</span></h1>
                <p className='text-[rgba(0,_0,_51,_0.95)] mx-auto font-[Montserrat] sm:text-[16px] xl:text-[20px] not-italic font-normal leading-[26px]'>The perfect solution for finding the best projects. Our platform offers a seamless search experience, detailed listings, and real-time updates, making your project discovery quick and effortless.</p>
                    <div className='flex flex-row gap-[2%] mt-8 mx-auto'>
                        <div className='h-[autopx] max-w-[30%] sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                           <div className=' w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto'><BuildingIconABout /> </div>
                                <h1 className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-bold leading-[30px] mt-4'>Newly Launched Projects</h1>
                                <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[15px] not-italic font-medium leading-[26px] mt-3 mb-8'>Discover the latest in real estate with our newly launched projects. Explore innovative projects and find your perfect new home today. </p>
                                <a href='https://www.getrightproperty.com/search?projStatus=108'  target='_blank' className='cursor-pointer rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[16.594px] py-[11.063px] justify-center items-center '>Explore Now</a>
                        </div>
                        <div className='h-[autopx] max-w-[30%] sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                           <div className=' w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto'><BuildingIconABout /> </div>
                                <h1 className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-bold leading-[30px] mt-4'>Newly Launched Projects</h1>
                                <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[15px] not-italic font-medium leading-[26px] mt-3 mb-8'>Explore our completed projects and find beautifully finished homes ready for you. Discover quality craftsmanship and move-in-ready projects now. </p>
                                <a href='https://www.getrightproperty.com/search?projStatus=107' target='_blank' className='cursor-pointer rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] px-[16.594px] py-[11.063px] justify-center items-center '>Explore Now</a>
                        </div>
                        <div className='h-[autopx] max-w-[30%] sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                           <div className=' w-[65.105px] h-[53px] rounded-[4px] flex justify-center items-center bg-[rgba(2,_152,_55,_0.10)] p-auto'><BuildingIconABout /> </div>
                                <h1 className='text-[#003] font-[Montserrat] sm:text-[15px] xl:text-[20px] not-italic font-bold leading-[30px] mt-4'>Newly Launched Projects</h1>
                                <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[15px] not-italic font-medium leading-[26px] mt-3 mb-8'>Check out our ongoing projects for future-ready homes. Stay updated on construction progress and secure your ideal projects early. </p>
                                <a href='https://www.getrightproperty.com/search?projStatus=106'  target='_blank' className='cursor-pointer rounded-[4px] border-[1.618px] border-[solid] border-[#0073C6] sm:px-[10px] sm:py-[8px] xl:px-[16.594px] xl:py-[11.063px] justify-center items-center '>Explore Now</a>
                     </div>  
                </div>
            </div>
            {/* */}
            <div className='h-auto flex flex-col items-center relative min-w-[100%] sm:mt-[60px] xl:mt-[80px]  bg-[#F3FFF2]'>
                  <Illustrationcircles className=' absolute top-0 right-0 mb-8'/>

                    <h1 className='text-[#003] font-[Montserrat] mt-5 sm:text-[20px] xl:text-[26px]  not-italic font-bold leading-[normal] mx-auto capitalize'>What our <span className='
                    text-[#2AA327] mt-2'>Customers</span> say About us</h1>
                     <div className='flex flex-row gap-[2%]  max-w-[80%] my-8 mx-auto'>
                        <div className='h-[autopx] max-w-[30%] flex flex-col sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                              <div className='flex flex-row gap-2 justify-between   '> 
                                <div className='flex felx-row items-center gap-2'>
                                <img 
                                    className='w-[56px] h-[56px] rounded-full '
                                    src={"/youtube.png"}
                                    />
                                     <p className='text-[#003] font-[Montserrat] text-[18px] not-italic font-bold leading-[19.5px]'> manish kumar<br/><span className = "text-[#767676] font-[Montserrat] text-[16px] not-italic font-medium leading-[19.5px]">Bangalore</span></p>
                                </div>  
                                <p className='text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]'>“</p>
                            </div>
                            <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[16px] not-italic font-normal leading-[22px] mt-2 pl-2'>Get Right Property made finding my new home effortless! The platform is user-friendly, with up-to-date listings and easy navigation.</p>
                        </div>
                        <div className='h-[autopx] max-w-[30%] flex flex-col sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                              <div className='flex flex-row gap-2 justify-between'> 
                                <div className='flex felx-row items-center gap-2  '>
                                <img 
                                    className='w-[56px] h-[56px] rounded-full '
                                    src={"/youtube.png"}
                                    />
                                     <p className='text-[#003] font-[Montserrat] text-[18px] not-italic font-bold leading-[19.5px]'>Aayushi Dwivedi<br/><span className = "text-[#767676] font-[Montserrat] text-[16px] not-italic font-medium leading-[19.5px]">Bangalore</span></p>
                                </div>  
                                <p className='text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]'>“</p>
                            </div>
                            <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[16px] not-italic font-normal leading-[22px] mt-2 pl-2'>Get Right Property simplified my home search with its easy-to-use interface and up-to-date listings!</p>
                        </div>
                        <div className='h-[autopx] max-w-[30%] flex flex-col sm:p-6 xl:p-12 rounded-[20px] justify-center border-[1px] border-[solid] border-[rgba(194,194,194,0.60)] bg-[#FFF]           [box-shadow:0px_10px_25px_0px_rgba(194,_194,_194,_0.44)]'>
                              <div className='flex flex-row gap-2 justify-between'> 
                                <div className=' flex felx-row items-center gap-2 '>
                                <img 
                                    className='w-[56px] h-[56px] rounded-full '
                                    src={"/youtube.png"}
                                    />
                                     <p className='text-[#003] font-[Montserrat] text-[18px] not-italic font-bold leading-[19.5px]'>Virender kumar<br/><span className = "text-[#767676] font-[Montserrat] text-[16px] not-italic font-medium leading-[19.5px]">Bangalore</span></p>
                                </div>  
                                <p className='text-[#029837] font-[Mulish] text-[48px] not-italic font-bold leading-[40px]'>“</p>
                            </div>
                            <p className='text-[rgba(0,_0,_51,_0.95)] font-[Montserrat] text-[16px] not-italic font-normal leading-[22px] mt-2 pl-2'>Get Right Property made inquiring about projects easy, with quick and helpful responses every time!</p>
                        </div>
                    </div>
                    <Illustrationcircles className=' absolute mt-12 bottom-0 left-0 '
                    />

            </div>
            <div className='max-w-[60%] bg-[#F5F7F8] mt-16 sm:pb-14 xl:pb-24 flex flex-row mx-auto    justify-between items-center gap-3'>
                <div className=' '>
                    <h1 className='font-[Montserrat] sm:text-[20px] xl:text-[24px] not-italic font-bold leading-[normal]'>
                    Subscribe To Our Newsletter
                    </h1>
                    <p className='text-[#303030] font-[Montserrat] sm:text-[18px] xl:text-[20px] italic font-medium leading-[normal]'>
                    Get updates to all about the Real Estate through our blogs
                    </p>
                    <div className='inline-flex mt-10 p-[16px]  w-[592px] justify-between items-center gap-[8px] rounded-[10px] border-[1px] border-[solid] border-[#BBC9DD] bg-[#FCFCFC]'>
                        <input
                        className='outline-none w-full text-[#666] font-[Montserrat] sm:text-[18px] xl:text-[20px] italic font-medium leading-[normal]'
                        placeholder='Enter your mail for new blog  '
                        />
                        <button className='text-[#FFF]   font-[Montserrat] text-[20px] not-italic font-semibold leading-[normal] flex p-[9px]  justify-center items-center gap-[8px] rounded-[10px] bg-[#227FBC] ' name="Subscribe button">Sumbit</button>
                </div>
              
                </div>
            <BlogCOnatainerSVg className='h-auto'/>

        </div>
    </div>{" "}
    <Footer />
  </div>
);
}