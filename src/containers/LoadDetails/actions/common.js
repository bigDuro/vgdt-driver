export const getCommonActions = (table, history) => {

  return {
      handleClick: (id) => {
        return true
      },
      handleChange: (e) => {
        e.preventDefault();
        return true
      },
      handleAdd: () => {
        return true
      },
      handleRefresh: (tbl) => {
        return true
      },
      handleDelete: (ids) => {
        return true
      },
      handleClear: () => {
        return true
      },
      handleUpload: (id) => {
        return true
      }
    }
}
