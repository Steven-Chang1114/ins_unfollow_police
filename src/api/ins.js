import axios from "axios"

const appID = 1533933806761524
const url = "http://localhost:3000/auth/"

export default axios.create({
    baseURL: `https://api.instagram.com/oauth/authorize?client_id=${appID}&redirect_uri=${url}/auth/&scope=user_profile,user_media&response_type=code`
})