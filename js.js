//mine
//var access_token = "37246735.04267db.6592b801aa5f4ebf91af1e9a0dfe3f3b",
	//other
	//var access_token = "2274610174.1fb234f.5f6eb6bc393c4888a2e1a045490784d9",
	var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",
	client_id = '04267db24e594d788cb8b54c4c3cc388', //mine
	//client_id = '81e3d3f35c8a4438964001decaa5a31f',

	tag = 'gibson',
	limit = 80,
	apiUrl = '',
	filteredArr = [],
	tmpArr = [],
	max_id = '';	

$(function() {
    callAPI();
	$('.lottery').click(function(){
		goLottery();
	});
});
	
function callAPI(){
	apiUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=33&access_token=' + access_token;
	filteredArr = [];
	if(max_id != '')
		apiUrl += '&max_id=' + max_id;
	max_id = '';
	
	if (tmpArr.length > 0)
		filteredArr = tmpArr;
	tmpArr = [];
	
	$.ajax({
		url: apiUrl,
		jsonp: 'callback',
		dataType: 'jsonp',
		data: {format: 'json'},
		success: function(response){
			console.log(response);
			filteredArr = filteredArr.concat(response.data);
			if((~~filteredArr.length) >= limit || typeof response.pagination.next_max_id === 'undefined'){
				var returnObj = {};
				returnObj.data = [];
				
				for (var j = 0; j < Math.min(filteredArr.length, limit); j++){
					returnObj.data.push(filteredArr[j]);
				}
				console.log(returnObj);
				onDataLoaded(returnObj);
			}
			else{
				max_id = response.pagination.next_max_id;
				tmpArr = filteredArr;
				callAPI();
			}			
		}
	});
}

var ltTimer;
var ltMs = 10;
function goLottery(){
	clearInterval(bgTimer);
	bgCount = 0;
	bgPhotos = $('.bg-photo');
	bgPhotos.css('opacity', '');
	bgMaxCount = bgPhotos.length;
	ltTimer = setInterval(ltInterval, ltMs);
}

var ltFadeTime = 200;
function ltInterval(){
	bgCount = Math.floor(Math.random()*(bgMaxCount));
	bgPhotos.removeClass('active');	
	
	$(bgPhotos[bgCount]).addClass('active');
	$('.standardPhoto')[0].src = photoArr[bgCount].images.standard_resolution.url;
	$('.user_pic')[0].src = photoArr[bgCount].user.profile_picture;
	$('.username').html(photoArr[bgCount].user.username);
	bgCount++;
	if(bgCount == bgMaxCount)
	{
		intervalTime++;
		console.log('interval time: ' + intervalTime);
		bgCount = 0;
	}
	clearInterval(ltTimer);
	ltMs *= 1.1;
	console.log(ltMs);
	ltTimer = setInterval(ltInterval, ltMs);
	if(ltMs >= 600)
	{
		var winner = {
			name: $('.bg-photo.active').data('user_name')
		}
		console.log(winner.name);
		setTimeout(function(){
			$('.winner_text').text('恭喜 ' + winner.name + ' !').addClass('active');
		}, 1000);
		clearInterval(ltTimer);
	}
	
}

var bgPhotos,
    bgCount,
    bgMaxCount,
    photoArr,
    bgTimer,
    intervalTime;  //重複幾次後callAPI, 避免送出給instagram API的次數大於上限5000次
function onDataLoaded(instagram_data) {
    console.log(instagram_data);
    var target = $("#target");

    var photos = instagram_data.data;
    //console.log(photos);
    if (photos.length > 0) {
        target.empty();
        for (var key in photos) {
            var photo = photos[key];
            target.append('<img class="bg-photo" src="' + photo.images.thumbnail.url + 
				'" data-user_name="' + photo.user.full_name + '(' + photo.user.username + ')">')
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




