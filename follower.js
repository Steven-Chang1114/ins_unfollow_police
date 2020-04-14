const selectors = {
    modalTrigger: 'Y8-fY',
    unameElement: 'FPmhX',
    userLi: 'NroHT',
    closeBtn: 'pxaFn',
    flwTitle: 'm82CD',
    objDiv: "j6cq2",
    followYou: "y3zKF",
    followEachOther: "_8A5w5",
    followStatus: "sqdOP L3NKy",
    isFamous: "GWmZb Szr5J coreSpriteVerifiedBadge" //with V tag
}

const _x = {};

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
        if (_x.f[i] != undefined && _x.status[i] != undefined) {
            const follow = areYouFollowed(_x.status[i+1].className)
            //console.log(_x.f[i].innerHTML, follow)
            _x.followers.push({
                follower: _x.f[i].innerHTML,
                isFollowedBack: follow
            });
        }
    }
}

function updateFollowing() {
    _x.f = document.getElementsByClassName(selectors.unameElement);
    //_x.isFamous = document.getElementsByClassName(selectors.unameElement)
    for (let i = 0; i < _x.f.length; i++) {
        if (_x.f[i] != undefined) {
            const verified = isVerified(_x.f[i].nextSibling)
            //console.log(_x.f[i].innerHTML, verified)
            _x.following.push({
                follower: _x.f[i].innerHTML,
                //Convinent for clean data
                isOrdinary: !verified
            });
        }
    }
}

const isVerified = html => {
    if(!html){
        return false
    }
    return true
}

const findUnfollower = () => {
    const followers = _x.followers
    const following = _x.following
}
