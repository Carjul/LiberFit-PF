import axios from "axios";
import Json from "../../assets/gym.json";
import arraySet from "../utils/arraySet";
import { modalOpen } from "../FeatureSlices/Modal/Modal";
import {
    getData,
    filterDataPrice,
    openFilter,
    filterDataName,
    filterByMuscles,
    filterByBrands,
} from "../FeatureSlices/Filters/Filter";
import { getAllUsers, postUsers } from "../FeatureSlices/Users/Users";
import { payment,paymentALL } from "../FeatureSlices/Payments/payments";

const data = Json[0].sedes.map((d) => d.products.map((d) => d.name));
const exercises = Json[0].exercises.map((d) => d);
const products = Json[0].sedes.map((d) => d.products.map((d) => d));

const Route = import.meta.env.VITE_LOCAL_HOST
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getFilterData = () => async (dispatch: any) => {
    try {

        const data = await axios.get(`${BASE_URL || Route}/infolocaciones`);
        const products = await axios.get(`${BASE_URL || Route}/product`);
        const machines = await axios.get(`${BASE_URL || Route}/machine`);
        const exercises = await axios.get(`${BASE_URL || Route}/exercises`);
        const trainings = await axios.get(`${BASE_URL || Route}/training`);

        const response = {
            data: data.data,
            products: products.data,
            machines: machines.data,
            exercises: exercises.data,
            trainings: trainings.data,
        };

        dispatch(getData(response));
    } catch (error) {
        console.log(error);
    }
};

export const getDataByName = (name: any) => (dispatch: any) => {
    const dataSet = arraySet(data.flat());
    // dispatch(filterDataName(dataSet.map(d => d).filter(d => d.toLowerCase().includes(name))))
    dispatch(filterDataName(name));
};

export const getDataByPrice =
    (maxPrice: any, minPrice: any) => (dispatch: any) => {
        const dataSet = arraySet(products.flat());
        dispatch(
            filterDataPrice(
                dataSet
                    .map((d) => d)
                    .filter((d) => minPrice <= d.price <= maxPrice)
            )
        );
    };

export const filterProductsByPrice =
    (minPrice: any, maxPrice: any) => (dispatch: any) => {
        dispatch(filterDataPrice([minPrice, maxPrice]));
    };

export const filterByMuscle =
    (muscles: any, category: any) => (dispatch: any) => {
        dispatch(filterByMuscles([muscles, category]));
    };

export const filterByBrand = (brands: any) => (dispatch: any) => {
    dispatch(filterByBrands(brands));
};

export const openModal = (active: boolean) => (dispatch: any) => {
    dispatch(modalOpen(active));
};

export const openFilters = (active: boolean) => (dispatch: any) => {
    dispatch(openFilter(active));
};

export const getUsers = () => async (dispatch: any) => {
    axios("") // endpoint de todos los users
        .then((res) => dispatch(getAllUsers(res)))
        .catch((e) => console.log(e));
};

export const postUser = (payload: any) => async (dispatch: any) => {
    try {
        let json = await axios.post(`${BASE_URL || Route}/clients`,payload) // enpoint de post user
        return json
    } catch (error) {
        console.log("--->", error);
    }
};

export const postElement = (payload:any, element:string) =>  (dispatch: any) => {
    try {
        let json = axios.post(`${BASE_URL || Route}/${element}`,payload) 
        console.log("Action")
        console.log(payload)
    } catch (error) {
        console.log(error)
    } 
}

export const getPaymentInfo = (payload: any) => async (dispatch: any) => {
    try {
       
        let InforpagoClient = await axios.get(`clients/payments?id=${payload}` ) // {email, password}
        
        dispatch(payment(InforpagoClient.data))
        return InforpagoClient // {}
    } catch (error) {
        console.log("-->", error);
    }
};

export const getPaymentAllInfo = () => async (dispatch: any) => {
    try {
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiY2FybG9zIiwiZW1haWwiOiJjYXJsb3NPd25lckBsaWJlcmZpdC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NjciLCJwaG9uZSI6IjEyMzEyMzEyMyIsImF2YXRhciI6Imh0dHBzOi8vdWktYXZhdGFycy5jb20vYXBpLz9uYW1lPUVsb24rTXVzayIsImNyZWF0ZWRBdCI6IjIwMjItMTEtMDhUMjE6NDY6NDAuOTg0WiIsInVwZGF0ZWRBdCI6IjIwMjItMTEtMDhUMjE6NDY6NDEuMjIxWiIsIkd5bUlkIjoiMjA0MTA1ODctOTNkOC00YzUwLTgwODctNDEzNTYzMDUyY2MxIiwiUm9sSWQiOjR9LCJpYXQiOjE2Njc5NDQwNDR9.RsqdvuxUbZfnPTYjdt6ENX85ViE0Jc3P70-Bwqwx4hM"
        let InforpagoClient = await axios.get(`clients/payments?token=${token}`) // {email, password}
        
        dispatch(paymentALL(InforpagoClient.data))
        return InforpagoClient // {}
    } catch (error) {
        console.log("-->", error);
    }
};
