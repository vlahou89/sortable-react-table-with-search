import DataTable from 'react-data-table-component';
import React, { useState } from 'react';

const columns = [
  {
    name: 'Type',
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Added',
    selector: (row) => row.added,
    sortable: true,
  },
];

const data = [
  {
    type: 'PDF',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
  {
    type: 'PDF',
    name: 'Public Holiday policy',
    added: '2016-12-06',
  },
  {
    type: 'FOLDER',
    name: 'Expenses',
    files: [
      {
        type: 'doc',
        name: 'Expenses claim form',
        added: '2017-05-02',
      },
      {
        type: 'doc',
        name: 'Fuel allowances',
        added: '2017-05-03',
      },
    ],
  },
  {
    type: 'CSV',
    name: 'Cost centres',
    added: '2016-08-12',
  },
  {
    type: 'FOLDER',
    name: 'Misc',
    files: [
      {
        type: 'doc',
        name: 'Christmas party',
        added: '2017-12-01',
      },
      {
        type: 'mov',
        name: 'Welcome to the company!',
        added: '2015-04-24',
      },
    ],
  },
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="flex flex-row">
    <input
      data-testid="input"
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="g-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
    />
    <button
      type="button"
      onClick={onClear}
      className="bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      data-testid="button"
    >
      Clear
    </button>
  </div>
);

const ExpandedComponent = ({ data }) => (
  <div
    data-testid="expanded"
    className={data.files ? 'cursor-pointer flex flex-row bg-indigo-50' : ''}
  >
    {' '}
    {data.files
      ? data.files.map((x) => {
          return (
            <div class="  bg-indigo-50 p-4">
              <div class="max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl w-52  h-60 p-2">
                <img
                  src="https://imgs.search.brave.com/PdQRk5iKO8z2iLmGYhMlQmXVdZZS2Hb94nQwytuas9s/rs:fit:600:600:1/g:ce/aHR0cDovL2F0bGFz/LWNvbnRlbnQtY2Ru/LnBpeGVsc3F1aWQu/Y29tL3N0b2NrLWlt/YWdlcy9jb21wdXRl/ci1mb2xkZXItaWNv/bi1maWxlLVhvdldr/TDctNjAwLmpwZw"
                  alt="file"
                  className="h-24 w-24 m-auto"
                />
                <div className="p-5">
                  <ul className="text-medium mb-5 text-gray-700">
                    <li> {x.name}</li>
                    <li>{x.type}</li>
                    <li>{x.added}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })
      : null}
  </div>
);

const App = () => {
  const [filterText, setFilterText] = useState('');

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return (
    <div
      className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-20 "
      data-testid="table"
    >
      <DataTable
        columns={columns}
        data={filteredItems}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        striped
      />
    </div>
  );
};

export default App;
