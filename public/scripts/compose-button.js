$(document).ready(function() {
  $('#nav-bar .compose-button').on('click', function() {
    $('.container .new-tweet').slideToggle(300, () => {$('textarea').focus()});
  })
});
