import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { InstrumentOrder, OrderModel, OrderResource } from '../../api/order_api';
import { useController, useSuspense } from '@rest-hooks/react';

import AsyncBoundary from '../../components/AsyncBoundary';
import DataTable from '../../components/dataTable/DataTable';
import DataTable2 from '../../components/dataTable2/DataTable2';
import FullscreenLoader from '../../components/FullscreenLoader';
import { GridColDef } from '@mui/x-data-grid';
import NetworkErrorMessage from '../../components/NetworkErrorMessage';
import OrderItemListModel from './OrderItemListModel';
import { useState } from 'react';

export const Orders = () => {
  function OrderList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState<InstrumentOrder[]>([]);

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', flex: 1 },
      {
        field: 'customer_name',
        type: 'string',
        headerName: 'Customer name',
        flex: 2,
      },
      {
        field: 'delivery_address',
        type: 'string',
        headerName: 'Delivery address',
        flex: 2,
      },
      {
        field: 'phone_number',
        type: 'string',
        headerName: 'Phone number',
        flex: 1,
      },
      {
        field: 'order_time',
        type: 'string',
        headerName: 'Order time',
        flex: 1,
      },
      {
        field: 'total_price',
        type: 'string',
        headerName: 'Total price',
        flex: 1,
      },
    ];

    const orders = useSuspense(OrderResource.getList);

    const handleRowClick = (rowData: OrderModel) => {
      setIsModalOpen(true);
      setSelectedRowData(rowData.order_items);
    };

    return (
      <>
        <div className="products">
          <div className="info">
            <h1>Orders</h1>
          </div>
          <DataTable
            slug="products"
            columns={columns}
            rows={orders}
            onRowClick={handleRowClick}
          />
          {isModalOpen && (
            // Đưa modal component vào đây, truyền selectedRowData để hiển thị thông tin chi tiết
            <OrderItemListModel
              rowData={selectedRowData}
              onClose={() => setIsModalOpen(false)}
              isOpen={isModalOpen}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <AsyncBoundary
      errorFallback={NetworkErrorMessage}
      loadingFallback={() => <FullscreenLoader />}
    >
      <OrderList />
    </AsyncBoundary>
  );
};
