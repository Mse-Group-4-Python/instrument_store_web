import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

import { InstrumentModel, InstrumentResource } from '../../api/instrument_api';
import { useCallback, useEffect, useState } from 'react';
import { useController, useSuspense } from '@rest-hooks/react';

import AddInstrumentModal from './AddInstrumentModal';
import AsyncBoundary from '../../components/AsyncBoundary';
import DataTable from '../../components/dataTable/DataTable';
import DeleteModal from '../../components/deleteModal';
import FullscreenLoader from '../../components/FullscreenLoader';
import { GridColDef } from '@mui/x-data-grid';
import NetworkErrorMessage from '../../components/NetworkErrorMessage';
import { toast } from 'react-toastify';

export const Instrument = () => {
  function InstrumentList() {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [itemData, setItemData] = useState<InstrumentModel>(new InstrumentModel);

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
      {
        field: 'instrument_name',
        type: 'string',
        headerName: 'Instrument',
        flex: 2,
      },
      {
        field: 'manufacturer_name',
        type: 'string',
        headerName: 'Manufacturer',
        flex: 2,
      },
      {
        field: 'category_name',
        type: 'string',
        headerName: 'Category',
        flex: 2,
      },
      {
        field: 'description',
        headerName: 'Description',
        type: 'string',
        flex: 2,
      },
      {
        field: 'color',
        headerName: 'Color',
        flex: 1,
        type: 'string',
      },
      {
        field: 'tags',
        headerName: 'Tags',
        flex: 1,
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
    const instruments = useSuspense(InstrumentResource.getList);

    const onDeleteItem = () => {
      fetch(InstrumentResource.delete, {
        id: itemData.id,
      })
        .then(() => {
          fetch(InstrumentResource.getList);
          toast.success('Instructment deleted successfully!', {
            position: 'top-right',
            autoClose: 7000, // Set the duration of the toast in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setEditData(null);
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
      (data: InstrumentModel) => {
        if (editMode != true) {
          fetch(InstrumentResource.create, {
            instrument_name: data.instrument_name,
            manufacturer_id: data.manufacturer_id,
            category_id: data.category_id,
            description: data.description,
            color: data.color,
            tags: data.tags,
          })
            .then(() => {
              fetch(InstrumentResource.getList);
              toast.success('Instructment saved successfully!', {
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
            InstrumentResource.update,
            { id: data.id },
            {
              instrument_name: data.instrument_name,
              manufacturer_id: data.manufacturer_id,
              category_id: data.category_id,
              description: data.description,
              color: data.color,
              tags: data.tags,
            }
          )
            .then(() => {
              fetch(InstrumentResource.getList);
              toast.success('Instructment updated successfully!', {
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
            <h1>Instruments</h1>
            <button onClick={onAddNewItemClick}>Add New Instrument</button>
          </div>
          <DataTable
            slug="products"
            columns={columns}
            rows={instruments}
          />
        </div>
        {/* Modal for adding a new item */}
        <AddInstrumentModal
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
      <InstrumentList />
    </AsyncBoundary>
  );
};
