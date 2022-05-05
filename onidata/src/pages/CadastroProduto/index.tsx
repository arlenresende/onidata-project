import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import Sidebar from '../../components/sidebar';
import { Input } from '../../components/form/input';

import Box from '@mui/material/Box';
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

type ProductPros = {
  nome?: string;
  avatar?: string;
  preco?: string;
  qt_estoque?: number;
  qt_vendas?: number;
  marca?: string;
};

const createUserFormSchema = yup.object().shape({
  nome: yup.string().required('Nome Obrigatório'),
  avatar: yup
    .mixed()
    .test('required', 'Imagem Obrigatória', (value) => value.length > 0)
    .test('fileSize', 'File Size is too large', (value) => {
      return value.length && value[0].size <= 5242880;
    })
    .test('fileType', 'Unsupported File Format', (value) => {
      return (
        value.length &&
        ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
      );
    }),

  preco: yup.string().required('Preço Obrigatório'),
  qt_estoque: yup.string().required('Campo Obrigatório '),
  qt_vendas: yup.string().required('Campo Obrigatório '),
  marca: yup.string().required('Campo Obrigatório'),
});

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

export default function CadastroProduto() {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  console.log(errors);

  const handleSubmitForm: SubmitHandler<ProductPros> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
    api.post(`produto`).then((response) => {
      if (response.status !== 400 || response.data.sucesso == false) {
        setAlert(true);
        setLoading(false);
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
                      Cadastro Realizado com sucesso
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
                    Cadastrar novo produto
                  </Typography>
                </Stack>
                <Box
                  component="form"
                  onSubmit={handleSubmit(handleSubmitForm)}
                  mt={4}
                  px={8}
                >
                  <Stack direction="row" spacing={2}>
                    <ItemForm>
                      {' '}
                      <Input
                        label="Imagem "
                        variant="outlined"
                        {...register('avatar')}
                        error={errors.avatar && true}
                        errorString={errors.avatar}
                        color="primary"
                        type="file"
                        focused
                      />
                    </ItemForm>
                  </Stack>
                  <Stack direction="row" spacing={3} justifyContent="left">
                    <ItemForm>
                      <Input
                        label="Nome "
                        variant="outlined"
                        {...register('nome')}
                        error={errors.nome && true}
                        errorString={errors.nome}
                        color="primary"
                        focused
                      />
                    </ItemForm>

                    <ItemForm>
                      <Input
                        label="Preço "
                        variant="outlined"
                        {...register('preco')}
                        error={errors.preco && true}
                        errorString={errors.preco}
                        color="primary"
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
                        error={errors.qt_estoque && true}
                        errorString={errors.qt_estoque}
                        color="primary"
                        focused
                      />
                    </ItemForm>
                    <ItemForm>
                      <Input
                        label="QTD. Vendas "
                        variant="outlined"
                        {...register('qt_vendas')}
                        error={errors.qt_vendas && true}
                        errorString={errors.qt_vendas}
                        color="primary"
                        type="number"
                        focused
                      />
                    </ItemForm>
                    <ItemForm>
                      <Input
                        label="Marca"
                        variant="outlined"
                        {...register('marca')}
                        error={errors.marca && true}
                        errorString={errors.marca}
                        color="primary"
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
                    FAZER CADASTRO
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
