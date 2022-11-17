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
      console.log(err)
      error(response.data)
    })
  }

}