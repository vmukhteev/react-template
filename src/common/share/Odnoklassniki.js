/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Odnoklassniki (https://ok.ru) provider.
 */

export default class {
  constructor({
    url = document.location.href,
    title = document.title
  }) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
  }
  
  shareWindow(elems) {
    let share_elements = elems;
    let share_url = 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + this.url +
      '&st.comments=' + this.title;
    
    [...share_elements].forEach((item) => {
      item
        .addEventListener('click', function (event) {
          event.preventDefault();
          return window.open(share_url, 'Share this', 'width=640,height=480,location=no,toolbar=no,menubar=no');
        });
    });
  }
  
  getCounter(elems) {
    let script = document.createElement('script');
    let count_elements = elems;
    let count_url = 'https://connect.ok.ru/dk?st.cmd=extLike&uid=1&ref=' + this.url;
    
    window.ODKL = {};
    
    if (count_elements.length > 0) {
      window.ODKL.updateCount = (counter) => {
        [...count_elements].forEach((item) => {
          item.innerHTML = counter;
        });
        
        script.parentNode.removeChild(script);
      };
      
      script.src = count_url;
      document.body.appendChild(script);
    }
  }
}
