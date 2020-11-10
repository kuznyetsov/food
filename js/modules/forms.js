import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
     //Forms

     const forms = document.querySelectorAll(formSelector);

     const message = {
         loading: 'Загрузка...',
         succes: 'Спасибо! Скоро мы свяжемся с вами',
         failure: 'Что-то пошло не так...'
     };
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     
 
 
     function bindPostData(form) {
         form.addEventListener('submit', (e) => {
             e.preventDefault();
 
             let statusMessage = document.createElement('div');
             statusMessage.classList.add('status');
             statusMessage.textContent = MessageChannel.loading;
             form.appendChild(statusMessage);
 
             const formData = new FormData(form);
 
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
 
             postData('http://localhost:3000/requests', json)
             .then(data => {
                 console.log(data);
                 showThanksModal(message.succes);
                 statusMessage.remove();
             }).catch(() => {
                 showThanksModal(message.failure);
             }).finally(() => {
                 form.reset();
             });
         });
     }
 
     function showThanksModal(message) {
         const prevModal = document.querySelector('.modal__dialog');
         prevModal.classList.add('hide');
        
         openModal('.modal', modalTimerId);
         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
         <div class="modal__content">
             <div data-close class="modal__close">x</div>
             <div class="modal__title">${message}</div>
         </div>    
         `;
         document.querySelector('.modal').append(thanksModal);
 
         setTimeout(() => {
             thanksModal.remove();
             prevModal.classList.add('show');
             prevModal.classList.remove('hide');
             closeModal('.modal');
         }, 3000);
     }
}

export default forms;