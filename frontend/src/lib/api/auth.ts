import { LoginData, SignUpData } from "utils";
import client from "./client";
import Cookies from "js-cookie"

// サインアップ
export const SignUp = (data: SignUpData) =>{
    return client.post("/auth", data)
}

//ログイン
export const LogIn = (data:LoginData) => {
    return client.post("auth/sign_in",data)
}

//ログアウト
export const SignOut = () => {
    return client.delete("auth/sign_out",{headers:{
        "access-token": Cookies.get("_access_token"),
        "client": Cookies.get("_client"),
        "uid": Cookies.get("_uid")
    }})
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
    return client.get("/auth/sessions", { headers: {
      "access-token": Cookies.get("_access_token"),
      "client": Cookies.get("_client"),
      "uid": Cookies.get("_uid")
    }})
  }