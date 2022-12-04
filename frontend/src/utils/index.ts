export interface SignUpData {
    "name": string
    "email": string
    "password": string
    "passwordConfirmation": string
}

export interface LoginData{
    name:string
    password:string
}

export interface User {
    id: number
    uid: string
    provider: string
    email: string
    name: string
    nickname?: string
    image?: string
    allowPasswordChange: boolean
  }

export interface CalendarData{
    title: string
    start: string
    end: string
    todo: boolean
}

export interface ShareRoomData{
    user1_id: number|null
    user2_id: number|null
    user3_id: number|null
    room_name: string
    password: string
}