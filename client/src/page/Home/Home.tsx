import React, { useState, useEffect } from "react";
import HomeTemplate from "../../components/Templates/HomeTemplate/HomeTemplate";
import { useAppSelector, useAppDispatch } from "../../App/Hooks/Hooks";
import { getDataByName, getMainData, getUserInfo, getSubscriptionsInfo } from "./../../App/Action/Action";
import { getFilterData } from "./../../App/Action/FilterActions";
import { openFilters } from "./../../App/Action/Action";
import { useLocation, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
function Home() {
    const dispatch = useAppDispatch();
    const cookies = new Cookies();
    const location = useLocation();
    const params = useParams();
    const [name, setName] = useState("");
    console.log(cookies.get("id"));
    useEffect(() => {
        console.log("params", params);
        dispatch(getFilterData());
        dispatch(getSubscriptionsInfo());
        cookies.get("id") && dispatch(getUserInfo(cookies.get("id")));
        dispatch(getMainData());
    }, [dispatch]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (name.trim().length) {
            dispatch(getDataByName(name));
            setName("");
        }
    };

    if (location.pathname === "/home" || params.name) {
        dispatch(openFilters(false));
    }
   

    return <HomeTemplate handle={handleSubmit} name={setName} />;
}

export default Home;
