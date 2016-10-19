$(document).ready(function() {

 var tags_fns = new Bloodhound({
    datumTokenizer: function(d) {
      var test = Bloodhound.tokenizers.whitespace(d);
          $.each(test,function(k,v){
              var i = 0;
              while( (i+1) < v.length ){
                  test.push(v.substr(i,v.length));
                  i++;
              }
          })
          return test;
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: {
          url:'data/en/index.json',
          ttl: 86400000*7,
          cache: true,
          transform: function(d){return d.tags.concat(d.functions, d.categories);}
        }
  });
  $('#lookup-box').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
  },
  {
  		name: 'tags-fns',
  		source: tags_fns,
      limit: 10
  });
  $('.tt-hint').addClass('form-control');
  $('#search').submit(submitSearch);
  $('#lookup-box').on('typeahead:selected', submitSearch);
  $('#lookup-box').focus();

  $('.example-btn').click(function() {
      var name = $(this).attr('data-name');
      var index = $(this).attr('data-index');
      $('#example-modal-content').html('<iframe width="100%" height="450" border="0" src="/try/' + name + '/' + index + '">');
      $('.example-modal').modal();
      if (document.location.protocol == "https:") {
        alert("FYI Running Examples over HTTPS may not work on some browsers because trycf.com does not also run over HTTPS. Browsers with strong mixed content controls will block the cross domain execution.")
      }
  });

  if ($('.prettyprint').length != 0 && typeof(prettyPrint) == "function") {
      prettyPrint();
  }

});
//search submit
function submitSearch() {
  document.location = '/' + $('#lookup-box').val().toLowerCase();
  return false;
}
//google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-82573-18']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
