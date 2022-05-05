import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from '../../services/api';

interface ModalProps {
  isOpenDelete: boolean;
  OnHandClose: () => void;
  onConfirm: (itemId: number) => void;
  itemId: number;
  itemDeleted?: any;
}

export default function ModalDelete({
  isOpenDelete,
  OnHandClose,
  itemId,
  onConfirm,
}: ModalProps) {
  function confirmDelete() {
    onConfirm(itemId || 0);
  }

  return (
    <div>
      <Dialog
        open={isOpenDelete}
        onClose={OnHandClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Exclusão de Produto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que desaja excluir ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={OnHandClose}>Cancelar</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => confirmDelete()}
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
