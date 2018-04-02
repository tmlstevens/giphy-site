$(document).ready(function() {
    makeButtons()
});

var topics = ['fishing','bass','trout','boating','wakeboarding','waterskiing'];

function makeButtons() {
    $("#buttonsDiv").empty();
    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];
        var topicBtn = $('<button>');
        topicBtn.attr('data-topic',topic).text(topic);
        $('#buttonsDiv').append(topicBtn);
    };
    console.log(topics);
};
// makeButtons();

$('button').on('click', function() {
    var searchQ = $(this).data('topic');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + searchQ + '&rating=pg&limit=10&api_key=1pP6CGYZssg1dJV3ftVQYFVCi9KRtdaB';
    $.ajax({url:queryURL,method:'GET'})
    .done(function(response){
        for (var j = 0; j < response.data.length; j++) {
            var imagesDivDiv = $('<div>').attr('class','imagesDivDiv');
            var image = $('<img>');
            image.attr('src',response.data[j].images.fixed_width_still.url);
            image.attr('data-still',response.data[j].images.fixed_width_still.url);
            image.attr('data-animate',response.data[j].images.fixed_width.url);
            image.attr('data-state','still');
            imagesDivDiv.attr('width',response.data[j].images.fixed_width.width + 'px');
            $('#imagesDiv').prepend(imagesDivDiv);
            imagesDivDiv.append(image);
            var imageRating = $('<p>').text('Rating: ' + response.data[j].rating);
            imagesDivDiv.append(imageRating);
        }
    })
});
$('#imagesDiv').on('click','img','attr',function () {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});
$('#add-gif').on('click', function() {
    event.preventDefault();
    var gif = $('#gif-input').val().trim();
    console.log(gif);
    topics.push(gif);
    makeButtons();
  });
