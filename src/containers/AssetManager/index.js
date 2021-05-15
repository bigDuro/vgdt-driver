import React from 'react';
import FileUploader from '../../components/FileUploader/';
import FileLoader from '../../components/FileLoader'
import { getAssets, uploadAssets, deleteAssets } from '../../services';
// import './index.scss';

function AssetManager(props) {
  const { history, match } = props;
  const table = match.params.table;
  const id = match.params.id;
  const [ assets, setAssets ] = React.useState([])
  const deleteFile = (table, id, file) => {
    deleteAssets(table, id, file).then(data => {
      setAssets(data);
    })
  }
  const uploadFile = (file, table, id) => {
    uploadAssets(file, table, id).then(data => {
      setAssets(data);
    })
  }

  React.useEffect(() => {
    const makeRequest = async () => {
      const response = await getAssets(table, id);
      setAssets(response)
    }
    makeRequest();
  }, [assets]);

  return (
    <div className="AssetManager">
      <FileUploader handleUpload={uploadFile} table={table} id={id} handleDelete={deleteFile}/>
      <FileLoader assets={assets} deleteFile={deleteFile} id={id} table={table}/>
    </div>
  )
}

export default AssetManager;
