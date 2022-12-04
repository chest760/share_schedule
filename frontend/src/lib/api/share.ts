import client from "./client";
import Cookies from "js-cookie"
import {ShareRoomData} from "utils";

export const enterRoom = (data:ShareRoomData,userid:number) =>{
    return client.put(`/room/${userid}`,data,{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}

export const makeRoom = (data:ShareRoomData) =>{
    return client.post("/room",data,{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}


export const getRoom = () => {
    return client.get("/room",{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")     
    }})
}

