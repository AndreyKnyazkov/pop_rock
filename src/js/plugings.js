//Плагин на табы
const tabs = (mainBlock, titleTab, cssMain) => {
  //Главный блок с табом
  const tabJsMainBlock = document.querySelectorAll(mainBlock),
    //Заголовок таба
    tabJsTitle = document.querySelectorAll(titleTab);

  //Добавляю ко всем элементом класс закрытия
  const closeTabs = () => {
    //закрываю все табы
    tabJsMainBlock.forEach((elem) => {
      elem.classList.add('close');
    });
    // Если нужно, добавляю элемент раскрытого таба
    tabJsMainBlock[1].classList.remove('close');
    tabJsMainBlock[1].classList.add('open');
  };
  // mainBlock, titleTab, cssMain
  closeTabs();

  tabJsTitle.forEach((elem, i) => {
    elem.addEventListener('click', () => {
      const itemClass = elem.parentNode.className;
      for (i = 0; i < tabJsMainBlock.length; i++) {
        console.log(tabJsMainBlock.toString);
        tabJsMainBlock[i].className = `${cssMain} ${mainBlock} close`.replace(/\./gi, '');
      }
      if (itemClass == `${cssMain} ${mainBlock} close`.replace(/\./gi, '')) {
        elem.parentNode.className = `${cssMain} ${mainBlock} open`.replace(/\./gi, '');
      }
    });
  });
};

//tabs('.js-tab-main-block', '.tab-js-title', 'defect-tabs__block');

//Сначала по классу должен идти главный блок, заложенный в верстке, потом исполнительный класс скрипта, потом уже говорится закрыт он или нет
//Пример: defect-tabs__block js-tab-main-block open
//css код для скрипта: 
/*
.open .tab-js-subtitle {
  -webkit-transform: scaleY(1);
  transform: scaleY(1);
  -webkit-transform-origin: top;
  transform-origin: top;
  -webkit-transition: -webkit-transform .4s ease;
  transition: -webkit-transform .4s ease;
  transition: transform .4s ease;
  transition: transform .4s ease, -webkit-transform .4s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.close .tab-js-subtitle {
  height: 0;
  -webkit-transition: height 1s ease-out;
  transition: height 1s ease-out;
  -webkit-transform: scaleY(0);
  transform: scaleY(0);
}
*/