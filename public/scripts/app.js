/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function createTweetElement(obj) {
    //Create <article> element:
    let $tweet = $('<article>').addClass('tweet');

    //Create <header> element and its child elements
    let $header = $('<header>').addClass('tweet-header');
    let $header_avatar = $('<img>').attr('src', obj['user']['avatars']['small'])
    let $header_h1 = $('<h1>').text(obj['user']['name']);
    let $header_p = $('<p>').text(obj['user']['handle']);
    $($header).append($header_avatar, $header_h1, $header_p);
    $($tweet).append($header);

    //Create <section> element and its child elements
    let $section = $('<section>').addClass('tweet-content');
    let $section_p = $('<p>').text(obj['content']['text']);
    $($section).append($section_p);
    $($tweet).append($section);

    //Create <footer> element and its chil elements
    let $footer = $('<footer>').addClass('tweet-footer');
    let createdAt = obj['created_at'];
    let currentDate = Date.now();
    let timeSinceLastCreated = Math.round((currentDate - createdAt)/86400000);
    let $footer_p = $('<p>').text(timeSinceLastCreated + " days ago");
    let $footer_span = $('<span>').addClass('hidden-buttons');
    let $footer_i1 = $('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true');
    let $footer_i2 = $('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true');
    let $footer_i3 = $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true');
    $($footer_span).append($footer_i1, $footer_i2, $footer_i3);
    $($footer).append($footer_p, $footer_span);
    $($tweet).append($footer);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  }

  function postTweet() {
    $('.new-tweet').find('form').on('submit', function(event) {
      event.preventDefault();
      const $textarea = $(this).find('textarea');
      const $counter = $('.counter');
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
            $($textarea).val("");
            charRemaining = MAX_CHARS;
            $($counter).text(charRemaining);
            $('#tweets-container').empty();
            loadTweets();
          }
        });
      }
    });
  }

  loadTweets();
  postTweet();
});
