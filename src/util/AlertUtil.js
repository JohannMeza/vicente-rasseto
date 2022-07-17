import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

export const AlertUtilDelete = (fnRequest, { config }) => {
  const { title, text, icon } = config;

  MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    color: '#444444',
    confirmButtonColor: '#517ABF',
    cancelButtonColor: '#F5958E',
    confirmButtonText: '¡Si, eliminar!',
    cancelButtonText: '¡No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      if (fnRequest()) {
        fnRequest()
      }
    }
  })
}

export const AlertUtilRelease = ({ title, text, icon }) => {
  MySwal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#517ABF',
  })
}