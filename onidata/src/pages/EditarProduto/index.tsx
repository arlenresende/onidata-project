import React, { useState, useCallback, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Sidebar from '../../components/sidebar';
import { Input } from '../../components/form/input';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Stack, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

// form
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';

type ProductProps = {
  nome: string;
  avatar: string;
  preco: string;
  qt_estoque: number;
  qt_vendas: number;
  marca: string;
};

const createUserFormSchema = yup.object().shape({});

const ItemForm = styled(Paper)(({ theme }) => ({
  backgroundColor: 'none',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

const SendButton = styled(Button)({
  background: 'primary',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 45,
  fontSize: 15,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 15,
});

export default function EditarProduto() {
  const [alert, setAlert] = useState(false);

  const [dataProduto, setDataProduto] = useState<ProductProps>();
  const [mount, setMount] = useState(false);

  const { id } = useParams();

  const loadProduct = useCallback(async () => {
    try {
      const response = await api.get(`produto/${id}`);

      setDataProduto(response.data);
    } catch (e) {
      throw e;
    }
  }, []);

  const initiateData = useCallback(async () => {
    await loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    if (!mount) {
      initiateData();
      setMount(true);
    }
  }, [initiateData, mount]);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  console.log(dataProduto);

  const handleSubmitForm: SubmitHandler<any> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    api.post(`produto`).then((response) => {
      if (response.status !== 400 || response.data.sucesso == false) {
        setAlert(true);

        return;
      }
    });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {alert && (
                  <Box mt={2}>
                    <Alert severity="success">
                      Produto Editado com sucesso
                    </Alert>
                  </Box>
                )}
                <Stack direction="row" spacing={2} my={3}>
                  <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                  >
                    Editar Produto
                  </Typography>
                </Stack>
                <Box
                  component="form"
                  onSubmit={handleSubmit(handleSubmitForm)}
                  mt={4}
                  px={8}
                >
                  <Stack
                    ml={2}
                    direction="row"
                    spacing={3}
                    justifyContent="left"
                    mb={3}
                  >
                    <Avatar alt="Remy Sharp" src={dataProduto?.avatar} />
                  </Stack>
                  <Stack direction="row" spacing={3} justifyContent="left">
                    <ItemForm>
                      <Input
                        label="Nome "
                        variant="outlined"
                        {...register('nome')}
                        color="primary"
                        defaultValue={dataProduto?.nome}
                        placeholder={dataProduto?.nome}
                        focused
                      />
                    </ItemForm>
                    <ItemForm>
                      {' '}
                      <Input
                        label="Imagem "
                        variant="outlined"
                        {...register('avatar')}
                        color="primary"
                        type="file"
                        defaultValue={dataProduto?.avatar}
                        placeholder={dataProduto?.avatar}
                        focused
                      />
                    </ItemForm>
                    <ItemForm>
                      <Input
                        label="Preço "
                        variant="outlined"
                        {...register('preco')}
                        color="primary"
                        defaultValue={dataProduto?.preco}
                        placeholder={dataProduto?.preco}
                        focused
                      />
                    </ItemForm>
                  </Stack>
                  <Stack direction="row" spacing={3} justifyContent="left">
                    <ItemForm>
                      <Input
                        label="QTD. Estoque "
                        variant="outlined"
                        {...register('qt_estoque')}
                        color="primary"
                        type="number"
                        defaultValue={dataProduto?.qt_estoque}
                        placeholder={`${dataProduto?.qt_estoque}`}
                        focused
                      />
                    </ItemForm>
                    <ItemForm>
                      <Input
                        label="QTD. Vendas "
                        variant="outlined"
                        {...register('qt_vendas')}
                        color="primary"
                        defaultValue={dataProduto?.qt_vendas}
                        placeholder={`${dataProduto?.qt_vendas}`}
                        focused
                      />
                    </ItemForm>
                    <ItemForm>
                      <Input
                        label="Marca"
                        variant="outlined"
                        {...register('marca')}
                        color="primary"
                        defaultValue={dataProduto?.marca}
                        placeholder={dataProduto?.marca}
                        focused
                      />
                    </ItemForm>
                  </Stack>
                  <SendButton
                    variant="contained"
                    disableElevation
                    type="submit"
                    color="primary"
                  >
                    FAZER EDIÇÃO
                  </SendButton>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
