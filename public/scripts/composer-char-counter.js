$(document).ready(function() {
  //console.log("Document is ready");
  let maxChars = $('.counter').text();
  $('.new-tweet textarea').on('keyup', function() {
    //console.log("Event is handled");
    let tweetLength = $('.new-tweet textarea').val().length;
    let charRemaining = +maxChars - tweetLength;
    $('.counter').text(charRemaining);
    //console.log(charCounter);
  });
});
