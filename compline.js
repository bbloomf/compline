$(function(){
  $.QueryString = (function (a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i) {
          var p = a[i].split('=');
          if (p.length != 2) continue;
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      if (b.successMsg) showAlert(false, b.successMsg);
      if (b.failMsg) showAlert(true, b.failMsg);
      return b;
  })(window.location.search.substr(1).split('&'));
  var ant = "<div class='jgabc' src='psalms/{day}/ant.gabc'></div>";
  var psalm = "<div class='jgabc' src='psalms/{day}/psalm.gabc'></div>"
  var date = new Date();
  var day = date.getDay();
  var dayName;
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  if($.QueryString.day) {
    var test = $.QueryString.day;
    if(test in days) {
      day = test;
    } else {
      test = days.indexOf(test);
      if(test in days) {
        day = test;
      }
    }
  }
  dayName = days[day];
  $('#weekday').text(dayName);
  $.get('psalms/'+day+'/psalm-verses.html',function(data){
    var html = ant + psalm + data + ant;
    html = html.replace(/{day}/g,day);
    $('#placeholder').replaceWith(html);
    updateGabc();
  });
  $('#in-manus-tuas-choices input,#te-lucis-choices input,#marian-antiphon-choices input,#confiteor-choices input').change(function(){
    var chant = this.name;
    var src = chant + '/' + this.value + '.gabc';
    console.info(src);
    $('#'+chant).attr('src',src);
    $.get(src,function(data){
      $('#'+chant).text(data);
      var old=$('#'+chant).next(".jgabc-svg").find("svg")[0];
      if(!old) console.warn('Couldn\'t find svg to update.');
      else updateChant(data,old,true);
    });
    $('div.' + chant).hide();
    $('div.' + chant + '.' + this.value).show();
  });
});