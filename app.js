
$('.popup').hide()
$('.overlayBg').hide()

$('#submit').click(function(e){
	e.preventDefault();
	omdbRequest();
});

function omdbRequest(){
	$('#submit').click(function(){
		$.getJSON('https://www.omdbapi.com/?t='+$('#search').val()+'&y='+$('#year').val()+'&plot=full&apikey=eefeda9a',function(data){
			omdbResults(data);
			searchYoutube();
		})
	})

}

function omdbResults(data){
	$('#output').html(`
		<div class="col-4">
			<h2>${data.Title}</h2>
			<img src="${data.Poster}">
			<p><strong>Plot</strong>: ${data.Plot}</p>
		</div>
		<div class="col-4">
			<p>${data.Ratings[0].Source}:<span>${data.Ratings[0].Value}</span></p>
			<p>${data.Ratings[1].Source}<span>${data.Ratings[1].Value}</span></p>
			<p>${data.Ratings[2].Source}<span>${data.Ratings[2].Value}</span></p>
		</div>
		<div class="col-4">
			<p>Release Date: ${data.Released}</p>
			<p>Runtime: ${data.Runtime}</p>
			<p>Director: ${data.Director}</p>
			<p>Actors: ${data.Actors}</p>
			<p>Awards: ${data.Awards}</p>
		</div>`)

}

var pageToken = {};

$('.overlayBg').click(function () {
    $('.popup').hide()
    $('.overlayBg').hide()
})
$('#videoResults').on('click', '.thumbnail', function () {
    $('.popup').show()
    $('.overlayBg').show();
    $(window).scrollTop(0)
    $('.popup iframe').attr('src', 'https://www.youtube.com/embed/' + $(this).attr('videoID'));
})

function searchYoutube() {
	let query = $('#search').val()+' '+'the movie';
	$.ajax({
	    url: 'https://www.googleapis.com/youtube/v3/search'
	    , dataType: 'json'
	    , type: 'GET'
	    , data: {
	        key: 'AIzaSyA9YIeJMUAUAO5QaCo0wzfbdGlLIbjo1D4'
	        , q: query
	        , part: 'snippet'
	        , maxResults: 6
	        , pageToken: pageToken.current
	    }
	}).done(function youtubeOutput (data) {
	    pageToken.nextPage = data.nextPageToken;
	    pageToken.prevPage = data.prevPageToken;
	    var html = "";
	    $.each(data['items'], function (index, value) {
	        html += '<div class="col-4"><p class="title">' + value.snippet.title + '</p>';
	        html += '<p class="url"><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">' + value.id.videoId + '</a></p>';
	        html += '<p><img  class="thumbnail" src="' + value.snippet.thumbnails.medium.url + '" videoID="' + value.id.videoId + '"></p>';
	        html += '</div>';
	    })
	    $('#videoResults').html(html);
	})
}	



