// OrderItemListModel.tsx

import { IconButton, Modal } from '@mui/material';

import { Close } from '@mui/icons-material';
import DataTable2 from '../../components/dataTable2/DataTable2';
import { GridColDef } from '@mui/x-data-grid';
import { InstrumentOrder } from '../../api/order_api';
import React from 'react';

const columns: GridColDef[] = [
  { field: 'instrument_name', headerName: 'Instrument name', flex: 2 },
  {
    field: 'quantity',
    type: 'string',
    headerName: 'Quantity',
    flex: 1,
  },
  {
    field: 'price',
    type: 'string',
    headerName: 'Price',
    flex: 1,
  },
];

type OrderItemListProps = {
  rowData: InstrumentOrder[];
  onClose: () => void;
  isOpen: boolean;
};

const OrderItemListModel: React.FC<OrderItemListProps> = ({
  rowData,
  onClose,
  isOpen,
}) => {
  console.log('rowData', rowData);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          backgroundColor: 'white',
          borderRadius: 8, // Optional: Add some border-radius for a rounded appearance
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            borderBottom: '1px solid #ccc',
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3 style={{ color: 'black' }}>Order Item List</h3>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 16, textAlign: 'center' }}>
          <DataTable2
            slug="products"
            columns={columns}
            rows={rowData}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OrderItemListModel;
