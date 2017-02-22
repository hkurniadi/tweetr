/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
   // Test / driver code (temporary). Eventually will get this from the server.
   var tweetData = {
     "user": {
       "name": "Newton",
       "avatars": {
         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
       },
       "handle": "@SirIsaac"
     },
     "content": {
       "text": "If I have seen further it is by standing on the shoulders of giants"
     },
     "created_at": 1461116232227
   }

  function createTweetElement(obj) {
    let $tweet = $('<article>').addClass('tweet');

    //Children of <article>:
    //Header and its children
    let $header = $('<header>').addClass('tweet-header');
    let $header_h1 = $('<h1>').text(obj['user']['name']);
    let $header_p = $('<p>').text(obj['user']['handle']);
    //$header_avatar
    $($header).append($header_h1, $header_p);
    $($tweet).append($header);

    //Section and its children
    let $section = $('<section>').addClass('tweet-content');
    let $section_p = $('<p>').text(obj['content']['text']);
    $($section).append($section_p);
    $($tweet).append($section);

    //Footer and its children
    let $footer = $('<footer>').addClass('tweet-footer');
    let createdAt = new Date(obj['created_at']);
    let $footer_p = $('<p>').text(createdAt.getDay() + " days ago");
    let $footer_i1 = $('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true');
    let $footer_i2 = $('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true');
    let $footer_i3 = $('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true');
    $($footer).append($footer_p, $footer_i1, $footer_i1, $footer_i2, $footer_i3);
    $($tweet).append($footer);

    return $tweet;
  }

  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
