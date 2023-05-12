import { ICON } from "../framework/components/icons/Icon";
import { REPORT_POST } from "../services/services.axios";
import { AlertUtilRelease } from "../util/AlertUtil";
import FileSaver from 'file-saver';

export  const SaveRequestData = (config) => {
  let { path, body, fnRequest, success, error, pagination, rowsPerPage, page } = config;
  
  if (pagination) {
    body = {
      ...body,
      rowsPerPage,
      page
    }
    
    return fnRequest(path, body)
    .then(resp => {
      success(resp.data)
    })
    .catch((err) => {
      let { response } = err
      error(response.data)
    })
  } else {
    return fnRequest(path, body)
    .then(resp => {
      success({...resp.data})
    })
    .catch((err) => {
      let { response } = err
      error(response.data)
    })
  }
}

export const SaveRequestReport = (config) => {
  let { path, body, success, error } = config;

  return REPORT_POST(path, body)
  .then(resp => {
    const dirtyFileName = resp.headers['content-disposition'];
    const regex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/;
    const fileName = dirtyFileName.match(regex)[3];
    var blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, fileName);
    success();
  })
  .catch((err) => {
    let { response } = err;
    AlertUtilRelease({ title: "Error", text: "No se generó el reporte", icon: "error" })
    error && error(response?.data)
  })
}