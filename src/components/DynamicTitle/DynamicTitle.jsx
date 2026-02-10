import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const DynamicTitle = () => {

    const location=useLocation();
    useEffect(()=>{
        const pathName=location.pathname.split("/").pop();
        let title="Chef Bazaar";

        if(pathName){
            title=`${pathName.charAt(0).toUpperCase() + pathName.slice(1)} | Chef Bazaar`;
        }
        document.title=title;
        },[location])
};

export default DynamicTitle;