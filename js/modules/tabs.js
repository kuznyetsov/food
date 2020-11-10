function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabContainer = document.querySelector(tabsParentSelector);

    function hideContent () {
        tabsContent.forEach (item => {
            item.style.display = 'none';
        });

        tabs.forEach (item => {
            item.classList.remove(activeClass);
        });
    }

    function showContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }

    hideContent ();
    showContent();

    tabContainer.addEventListener ('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideContent ();
                    showContent(i);
                }
            });
        }
    });
}

export default tabs;