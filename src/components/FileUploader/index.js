import React from 'react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import './index.scss'

function FileUploader(props) {
  const { handleUpload, table, id, handleDelete } = props
  const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if(status === 'uploading') {
      // console.log('upload:: ', status, file)
      handleUpload(file, table, id);
    }else if (status === 'removed') {
      // console.log('upload:: ', status, file)
      // handleDelete('assets', [file.id])
    }

  }

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={null}
      accept="image/*,application/pdf"
    />
  )
}

export default FileUploader;
