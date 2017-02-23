$(document).ready(function() {
  $('.new-tweet').find('form').on('submit', function(event) {
    event.preventDefault();
    const $textarea = $(this).find('textarea');
    const formData = $($textarea).serialize();
    const MAX_CHARS = 140;
    let tweetLength = $($textarea).val().length;
    let charRemaining = MAX_CHARS - tweetLength;
    if (!$($textarea).val()) {
      alert('Your tweet is empty, please write something');
    } else if (charRemaining < 0) {
      alert('Your tweet is too long');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: formData,
        success: function() {
          loadTweets();
        }
      });
    }
  });
});
