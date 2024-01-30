import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import {
  InstrumentItemResource,
  InstrumentItems,
} from '../../api/instrument_item_api';
import { useCallback, useEffect, useState } from 'react';
import { useController, useSuspense } from '@rest-hooks/react';

import AddInstrumentItemModal from './AddInstrumentItemModel';
import AsyncBoundary from '../../components/AsyncBoundary';
import DataTable from '../../components/dataTable/DataTable';
import DeleteModal from '../../components/deleteModal';
import FullscreenLoader from '../../components/FullscreenLoader';
import { GridColDef } from '@mui/x-data-grid';
import NetworkErrorMessage from '../../components/NetworkErrorMessage';
import { toast } from 'react-toastify';

export const InstrumentItem = () => {
  function ProductList() {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [itemData, setItemData] = useState<InstrumentItems>(new InstrumentItems);

    const onAddNewItemClick = () => {
      setEditMode(false);
      setAddModalOpen(true);
      setEditData(null); // Reset editData when adding a new item
    };

    const onEditItemClick = (data: any) => {
      setEditMode(true);
      setAddModalOpen(true);
      setEditData(data);
    };

    const onDeleteItemClick = (data: any) => {
      setItemData(data);
      setDeleteModalOpen(true);
    };

    const onCloseAddModal = () => {
      setAddModalOpen(false);
    };

    const onCloseDeleteModal = () => {
      setDeleteModalOpen(false);
    };

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', flex: 1, },
      // {
      //   field: 'img',
      //   headerName: 'Image',
      //   width: 100,
      //   renderCell: (params) => {
      //     return (
      //       <img
      //         src={params.row.img || '/noavatar.png'}
      //         alt=""
      //       />
      //     );
      //   },
      // },
      {
        field: 'instrument_name',
        type: 'string',
        headerName: 'Instrument Name',
        flex: 2,
      },
      {
        field: 'description',
        type: 'string',
        headerName: 'Description',
        flex: 2,
      },
      {
        field: 'serial_number',
        type: 'string',
        headerName: 'Serial Number',
        flex: 2,
      },
      {
        field: 'year_of_purchase',
        headerName: 'Year Of Purchase',
        type: 'string',
        flex: 2,
      },
      {
        field: 'price',
        headerName: 'Price',
        flex: 2,
        type: 'string',
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderCell: (params) => {
          return (
            <div className="actions">
              <img
                src="./view.svg"
                alt=""
                onClick={() => onEditItemClick(params.row)}
              />
              <div
                className="delete"
                onClick={() => {
                  onDeleteItemClick(params.row);
                }}
              >
                <img
                  src="./delete.svg"
                  alt=""
                />
              </div>
            </div>
          );
        },
      },
    ];

    const { fetch } = useController();
    const instruments = useSuspense(InstrumentItemResource.getList);

    const onDeleteItem = () => {
      fetch(InstrumentItemResource.delete, {
        id: itemData.id,
      })
        .then(() => {
          fetch(InstrumentItemResource.getList);
          toast.success('Instructment Item deleted successfully!', {
            position: 'top-right',
            autoClose: 7000, // Set the duration of the toast in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            toast.error(`Error: Error Something, Nguyên dont know`, {
              position: 'top-right',
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        });
    };

    const onSaveItem = useCallback(
      (data: InstrumentItems) => {
        if (editMode != true) {
          fetch(InstrumentItemResource.create, {
            instrument_id: data.instrument_id,
            serial_number: data.serial_number,
            description: data.description,
            year_of_purchase: data.year_of_purchase,
            price: data.price,
          })
            .then(() => {
              fetch(InstrumentItemResource.getList);
              toast.success('Instructment Item saved successfully!', {
                position: 'top-right',
                autoClose: 7000, // Set the duration of the toast in milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            })
            .catch((err: unknown) => {
              if (err instanceof Error) {
                toast.error(`Error: Error Something, Nguyên dont know`, {
                  position: 'top-right',
                  autoClose: 7000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              }
            });
        } else {
          fetch(
            InstrumentItemResource.update,
            { id: data.id },
            {
              instrument_id: data.instrument_id,
              serial_number: data.serial_number,
              description: data.description,
              year_of_purchase: data.year_of_purchase,
              price: data.price,
            }
          )
            .then(() => {
              fetch(InstrumentItemResource.getList);
              toast.success('Instructment Item updated successfully!', {
                position: 'top-right',
                autoClose: 7000, // Set the duration of the toast in milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            })
            .catch((err: unknown) => {
              if (err instanceof Error) {
                toast.error(`Error: Error Something, Nguyên dont know`, {
                  position: 'top-right',
                  autoClose: 7000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              }
            });
        }
      },
      [editMode]
    );

    return (
      <>
        <div className="products">
          <div className="info">
            <h1>Instrument Items</h1>
            <button onClick={onAddNewItemClick}>Add New Item</button>
          </div>
          <DataTable
            slug="products"
            columns={columns}
            rows={instruments}
          />
        </div>
        {/* Modal for adding a new item */}
        <AddInstrumentItemModal
          isOpen={isAddModalOpen}
          onClose={onCloseAddModal}
          onSave={onSaveItem}
          //  editData={undefined}: InstrumentItems)}
          editData={editData}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={onCloseDeleteModal}
          onSave={onDeleteItem}
        />
      </>
    );
  }

  return (
    <AsyncBoundary
      errorFallback={NetworkErrorMessage}
      loadingFallback={() => <FullscreenLoader />}
    >
      <ProductList />
    </AsyncBoundary>
  );
};
