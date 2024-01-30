// AddInstrumentItemModal.tsx

import { Button, IconButton, MenuItem, Modal, TextField } from '@mui/material';
import {
  InstrumentItemResource,
  InstrumentItems,
} from '../../api/instrument_item_api';
import { InstrumentModel, InstrumentResource } from '../../api/instrument_api';
import React, { useEffect, useState } from 'react';
import { useController, useSuspense } from '@rest-hooks/react';

import { Close } from '@mui/icons-material';

type AddInstrumentItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newItemData: InstrumentItems) => void; // Adjust the type based on your data structure
  editData: any; // Adjust the type based on your data structure
};

const AddInstrumentItemModal: React.FC<AddInstrumentItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editData,
}) => {
  // const [dropdownOptions, setDropdownOptions] = useState(['nguyen', 'hang']);
  const [newItemData, setNewItemData] = useState<InstrumentItems>(
    new InstrumentItems()
  );
  const dropdownOptions = useSuspense(InstrumentResource.getList);

  useEffect(() => {
    if (editData) {
      // If editData is provided, set the initial values for editing
      setNewItemData(editData);
    } else {
      // If editData is not provided, reset the form
      setNewItemData(new InstrumentItems());
    }
  }, [editData]);

  const onInputChange = (field: keyof typeof newItemData, value: string) => {
    setNewItemData((prevData: any) => {
      if (field === 'price' || field === 'year_of_purchase') {
        // Convert value to number for numeric fields
        return {
          ...prevData,
          [field]: parseFloat(value),
        };
      } else {
        // Keep the value as a string for other fields
        return {
          ...prevData,
          [field]: value,
        };
      }
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
          <h3 style={{ color: 'black' }}>
            {!editData ? 'Add New Instrument Item' : 'Edit Instrument Item'}
          </h3>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 16, textAlign: 'center' }}>
          <TextField
            label="Instrument Name"
            select
            fullWidth
            value={newItemData.instrument_id}
            onChange={(e) => onInputChange('instrument_id', e.target.value)}
            style={{ textAlign: 'left' }}
            margin="normal"
          >
            {dropdownOptions.map((option) => (
              <MenuItem
                key={option.id}
                value={option.id}
              >
                {option.instrument_name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Serial Number"
            value={newItemData.serial_number}
            onChange={(e) => onInputChange('serial_number', e.target.value)}
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
              label="Year Of Purchase"
              type="number"
              value={newItemData.year_of_purchase}
              onChange={(e) =>
                onInputChange('year_of_purchase', e.target.value)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              type="number"
              value={newItemData.price}
              onChange={(e) => onInputChange('price', e.target.value)}
              fullWidth
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

export default AddInstrumentItemModal;
