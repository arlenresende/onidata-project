import React, { useCallback, useState, useEffect } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import api from '../../services/api';
import { Alert, Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ModalDelete from '../modalDelete';
import { setTimeout } from 'timers/promises';

type ProductPros = {
  createdAt: string;
  nome: string;
  avatar: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
  marca: string;
  id: string;
};

export default function Products() {
  const [dataProdutos, setDataProdutos] = useState<ProductPros[]>([]);
  const [mount, setMount] = useState(false);
  const [modalDataRemove, setModalRemove] = useState<any>();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loadProducts = useCallback(async () => {
    try {
      const response = await api.get('produto');

      const formatedProductsDate = response.data.map((result: any) => {
        return {
          ...result,
          createdAt: format(new Date(result.createdAt), 'dd-MM-yyyy HH:mm:ss', {
            locale: ptBR,
          }),
        };
      });

      setDataProdutos(formatedProductsDate);
    } catch (e) {
      throw e;
    }
  }, []);

  const initiateData = useCallback(async () => {
    await loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!mount) {
      initiateData();
      setMount(true);
    }
  }, [initiateData, mount]);

  const modalOpenRemove = (mData: any) => {
    setModalRemove(mData);
    handleClickOpen();
  };

  const onDelete = (id = 0) => {
    console.log(id);
    setAlert(true);
    handleClose();

    return;
  };

  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Data Criação', width: 150 },
    {
      field: 'nome',
      headerName: 'Nome',
      width: 150,
    },
    {
      field: 'avatar',
      headerName: 'Imagem',
      width: 100,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 110,
    },
    {
      field: 'qt_estoque',
      headerName: 'Estoque',
      width: 110,
    },
    {
      field: 'qt_vendas',
      headerName: 'Vendas',
      width: 110,
    },
    {
      field: 'marca',
      headerName: 'Marca',
      width: 180,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          <Button
            color="warning"
            variant="contained"
            onClick={() => navigate(`/editar-produto/${params.id}`)}
          >
            Editar
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => modalOpenRemove(params.id)}
          >
            Excluir
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <React.Fragment>
      {alert && (
        <Box my={2}>
          <Alert severity="success">Produto Deletado com sucesso</Alert>
        </Box>
      )}
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Produtos
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dataProdutos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <ModalDelete
        onConfirm={onDelete}
        isOpenDelete={open}
        OnHandClose={handleClose}
        itemId={modalDataRemove}
      />
    </React.Fragment>
  );
}
