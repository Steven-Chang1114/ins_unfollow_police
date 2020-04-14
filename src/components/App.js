import React from "react"
import ins from "../api/ins"
//const request = require("request")
import axios from "axios"

class App extends React.Component{
    
    fetchData = async() => {
        const appID = 1533933806761524
        const url = "http://ins-unfollow-police.netlify.com"

        const baseURL = `https://api.instagram.com/oauth/authorize?client_id=${appID}&redirect_uri=${url}/&scope=user_profile,user_media&response_type=code`
        const urls = "https://api.instagram.com/oauth/authorize?client_id=1533933806761524&redirect_uri=http://ins-unfollow-police.netlify.com/&scope=user_profile,user_media&response_type=code"
        const token = "IGQVJVN29mQTRwVmt2a0d1Ni1xd2JIUmZAYSElUTGZAzYngzQmgwYWRsZAUZAJS1JZARVVoaVNQUkdDN0U4cHBfeF9SeGJZATmpSb181NHdlRld2RGlXLUFXYjBLd3pWbl9WZAm40bVAxRFY0cHFta0x1cG02eQZDZD"
        const example = "https://graph.instagram.com/me?fields=id,username&access_token=IGQVJVYkRBejBVSjNKemFNb09lSTBNVDNiNjktd3Jra0h5LS1xRGxJeU5RamJvRmFfLTNodFptbEVlYkQ4SDNVUDVDd0lFSFhjVV9NcGdPV3E5bjBnckZAURDVobjh0VjlMY3BWSEVkRlcxeDBnOVgwYQZDZD"

        const web = "https://graph.facebook.com/v3.2/17841407454779197?fields=biography%2Cid%2Cusername%2Cwebsite&access_token=IGQVJVYkRBejBVSjNKemFNb09lSTBNVDNiNjktd3Jra0h5LS1xRGxJeU5RamJvRmFfLTNodFptbEVlYkQ4SDNVUDVDd0lFSFhjVV9NcGdPV3E5bjBnckZAURDVobjh0VjlMY3BWSEVkRlcxeDBnOVgwYQZDZD"
        try{
            const res = await axios.get(baseURL)
            console.log(res)
        }catch(e){
            console.log("1111" + e)
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    render(){
        return(
            <div>
                hi
            </div>
        )
    }
}

export default App