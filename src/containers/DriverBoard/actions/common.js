
export const getCommonActions = (history, driver) => {

  return {
      handleClick: (id) => {
        history.push(`/vgdt-driver/name/${driver}/loads/${id}`);
      },
      handleBack: (id) => {
        history.back();
      },
      handleAdd: false,
      handleRefresh: false,
      handleDelete: false,
      handleExport: false,
      getDriver: () => driver,
      handleUpload: (id) => {
        history.push(`./assets/loads/${id}`);
      }
    }
}
