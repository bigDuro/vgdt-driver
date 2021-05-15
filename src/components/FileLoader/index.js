import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FileViewer from 'react-file-viewer';
import { env } from '../../services';
import { paperStyles } from '../../styles/paper';
import './index.scss';


const onError = (e) => {
  console.log(e, 'error in file-viewer');
}

function CustomErrorComponent(props) {
  return (
    <div>Error</div>
  )
}
function FileLoader(props) {
  const { assets, id, table, deleteFile } = props;
  const classes = paperStyles();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {assets.map((file, indx) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card className={classes.root}>
                <CardActionArea>
                  {file.includes('pdf') ?
                  <FileViewer
                    fileType={file.split('.')[1]}
                    filePath={`${env}/assets/${table}/${id}/${file}`}
                    errorComponent={CustomErrorComponent}
                    onError={onError}/> :
                    <img alt="load document" src={`${env}/assets/${table}/${id}/${file}`} width="100%"/>
                  }
                  <CardContent>
                    <Typography gutterBottom variant="subtitle2" component="p">
                      {file}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={()=> window.open(`${env}/assets/${table}/${id}/${file}`, "_blank")}>
                    Download
                  </Button>
                  <Button size="small" color="primary" onClick={() => deleteFile(table, id, file)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}

      </Grid>
    </React.Fragment>
  )
}

export default FileLoader;





//   {file.name}
//   <IconButton color="primary" aria-label="upload picture" component="span">
//     <PhotoCamera />
//   </IconButton>
//   <IconButton color="primary" aria-label="upload picture" component="span">
//     <PhotoCamera />
//   </IconButton>
//   <IconButton color="primary" aria-label="upload picture" component="span">
//     <PhotoCamera />
//   </IconButton>
