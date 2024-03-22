let nextPageUrl = '';
let startElement = 0;
let iconName = '';
let pageCounter = 1;
let pageNumber = 3;
let corsProxy = 'https://corsproxy.io/?';
let sitesArray = [];

let site1 = {
  name: 'uxwing',
  urlStart: 'https://uxwing.com/?s=',
  urlEnd: '',
  slugCreator: function(string){
    return string.replace(' ', '+');
  },
  getIcons: function(searchUrl, target){
    return $.ajax({
      url: searchUrl,
      crossDomain: true,
      success: function (data) {
        if ($(data).find('a.next.page-numbers').length > 0) {
          nextPageUrl = $(data).find('a.next.page-numbers').attr('href');
          console.log(nextPageUrl);
        } else {
          nextPageUrl = '';
        }
        let html = $(data).find('.detailleft');
        html.find('article.post').each(function() {
          let iconLink = $(this).find('a.entry-summary').attr('href');
          let iconImg = $(this).find('img').attr('src');

          $('#tab-'+target).append('<a class="icon-wrap" href="'+iconLink+'" target="_blank" rel="nofollow"><img width="80" src="'+iconImg+'"></a>');
        });

        return nextPageUrl;
      },
      error: function (e) {
        console.log(e);
      },
      timeout: 10000,
    });
  }
}

let site2 = {
  name: 'veryicon',
  urlStart: 'https://www.veryicon.com/search/',
  urlEnd: '',
  slugCreator: function(string){
    return string.replace(' ', ' ');
  },
  getIcons: function(searchUrl, target){
    return $.ajax({
      url: searchUrl,
      crossDomain: true,
      success: function (data) {
        if ($(data).find('a.pager-next').length > 0) {
          nextPageUrl = 'https://www.veryicon.com' + $(data).find('a.pager-next').attr('href');
        } else {
          nextPageUrl = '';
        }
        let html = $(data).find('#sider-left');
        html.find('.icon-item').each(function() {
          let iconLink = $(this).find('a').attr('href');
          let iconImg = $(this).find('img').attr('src');

          $('#tab-'+target).append('<a class="icon-wrap" href="https://www.veryicon.com'+iconLink+'" target="_blank" rel="nofollow"><img width="80" src="'+iconImg+'"></a>');
        });

        return nextPageUrl;
      },
      error: function (e) {
        console.log(e);
      },
      timeout: 10000,
    });
  }
}

let site3 = {
  name: 'svgrepo',
  urlStart: 'https://www.svgrepo.com/vectors/',
  urlEnd: '/',
  slugCreator: function(string){
    return string.replace(' ', ' ');
  },
  getIcons: function(searchUrl, target){
    return $.ajax({
      url: searchUrl,
      crossDomain: true,
      success: function (data) {
        if ($(data).find('a[title="Next Page"]').length > 0) {
          nextPageUrl = 'https://www.svgrepo.com' + $(data).find('a[title="Next Page"]').attr('href');
        } else {
          nextPageUrl = '';
        }
        let html = $(data).find('.subtext + div + div + div');
        html.find('> div').each(function() {
          let iconLink = $(this).find('a').attr('href');
          let iconImg = $(this).find('img').attr('src');

          $('#tab-'+target).append('<a class="icon-wrap" href="https://www.svgrepo.com'+iconLink+'" target="_blank" rel="nofollow"><img width="80" src="'+iconImg+'"></a>');
        });

        return nextPageUrl;
      },
      error: function (e) {
        console.log(e);
      },
      timeout: 10000,
    });
  }
}

/*let site4 = {
  name: 'iconsdb',
  urlStart: 'https://www.iconsdb.com/black-icons/black-',
  urlEnd: '-icons.html',
  noProxy: true,
  slugCreator: function(string){
    return string.replace(' ', '-');
  },
  getIcons: function(searchUrl, target){
    return $.ajax({
      url: searchUrl,
      crossDomain: true,
      success: function (data) {
        if ($(data).find('a[rel="next"]').length > 0) {
          nextPageUrl = 'https://www.iconsdb.com' + $(data).find('a[rel="next"]').attr('href');
        } else {
          nextPageUrl = '';
        }
        let html = $(data).find('.pagewrap');
        html.find('.icon-info').each(function() {
          let iconLink = $(this).find('a').attr('href');
          let iconImg = $(this).find('img').attr('src');

          $('#tab-'+target).append('<a class="icon-wrap" href="https://www.iconsdb.com'+iconLink+'" target="_blank" rel="nofollow"><img width="80" src="https://www.iconsdb.com'+iconImg+'"></a>');
        });

        return nextPageUrl;
      },
      error: function (e) {
        console.log(e);
      },
      timeout: 10000,
    });
  }
}*/

let site5 = {
  name: 'reshot',
  urlStart: 'https://www.reshot.com/free-svg-icons/',
  urlEnd: '/',
  slugCreator: function(string){
    return string.replace(' ', '-');
  },
  getIcons: function(searchUrl, target){
    return $.ajax({
      url: searchUrl,
      crossDomain: true,
      success: function(data) {
        if ($(data).find('a.pagination__link--next').length > 0) {
          nextPageUrl = 'https://www.reshot.com' + $(data).find('a.pagination__link--next').attr('href');
        } else {
          nextPageUrl = '';
        }

        let html = $(data).find('.item-grid-square');
        html.find('.icons-card').each(function() {
          console.log('in icons-card');
          let iconLink = $(this).find('a.icons-card__link').attr('href');
          let iconImg = $(this).find('.icons-card__image').attr('style');
          iconImg = iconImg.replace('--image: url(', '');
          iconImg = iconImg.replace(')', '');
          $('#tab-'+target).append('<a class="icon-wrap" href="https://www.reshot.com'+iconLink+'" target="_blank" rel="nofollow"><img width="80" src="'+iconImg+'"></a>');
        });

        return nextPageUrl;
      },
      error: function (e) {
        console.log(e);
      },
      timeout: 10000,
    });
  }
}

let sitesObject = {
  uxwing: site1,
  veryicon: site2,
  svgrepo: site3,
  //iconsdb: site4
  reshot: site5
};

$(document).ready(function() {
  for (const [key, value] of Object.entries(sitesObject)) {
    $('#settings').append('<div class="checkbox-wrap"><input type="checkbox" id="'+key+'" name="'+key+'" value="'+key+'" checked><label for="'+key+'">'+key+'</label></div>');
  }


  $('#result-btn').click(function() {
    startSearching();
  })

  let searchInput = document.getElementById('search');
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      startSearching();
    }
  });

  $('.result-wrap').on('click', '.tab', function(){
    $('.tab, .icons-inner-wrap').removeClass('active');
    $(this).addClass('active');
    let tabId = $(this).attr('data-id');
    $('#tab-'+tabId).addClass('active');
  })
});

function startSearching() {
  sitesArray = [];
  $('#control-tabs').html('');
  $('#icons-wrap').html('');
  iconName = String($('.icon-name').val());

  if($('#search-number').val()) {
    pageNumber = Number($('#search-number').val());
  }

  $('.checkbox-wrap input:checked').each(function() {
    let checkboxValue = $(this).val();
    let correspondingVariable = sitesObject[checkboxValue];
    if (correspondingVariable !== undefined) {
      sitesArray.push(correspondingVariable);
    }
  });

  if (sitesArray.length > 0) {
    processItem(sitesArray, startElement, iconName);
  }
}

function processItem(array, number, string){
  if(!array[number]) return;
  let addClass = '';

  if(number==0) {
    addClass = 'active';
  } else {
    addClass = '';
  }

  if (array[number].noProxy) {
    corsProxy = '';
  }

  $('#control-tabs').append('<div class="tab '+addClass+'" data-id="'+array[number].name+'">'+array[number].name+'</div>');
  $('#icons-wrap').append('<div id="tab-'+array[number].name+'" class="icons-inner-wrap '+addClass+'"></div>');

  nextPageUrl = '';
  let slug = array[number].slugCreator(string);
  let searchUrl = corsProxy + array[number].urlStart + slug + array[number].urlEnd;

  ajaxDone(array, number, string, array[number], searchUrl, array[number].name);
}

function myAjax(object, url, target) {
  console.log(object);
  return object.getIcons(url, target);
}

function ajaxDone(array, number, string, element, url, target) {
  $.when(myAjax(element, url, target)).done(function(){
    console.log(nextPageUrl);

    if(nextPageUrl && pageCounter < pageNumber) {
      let newNextPageUrl = corsProxy + nextPageUrl;
      pageCounter++;
      ajaxDone(array, number, string, element, newNextPageUrl, target);
    } else {
      number++;
      pageCounter = 1;
      console.log(array, number, string);
      processItem(array, number, string);
    }
  });
}
