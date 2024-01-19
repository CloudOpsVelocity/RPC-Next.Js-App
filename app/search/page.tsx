import React from 'react';
import Header from '../components/layouts/primary/header';
import SearchAndFilterCon from './searchAndFilterCon';
import LeftSideBlock from './leftSideBlock';
import RightSideBlock from './rightSideBlock';
import Footer from '../components/layouts/primary/footer';

const SearchingPage = () => {
   
    return (
        <div className="w-full flex justify-center items-center flex-col ">
            <Header />
            <SearchAndFilterCon />
            <div className=" w-[100%] flex justify-center items-center ">
                <LeftSideBlock />
                <RightSideBlock />
            </div>
            <Footer/>

        </div>
    );
    
}


export default SearchingPage;