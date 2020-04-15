const selectors = {
    modalTrigger: 'Y8-fY',
    unameElement: 'FPmhX',
    userLi: 'NroHT',
    closeBtn: 'pxaFn',
    flwTitle: 'm82CD',
    objDiv: "j6cq2",
    followYou: "y3zKF",
    followEachOther: "_8A5w5",
    followStatus: "sqdOP",
    isFamous: "GWmZb Szr5J coreSpriteVerifiedBadge" //with V tag
}

const _x = {};
//Leave it true if you are searching your own account
const admin = true

_x.followers = [];
_x.following = [];
_x.notFollowBack = [];
_x.followers_elm = document.getElementsByClassName(selectors.modalTrigger)[1];
_x.following_elm = document.getElementsByClassName(selectors.modalTrigger)[2];

//Following
const maxLenIng = _x.following_elm.getElementsByTagName('span')[0].innerHTML;
//Follower
const maxLenEr = _x.followers_elm.getElementsByTagName('span')[0].innerHTML;

const areYouFollowed = className => {
    //y3zKF is you did not follow, _8A5w5 is you followed
    if(className.includes(selectors.followYou)){
        return false
    }
    return true
}

function updateFollowers() {
    _x.f = document.getElementsByClassName(selectors.unameElement);
    _x.status = document.getElementsByClassName(selectors.followStatus);
    for (let i = 0; i < _x.f.length; i++) {

        if(admin){
            if (_x.f[i] && _x.status[i+1].className) {
                //console.log(_x.status.length, _x.f.length)
                //_x.status[0] is Edit_Profile button
                const follow = areYouFollowed(_x.status[i+1].className)
                //console.log(_x.f[i].innerHTML, follow)
                _x.followers.push({
                    name: _x.f[i].innerHTML,
                    isFollowedBack: follow
                });
            }
        }else{
            _x.followers.push({
                name: _x.f[i].innerHTML,
            });
        }
    }
}

function updateFollowing() {
    _x.f = document.getElementsByClassName(selectors.unameElement);
    //_x.isFamous = document.getElementsByClassName(selectors.unameElement)
    for (let i = 0; i < _x.f.length; i++) {
        if (_x.f[i]) {
            const verified = isVerified(_x.f[i].nextSibling)
            //console.log(_x.f[i].innerHTML, verified)
            _x.following.push({
                name: _x.f[i].innerHTML,
                //Convinent for clean data
                isOrdinary: !verified
            });
        }
    }

    findUnfollower()
}

const isVerified = html => {
    if(!html){
        return false
    }
    return true
}

//Find the users that you follow them but they did not
const findUnfollower = () => {
    //Clean users that leaves followers that you followed back and your following that is not celebarity
    const followers = cleanData(_x.followers, "isFollowedBack")
    const followings = cleanData(_x.following, "isOrdinary")

    //console.log(followers)
    //console.log(followings)
    let id = 0;
    for(let i = 0; i < followings.length; i++){
        let followed = false;
        for(let j = 0; j < followers.length; j++){
            if(followers[j] === followings[i]){
                followed = true
            }
        }

        if(!followed){
            _x.notFollowBack.push({
                id: id,
                name: followings[i]
            })

            id++
        }
    }
    console.log("Success!")
    console.log(_x.notFollowBack)
}

const cleanData = (followers, status) => {
    const cleanData = []

    for(let i = 0; i < followers.length; i++){
        if(followers[i][status]){
            cleanData.push(followers[i]['name'])
        }
    }

    return cleanData
}

//Clear the data
const init = () => {
    _x.followers = [];
    _x.following = [];
    _x.notFollowBack = [];
    _x.followers_elm = document.getElementsByClassName(selectors.modalTrigger)[1];
    _x.following_elm = document.getElementsByClassName(selectors.modalTrigger)[2];
}
