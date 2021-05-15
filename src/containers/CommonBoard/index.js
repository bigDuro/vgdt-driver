import React from 'react';
import Grid from '@material-ui/core/Grid';
import CardView from '../../components/CardView';
import { getColumnType } from './columns';
import { getActions } from './actions';
import { get } from '../../services';
import { filterRecords } from '../../utils/filterTables';
import './index.scss';




function CommonBoard(props) {
  const { history, match } = props;
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const table = match.params.table;
  const columnData = getColumnType(table);
  const actions = getActions(table, history);
  const data = searchTerm ? filteredRows : rows;
  React.useEffect(() => {
    const makeRequest = async () => {
      get(table).then(users => {
        setRows(users);
      });
    }
    makeRequest();
  }, []);
  actions.handleChange = (e) => {
    const term = e.currentTarget.value;
    setSearchTerm(term)
    setFilteredRows(filterRecords(rows, term));
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
          <CardView history={history} actions={actions} rows={data} columns={columnData} table={table} searchTerm={searchTerm}/>
      </Grid>
    </Grid>

  )
}


export default CommonBoard;
