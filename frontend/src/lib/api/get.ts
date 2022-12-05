import {User} from "utils";
import client from "./client";
import Cookies from "js-cookie"
import {CalendarData} from "utils";


export const registerEvent = (data: CalendarData) =>{
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

export const updateEvent = (data: CalendarData, id: string) => {
    return  client.put(`/calendar/${id}`,data, {headers:{
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }})
}

export const deleteEvent = (id: string) => {
    return  client.delete(`/calendar/${id}`, {headers:{
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }})
}


export const getEventofAll = (roomid: number) =>{
    return client.get(`/share_calendar/${roomid}`,{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}

export const deleteRoom = (id: string) => {
    return  client.delete(`/room/${id}`, {headers:{
            "access-token": Cookies.get("_access_token"),
            "client": Cookies.get("_client"),
            "uid": Cookies.get("_uid")
        }})
}