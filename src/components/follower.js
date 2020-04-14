/*
1:
Install node: http://nodejs.org/download/
2:
Get an access token from Instagram for the user: https://instagram.com/developer/authentication/
3:
Open terminal, cd into the directory where followers.js is.
eg:
cd Desktop/
4:
Run the followers js with node: node followers.js <<access token>>
eg:
node followers.js <<access token>>
5:
Wait. Eventually you'll have followers numbers. Or lots of errors :-(
 */

var version = "0.0.11";
var fs = require('fs');
var https = require('https');
var ig_access_token = "IGQVJVN29mQTRwVmt2a0d1Ni1xd2JIUmZAYSElUTGZAzYngzQmgwYWRsZAUZAJS1JZARVVoaVNQUkdDN0U4cHBfeF9SeGJZATmpSb181NHdlRld2RGlXLUFXYjBLd3pWbl9WZAm40bVAxRFY0cHFta0x1cG02eQZDZD";
var ig_user = {}; ig_user.followers = [];
var ig_api_url = 'https://api.instagram.com/v1';
//https://api.instagram.com/oauth/authorize/?client_id=1533933806761524&redirect_uri=https://api.instagram.com/v1&response_type=code
var csv_content = "num,username,fullname,id,bio,website,follows,followed by\n";
var ig_request_delay = 1000;
var followers_total = 0;
var followers_iteration = 0;
var errored_on_iterations = [];

console.log("FOLLOWERS.JS v."+version);
console.log("##################################\n##################################");

function build_url(path){
  return ig_api_url+path+'?access_token='+ig_access_token;
}

function do_ig_request(url,callback) {
  https.get(url, function(res) {
    var body = "";
    res.on('data', function(d) {
      body += d;
    });
    res.on('end', function(){
      //http://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try#answer-20392392
      try {
        callback(JSON.parse(body));
      } catch(err) {
        console.log(body)
        console.log(ig_access_token)
        console.log("############################## Error: Invalid JSON - "+err);
        console.log("############################## trying again in 60s "+url);
        setTimeout(function(){
          do_ig_request(url,callback);
        },60000);
      }
    });
  }).on('socket',function(socket){
    socket.setTimeout(3000);
    socket.on('timeout',function(){
      console.log("##################################### Timeout: trying again in 60s "+url);
      setTimeout(function(){
        do_ig_request(url,callback);
      },60000);
    });
  }).on('error', function(e) {
    console.error(e);
    callback("error");
  });
}

function basic_user_data(data) {
  if (data == "error") {
    console.log("############################## Error: Can't get this users basic user data");
  } else {
    ig_user.username = data.data.username;
    ig_user.id = data.data.id*1;
    ig_user.full_name = data.data.full_name;
    ig_user.counts = data.data.counts;
    console.log(ig_user.username + ' (id: '+ig_user.id+')');
    console.log("Getting followers. This may take some time...");
    var url = build_url('/users/'+ig_user.id+'/followed-by');
    do_ig_request(url,this_user_followers);
  }
}

function this_user_followers(data) {
  if (data == "error") {
    console.log("############################## Error: Can't get this users followers");
  } else {
    ig_user.followers = ig_user.followers.concat(data.data);
    console.log("Pulled "+ig_user.followers.length+" follwers");
    if (data.pagination != undefined && data.pagination.next_url != undefined && data.pagination.next_url.length > 0) {
      setTimeout(function(){
        do_ig_request(data.pagination.next_url,this_user_followers);
      },ig_request_delay);
    } else {
      console.log("Getting your followers followers. This will take LOTS more time...");
      console.log("##################################\n##################################");
      followers_total = ig_user.followers.length;
      setTimeout(grab_follower_counts,ig_request_delay);
    }
  }
}

function grab_follower_counts(){
  var url = build_url('/users/'+ig_user.followers[followers_iteration].id+"/");
  do_ig_request(url,parse_follower_basic_data);
}

function parse_follower_basic_data(data) {
  if (data == "error") {
    console.log("############################## Error: Can't "+ig_user.followers[followers_iteration].username+"'s followers");
    errored_on_iterations.push(followers_iteration);
  } else {
    if (data.meta.code == 200) {
      console.log(followers_iteration+' '+ig_user.followers[followers_iteration].username+' ('+ig_user.followers[followers_iteration].full_name+') follows '+data.data.counts.follows+' and is followed by '+data.data.counts.followed_by);
      ig_user.followers[followers_iteration].bio = data.data.bio.replace(/(\r\n|\n|\r|"|')/g,"");
      ig_user.followers[followers_iteration].website = data.data.website;
      ig_user.followers[followers_iteration].follows = data.data.counts.follows;
      ig_user.followers[followers_iteration].followed_by = data.data.counts.followed_by;
    } else {
      console.log(followers_iteration+' '+ig_user.followers[followers_iteration].username+' ('+ig_user.followers[followers_iteration].full_name+') is either private or invalid');
      ig_user.followers[followers_iteration].bio = "## Private or invalid Profile ##";
      ig_user.followers[followers_iteration].website = "-";
      ig_user.followers[followers_iteration].follows = "-";
      ig_user.followers[followers_iteration].followed_by = "-";
    }
  }
  // and carry on
  followers_iteration++;
  if (followers_iteration < followers_total) {
    setTimeout(grab_follower_counts,ig_request_delay);
  } else {
    console.log("##################################\n##################################");
    if (errored_on_iterations.length > 0) {
      console.log("Errored on the following interations:");
      console.log(errored_on_iterations.join(","));
      console.log("##################################\n##################################");
      console.log("Write CSV.");
    } else {
      console.log("All followers recieved. Write CSV.");
    }
    write_csv();
  }
}

function write_csv() {
  ig_user.followers.forEach(function(item, i){
    csv_content += '"'+i+'",';
    csv_content += '"'+item.username+'",';
    csv_content += '"'+item.full_name+'",';
    csv_content += '"'+item.id+'",';
    csv_content += '"'+item.bio+'",';
    csv_content += '"'+item.website+'",';
    csv_content += '"'+item.follows+'",';
    csv_content += '"'+item.followed_by+'"';
    csv_content += '\n';
  });
  var filepath = process.argv[1].replace(".js",".csv");
  fs.writeFile(filepath, csv_content, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}

// GO GO GO
if (ig_access_token.length > 0) {
  do_ig_request(build_url('/users/self'),basic_user_data);
} else {
  console.log("no ig_access_token");
}
