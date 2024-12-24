export function getTableSort(newSortOrder: (a: any, b: any, sortOrderID: any) => 0 | 1 | -1) {
  return (sortOrder, sortOrderID) => {
    return sortOrder === 'desc' ?
      (a, b) => newSortOrder(a, b, sortOrderID) :
      (a, b) => -newSortOrder(a, b, sortOrderID);
  };
}

export function handleTableSort() {
  return (a, b, sortOrderID) => {
    if (b[sortOrderID] < a[sortOrderID]) {
      return -1;
    }
    if (b[sortOrderID] > a[sortOrderID]) {
      return 1;
    }
    return 0;
  };
}

export function handleTableOrder(sortOrderID: string, sortOrder: string, setSortOrder: React.Dispatch<React.SetStateAction<string>>, setSortOrderID: React.Dispatch<React.SetStateAction<string>>) {
  return (order) => {
    const isAsc = sortOrderID === order && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortOrderID(order);
  };
}