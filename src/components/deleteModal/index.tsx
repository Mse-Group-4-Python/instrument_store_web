// AddInstrumentItemModal.tsx

import { Button, IconButton, MenuItem, Modal, TextField } from '@mui/material';
import { InstrumentItemResource, InstrumentItems } from '../../api/instrument_item_api';
import { InstrumentModel, InstrumentResource } from '../../api/instrument_api';
import React, { useEffect, useState } from 'react';
import { useController, useSuspense } from '@rest-hooks/react';

import { Close } from '@mui/icons-material';

type AddInstrumentItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void; // Adjust the type based on your data structure
};

const DeleteModal: React.FC<AddInstrumentItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [newItemData, setNewItemData] = useState<InstrumentItems>(new InstrumentItems);
  const [dropdownOptions, setDropdownOptions] = useState<InstrumentModel[]>(useSuspense(InstrumentResource.getList));

  const handleSave = () => {
    onSave();
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
          width: 400,
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
          <h3 style={{ color: 'black' }}>Confirmation</h3>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 16, textAlign: 'center' }}>
          <div style={{ color: 'red', textAlign: 'left' }}>Are you sure to delete Instrument Item?</div>

          {/* Add similar TextFields for other data */}
          <Button
            variant="contained"
            color="primary"
            size= "small"
            onClick={onClose}
            style={{ marginTop: 20, marginRight: 10 }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            size= "small"
            style={{ marginTop: 20 }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
