//mine
//var access_token = "37246735.04267db.6592b801aa5f4ebf91af1e9a0dfe3f3b",
//other
var access_token = "2274610174.1fb234f.5f6eb6bc393c4888a2e1a045490784d9",
//var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",
//client_id = '04267db24e594d788cb8b54c4c3cc388', //mine
client_id = '81e3d3f35c8a4438964001decaa5a31f',

    access_parameters = {
        access_token: access_token
    };

$(function() {
    callAPI();
});

function callAPI(){
	// Get an instance of a fetcher
    var fetcher = new Instafetch(client_id);

    // Fetch results
    fetcher.fetch({
        //user: '37246735', // This is the ID for 9gag, you can get the ID from username using http://jelled.com/instagram/lookup-user-id
        tag: 'ibanez',
        limit: 100,
        callback: onDataLoaded, // You can customize your own functionality by building from the logResults method
        params: 'yiyi & leon'
    });
}

function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}

var bgPhotos;
var bgCount;
var bgMaxCount;
var photoArr;
var bgTimer;
var intervalTime;  //重複幾次後callAPI, 避免送出給instagram API的次數大於上限5000次
function onDataLoaded(instagram_data) {
    console.log(instagram_data);
    var target = $("#target");

    var photos = instagram_data.data;
    //console.log(photos);
    if (photos.length > 0) {
        target.empty();
        for (var key in photos) {
            var photo = photos[key];
            target.append('<img class="bg-photo" src="' + photo.images.thumbnail.url + '">')
        }
    } else {
        target.html("nothing found");
    }
	photoArr = photos;
	bgCount = intervalTime = 0;
	bgPhotos = $('.bg-photo');
	bgMaxCount = bgPhotos.length;
	bgTimer = setInterval(bgInterval, 3500);
}

var fadeTime = 800;
function bgInterval(){
	
	$(bgPhotos[bgCount-1]).fadeTo(fadeTime, 0.2);
	
	$('.main_area').fadeTo(fadeTime, 0, function(){
		$('.main_area').fadeTo(fadeTime, 1);
		$(bgPhotos[bgCount]).fadeTo(fadeTime, 1);
		$('.standardPhoto')[0].src = photoArr[bgCount].images.standard_resolution.url;
		$('.user_pic')[0].src = photoArr[bgCount].user.profile_picture;
		$('.username').html(photoArr[bgCount].user.username);
		bgCount++;
		if(bgCount == bgMaxCount)
		{
			intervalTime++;
			console.log('interval time: ' + intervalTime);
			if(intervalTime >= 20) //設定要輪播幾次後再去讀API
			{
				clearInterval(bgTimer);
				callAPI();
			}
			else
				bgCount = 0;
		}
	});
}




