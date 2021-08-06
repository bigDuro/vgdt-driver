
export const getCommonActions = (history, driver) => {

  return {
      handleClick: false,
      handleAdd: false,
      handleRefresh: false,
      handleDelete: false,
      handleExport: false,
      getDriver: () => driver,
      handleUpload: (id) => {
        history.push(`../assets/loads/${id}`);
      }
    }
}
