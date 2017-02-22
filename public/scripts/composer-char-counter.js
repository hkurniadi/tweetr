$(document).ready(function() {
  const MAX_CHARS = 140;
  let $counter = $('.counter');
  $counter.text(MAX_CHARS);
  $('.new-tweet textarea').on('input', function() {
    let tweetLength = $(this).val().length;
    let charRemaining = MAX_CHARS - tweetLength;
    $counter.css('color', charRemaining >= 0 ? '' : 'red').text(charRemaining);
  });
});
