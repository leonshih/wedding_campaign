$(function(){
	check_state();	
});

function check_state(){
	var params = {},
		queryString = location.search.replace('?',''),
		regex = /([^&=]+)=([^&]*)/g, 
		m;
	while(m = regex.exec(queryString)){
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}
	if(params['code'] == null)
		window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=04267db24e594d788cb8b54c4c3cc388&redirect_uri=http://leonshih.github.io/wedding_campaign/&response_type=code';
	
}