import {User} from "utils";
import client from "./client";
import Cookies from "js-cookie"
import {CalendarData} from "utils";


export const Eventregister = (data: CalendarData) =>{
    return client.post("/calendar", data,{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}

export const getEvent = () =>{
    return client.get("/calendar",{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}