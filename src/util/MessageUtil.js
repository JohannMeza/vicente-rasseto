import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import '../style/MessageUtil.css'

export const MessageUtil = ({ message, status = null, type, seg = 0, callback }) => {
  let typeMessage = null;
  let icon = null
  if (type === 'success') {
    typeMessage = 'En Hora Buena!!';
    icon = 'fa-solid fa-circle-check'
  } else if (type === 'warning') {
    typeMessage = 'Advertencia!!';
    icon = 'fa-solid fa-triangle-exclamation'
  } else if (type === 'error') {
    typeMessage = `Error ${status || ''}!!`;
    icon = 'fa-solid fa-circle-exclamation'
  } else if (type === 'info') {
    typeMessage = 'Info.';
    icon = 'fa-solid fa-circle-info'
  }
  
  alertify.notify(
    `
      <div class="notifyContent">
        <span class="notifyContent__icon">
          <i class="${icon}"></i>
        </span>
        <span class="notifyContent__text">
          <span class="notifyContent__title"><b>${typeMessage || ''}</b></span>
          <span class="notifyContent__message">${message}</span>
        </span>
      </div>
    `,
    type,
    seg,
    callback
  );

  
  // alertify.success(`
  // <span><i class="fa-solid fa-circle-check"></i></span>
  // Este es un mensaje de exito
  // `);
// alertify.warning('Este es un mensaje de advertencia');
// alertify.error('Este es un mensaje de error');
// alertify.message('Este es un mensaje de normal');
// alertify.notify('error','error',10, null); 
}