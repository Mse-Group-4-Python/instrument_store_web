// AddInstrumentModal.tsx

import { Button, IconButton, MenuItem, Modal, TextField } from '@mui/material';
import { CategoryModel, CategoryResource } from '../../api/category_api';
import {
  InstrumentItemResource,
  InstrumentItems,
} from '../../api/instrument_item_api';
import { InstrumentModel, InstrumentResource } from '../../api/instrument_api';
import { ManufacturersModel, ManufacturersResource } from '../../api/manufacturer_api';
import React, { useEffect, useState } from 'react';
import { useController, useSuspense } from '@rest-hooks/react';

import { Close } from '@mui/icons-material';

type AddInstrumentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItemData: any) => void; // Adjust the type based on your data structure
  editData: any; // Adjust the type based on your data structure
};

const AddInstrumentModal: React.FC<AddInstrumentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editData,
}) => {
  const [newItemData, setNewItemData] = useState<InstrumentModel>(
    new InstrumentModel()
  );
  const [dropdownCategory, setDropdownCategory] = useState<CategoryModel[]>(
    useSuspense(CategoryResource.getList)
  );

  const dropdownManufacturers = useSuspense(ManufacturersResource.getList);

  useEffect(() => {
    if (editData) {
      // If editData is provided, set the initial values for editing
      setNewItemData(editData);
    } else {
      // If editData is not provided, reset the form
      setNewItemData(new InstrumentModel());
    }
  }, [editData, setNewItemData]);

  const onInputChange = (field: keyof typeof newItemData, value: string) => {
    setNewItemData((prevData: any) => {
      // Keep the value as a string for other fields
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const handleSave = () => {
    onSave(newItemData);
    onClose();
  };

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
          <h3 style={{ color: 'black' }}>{!editData ? "Add New Instrument" : 'Edit Instrument'}</h3>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 16, textAlign: 'center' }}>
          <TextField
            label="Manufacturer"
            select
            fullWidth
            value={newItemData.manufacturer_id}
            onChange={(e) => onInputChange('manufacturer_id', e.target.value)}
            style={{ textAlign: 'left' }}
            margin="normal"
          >
            {dropdownManufacturers.map((option) => (
              <MenuItem
                key={option.manufacturer_id}
                value={option.manufacturer_id}
              >
                {option.manufacturer_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Category"
            select
            fullWidth
            value={newItemData.category_id}
            onChange={(e) => onInputChange('category_id', e.target.value)}
            style={{ textAlign: 'left' }}
            margin="normal"
          >
            {dropdownCategory.map((option) => (
              <MenuItem
                key={option.category_id}
                value={option.category_id}
              >
                {option.category_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Instrument Name"
            value={newItemData.instrument_name}
            onChange={(e) => onInputChange('instrument_name', e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newItemData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            fullWidth
            margin="normal"
          />
          <div style={{ display: 'flex', gap: 16 }}>
            <TextField
              label="Color"
              value={newItemData.color}
              onChange={(e) => onInputChange('color', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tag"
              value={newItemData.tags}
              fullWidth
              onChange={(e) => onInputChange('tags', e.target.value)}
              margin="normal"
            />
          </div>

          {/* Add similar TextFields for other data */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: 20 }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddInstrumentModal;
