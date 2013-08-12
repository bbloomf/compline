$(function(){
  var ant = "<div class='jgabc' src='psalms/{day}/ant.gabc'></div>";
  var psalm = "<div class='jgabc' src='psalms/{day}/psalm.gabc'></div>"
  var date = new Date();
  var day = date.getDay();
  var dayName;
  switch(day){
    case 0:
      dayName = 'Sunday';
      break;
    case 1:
      dayName = 'Monday';
      break;
    case 2:
      dayName = 'Tuesday';
      break;
    case 3:
      dayName = 'Wednesday';
      break;
    case 4:
      dayName = 'Thursday';
      break;
    case 5:
      dayName = 'Friday';
      break;
    case 6:
      dayName = 'Saturday';
      break;
  }
  $('#weekday').text(dayName);
  $.get('psalms/'+day+'/psalm-verses.html',function(data){
    var html = ant + psalm + data + ant;
    html = html.replace(/{day}/g,day);
    $('#placeholder').replaceWith(html);
    updateGabc();
  });
  $('#in-manus-tuas-choices input,#te-lucis-choices input,#marian-antiphon-choices input').change(function(){
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