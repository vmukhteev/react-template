/**
 *  Vikky Shostak <vikkyshostak@gmail.com>
 *  Copyright (c) 2016 Koddr https://koddr.me
 *  http://opensource.org/licenses/MIT The MIT License (MIT)
 *
 *  goodshare.js
 *
 *  Vkontakte (https://vk.com) provider.
 */

export default class {
  constructor({
    url = document.location.href,
    title = document.title,
    description,
    image
  }) {
    this.url = encodeURIComponent(url);
    this.title = encodeURIComponent(title);
    this.description = (description) ? encodeURIComponent(description) : '';
    this.image = (image) ? encodeURIComponent(image) : '';
  }
  
  shareWindow(elems) {
    let share_elements = elems;
    let share_url = 'https://vk.com/share.php?url=' + this.url +
      '&title=' + this.title + '&description=' + this.description +
      '&image=' + this.image;

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
    let count_url = 'https://vk.com/share.php?act=count&index=1&url=' + this.url;
    
    window.VK = {Share: {}};
    
    if (count_elements.length > 0) {
      window.VK.Share.count = (counter) => {
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
