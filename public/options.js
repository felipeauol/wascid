/* 1 look for any elements with the class "custom-select": */

function test() {
  if (!v2) {
    console.log('this is not a test');
  } else {
    /* 2 for each element, create a new DIV that will act as the selected item: */
    selectElements.forEach((el) => {
      const newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'select-selected');
      newDiv.innerHTML = el.options[el.selectedIndex].innerHTML;
      el.parentNode.appendChild(newDiv);

      /* 3 for each element, create a new DIV that will contain the option list: */
      const newDivList = document.createElement('div');
      newDivList.setAttribute('class', 'select-items select-hide');

      /* 4 for each option in the original select element,
    create a new DIV that will act as an option item: */
      for (let i = 1; i < el.options.length; i++) {
        const newDivOption = document.createElement('div');
        newDivOption.innerHTML = el.options[i].innerHTML;
        /* 5 when an item is clicked, update the original select box,
        and the selected item: */
        newDivOption.addEventListener('click', function update() {
          for (i = 0; i < el.length; i++) {
            if (el.options[i].innerHTML === this.innerHTML) {
              el.selectedIndex = i;
              newDiv.innerHTML = this.innerHTML;
              const sameAsSelected = this.parentNode.getElementsByClassName('same-as-selected');
              for (let j = 0; j < sameAsSelected.length; j++) {
                sameAsSelected[j].removeAttribute('class');
              }
              this.setAttribute('class', 'same-as-selected');
              break;
            }
          }
          newDiv.click();
        });
        newDivList.appendChild(newDivOption);
      }
      el.parentNode.appendChild(newDivList);

      /* 6 when the select box is clicked, close any other select boxes,
      and open/close the current select box: */

      newDiv.addEventListener('click', function close(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
      });
    });
  }
}

/* 7 a function that will close all select boxes in the document,
except the current select box: */
function closeAllSelect(elmnt) {
  const selectItems = document.getElementsByClassName('select-items');
  const selectSelected = document.getElementsByClassName('select-selected');

  for (let i = 0; i < selectSelected.length; i++) {
    const arrNo = [];
    if (elmnt === selectSelected[i]) {
      arrNo.push(i);
    } else {
      selectSelected[i].classList.remove('select-arrow-active');
    }

    for (i = 0; i < selectItems.length; i++) {
      if (arrNo.indexOf(i)) {
        selectItems[i].classList.add('select-hide');
      }
    }
  }
}

/* 8 if the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener('click', closeAllSelect);
test();
