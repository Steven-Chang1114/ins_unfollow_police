const selectors = {
    modalTrigger: 'Y8-fY',
    unameElement: 'FPmhX',
    userLi: 'NroHT',
    closeBtn: 'pxaFn',
    flwTitle: 'm82CD',
    objDiv: "j6cq2"
}

const _x = {};

_x.followers = Array();
_x.following = Array();
_x.followers_elm = document.getElementsByClassName(selectors.modalTrigger)[1];
_x.following_elm = document.getElementsByClassName(selectors.modalTrigger)[2];

//Following
const maxLenIng = _x.following_elm.getElementsByTagName('span')[0].innerHTML;
//Follower
const maxLenEr = _x.followers_elm.getElementsByTagName('span')[0].innerHTML;

const areYouFollowed = className => {
    if(className.includes('y3zKF')){
        return false
    }
    return true
}

function updateFollowers() {
    _x.f = document.getElementsByClassName(selectors.unameElement);
    //y3zKF is you did not follow, _8A5w5 is you followed
    _x.zz = document.getElementsByClassName("sqdOP L3NKy");
    for (let i = 0; i < _x.f.length; i++) {
        if (_x.f[i] != undefined && _x.zz[i] != undefined) {
            const follow = areYouFollowed(_x.zz[i+1].className)
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

    for (i = 0; i < _x.f.length; i++) {
        if (_x.f[i] != undefined) {
            _x.following.push(_x.f[i].innerHTML);
        }
    }

    // for pushing up unfollowers
    _x.notFollowBack = Array();

    for (i = 0; i < _x.following.length; i++) {
        if (!_x.followers.includes(_x.following[i])) {
            _x.notFollowBack.push(_x.following[i]);
        }
    }
