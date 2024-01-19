import React from 'react';
import Header from '../components/layouts/primary/header';
import SearchAndFilterCon from './searchAndFilterCon';
import LeftSideBlock from './leftSideBlock';
import RightSideBlock from './rightSideBlock';

const SearchingPage = () => {
   
    return (
        <div className="w-full ">
            <Header />
            <SearchAndFilterCon />
            <div className=" w-[100%] flex justify-between items-start ">
                <LeftSideBlock />
                <RightSideBlock />
            </div>

        </div>
    );
    
}


export default SearchingPage;