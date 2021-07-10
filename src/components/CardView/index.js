import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UserCard from './UserCard';
import ListToolBar from '../ListToolBar';
import EnhancedTableToolbar from '../ListActionBar';

const CardView = (props) => {
  const { rows, table, actions, searchTerm } = props;
  const isMobile = useMediaQuery('(max-width:1023px)');
  const [ selected, setSelected ] = React.useState([]);
  const cardTypes = (type, row, indx, handleSelected, actions) => {
    const types = {
      users: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx} id={row.id}>
          <UserCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected} actions={actions}/>
        </Grid>)
    }
    return types[type] || 'No Card View!'
  }
  const handleSelected = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <ListToolBar actions={actions} searchTerm={searchTerm}/>
            <EnhancedTableToolbar numSelected={selected.length} {...actions} selected={selected} setSelected={setSelected}/>
        </Grid>
      {rows && rows.length ? rows.map((row, indx) => {
        return cardTypes(table, row, indx, handleSelected, actions)
      }) : ''}

     </Grid>
    </React.Fragment>
  )
}

CardView.propTypes = {
};

export default (CardView);
