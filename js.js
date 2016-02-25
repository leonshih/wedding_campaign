//mine
//var access_token = "37246735.04267db.6592b801aa5f4ebf91af1e9a0dfe3f3b",
//other
//var access_token = "2274610174.1fb234f.5f6eb6bc393c4888a2e1a045490784d9",
var access_token = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587",

    access_parameters = {
        access_token: access_token
    };

$(function() {
    //grabImages('puppy', 35, access_parameters);

    // Get an instance of a fetcher
    var fetcher = new Instafetch('81e3d3f35c8a4438964001decaa5a31f');

    // Fetch results
    fetcher.fetch({
        //user: '', // This is the ID for 9gag, you can get the ID from username using http://jelled.com/instagram/lookup-user-id
        tag: 'puppy',
        limit: 50,
        callback: onDataLoaded, // You can customize your own functionality by building from the logResults method
        params: 'yiyi & leon'
    });
});


function grabImages(tag, count, access_parameters) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count=' + count;
    $.getJSON(instagramUrl, access_parameters, onDataLoaded);
}

var bgPhotos;
var bgCount = 0;
var bgMaxCount;
var photoArr;
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
	bgPhotos = $('.bg-photo');
	bgMaxCount = bgPhotos.length;
	var bgTimer = setInterval(bgInterval, 3500);
}

function bgInterval(){
	var stPhoto = $('.standardPhoto');
	
	if(bgCount == bgMaxCount)
	{
		$(bgPhotos[bgCount]).fadeTo(500, 0);
		bgCount = 0;
		$(bgPhotos[bgCount]).fadeTo(500, 1);
	}
	else
	{
		$(bgPhotos[bgCount-1]).fadeTo(500, 0.2);
		$(bgPhotos[bgCount]).fadeTo(500, 1);
	}
	
	stPhoto[0].src = photoArr[bgCount].images.standard_resolution.url;
	stPhoto.fadeTo(500, 0.2, function(){
		stPhoto.fadeTo(500, 1);
	});
	bgCount++;
	
}




