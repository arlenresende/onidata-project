import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Input } from '../../components/form/input';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';

// form
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { Select } from '../../components/form/select';
import axios from 'axios';

// Estilos
import { Content } from './styles';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';

// Plugins

import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type LoginUserFormData = {
  email?: string;
  password?: string;
  nome?: string;
  cpf?: string;
  confirmpassword?: string;
};

const createUserFormSchema = yup.object().shape({
  nome: yup.string().required('Nome Obrigatório'),
  sobrenome: yup.string().required('Sobrenome Obrigatório'),
  email: yup.string().required('E-mail Obrigatório').email('E-mail Inválido'),
  cpf: yup.string().required('CPF Obrigatório'),
  password: yup.string().required('Senha Obrigatória'),
  confirmpassword: yup
    .string()
    .oneOf([null, yup.ref('password')], ' As senhas precisam ser iguais'),
  sexo: yup.string().required('Campo Sexo Obrigatório'),
  datanascimento: yup.string().required('Data de Nascimento Obrigatório'),
  cep: yup.string().required('CEP Obrigatório'),
  cidade: yup.string().required('Cidade Obrigatório'),
  uf: yup.string().required('Estado Obrigatório'),
  logradouro: yup.string().required('Logradouro Obrigatório'),
  bairro: yup.string().required('Bairro Obrigatório'),
  complemento: yup.string().required('Complemento Obrigatório'),
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,

  [theme.breakpoints.down('md')]: {},
}));

const ItemForm = styled(Paper)(({ theme }) => ({
  backgroundColor: 'none',
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

const useStyles = makeStyles({
  root: {
    height: '52px',
    borderLeft: 'outset',
  },
});

const SendButton = styled(Button)({
  background: 'primary',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 52,
  fontSize: 18,
  marginTop: 5,
  marginBottom: 5,
});

export default function Cadastro() {
  const [valueDataCep, setValueDataCep] = useState('');
  const [valueCep, setValueCep] = useState('');

  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, setValue, control } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;
  const classes = useStyles();

  function handleCep() {
    if (valueCep.length >= 8) {
      axios
        .get(
          `https://viacep.com.br/ws/${valueCep.replace(/[^0-9]/g, '')}/json/`
        )
        .then((response) => {
          setValueDataCep(response.data);
          setValue('logradouro', response.data.logradouro);
          setValue('numero', response.data.numero);
          setValue('complemento', response.data.complemento);
          setValue('bairro', response.data.bairro);
          setValue('cidade', response.data.localidade);
          setValue('uf', response.data.uf);
        });
    }
  }

  useEffect(() => {
    handleCep();
  }, []);

  const handleSubmitForm: SubmitHandler<LoginUserFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    api.post(`user`).then((response) => {
      if (response.status !== 400 || response.data.sucesso == false) {
        setAlert(true);
        setLoading(false);
        return;
      }
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }} mt={4}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={10} lg={8} md={10}>
          <Content>
            <Item>
              {alert && (
                <Box mt={2}>
                  <Alert severity="success">
                    Cadastro Realizado com sucesso
                  </Alert>
                </Box>
              )}
              <Typography variant="h4" component="div" gutterBottom mt={2}>
                Cadastre-se
              </Typography>
              <Typography component="p" mt={2} variant="h6" textAlign="center">
                Faça seu cadastro e começe a acessar <br />
                nossos produtos agora mesmo!
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(handleSubmitForm)}
                mt={4}
                px={8}
              >
                <Stack
                  direction={['column', 'column', 'row']}
                  spacing={3}
                  justifyContent="left"
                >
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
                      label="Sobrenome "
                      variant="outlined"
                      {...register('sobrenome')}
                      error={errors.sobrenome && true}
                      errorString={errors.sobrenome}
                      color="primary"
                      focused
                    />
                  </ItemForm>
                  <ItemForm>
                    {' '}
                    <Input
                      label="Email "
                      variant="outlined"
                      {...register('email')}
                      error={errors.email && true}
                      errorString={errors.email}
                      color="primary"
                      focused
                    />
                  </ItemForm>
                </Stack>
                <Stack
                  direction={['column', 'column', 'row']}
                  spacing={3}
                  justifyContent="left"
                >
                  <ItemForm>
                    <Input
                      label="Cpf "
                      variant="outlined"
                      {...register('cpf')}
                      error={errors.cpf && true}
                      errorString={errors.cpf}
                      color="primary"
                      focused
                      mask="999.999.999-99"
                    />
                  </ItemForm>
                  <ItemForm>
                    <Input
                      label="Senha "
                      variant="outlined"
                      {...register('password')}
                      error={errors.password && true}
                      errorString={errors.password}
                      color="primary"
                      type="password"
                      focused
                    />
                  </ItemForm>
                  <ItemForm>
                    {' '}
                    <Input
                      label="Confirmar Senha"
                      variant="outlined"
                      {...register('confirmpassword')}
                      error={errors.confirmpassword && true}
                      errorString={errors.confirmpassword}
                      color="primary"
                      type="password"
                      focused
                    />
                  </ItemForm>
                </Stack>
                <Stack
                  direction={['column', 'column', 'row']}
                  spacing={3}
                  justifyContent="left"
                >
                  <ItemForm>
                    <Select
                      labelId="Sexo"
                      label="Sexo"
                      error={errors.sexo && true}
                      errorString={errors.sexo}
                      color="primary"
                      variant="outlined"
                      autoWidth={true}
                      {...register('sexo')}
                    >
                      <MenuItem value={1}>Masculino</MenuItem>
                      <MenuItem value={2}>Feminino</MenuItem>
                    </Select>
                  </ItemForm>
                  <ItemForm>
                    <Input
                      label="Data de Nascimento "
                      variant="outlined"
                      {...register('datanascimento')}
                      error={errors.datanascimento && true}
                      errorString={errors.datanascimento}
                      color="primary"
                      focused
                      type="date"
                    />
                  </ItemForm>
                  <ItemForm>
                    <Box sx={{ display: 'flex' }} maxWidth="200px">
                      <Box width="70%">
                        <Input
                          label="Cep "
                          variant="outlined"
                          {...register('cep')}
                          error={errors.cep && true}
                          errorString={errors.cep}
                          color="primary"
                          focused
                          mask="99.999-999"
                          onChange={(e) => setValueCep(e.target.value)}
                        />
                      </Box>
                      <Box width="30%">
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.root}
                          onClick={() => handleCep()}
                        >
                          OK
                        </Button>
                      </Box>
                    </Box>
                  </ItemForm>
                </Stack>
                <Stack
                  direction={['column', 'column', 'row']}
                  spacing={3}
                  justifyContent="left"
                >
                  <ItemForm>
                    <Input
                      label="Cidade "
                      variant="outlined"
                      {...register('cidade')}
                      error={errors.cidade && true}
                      errorString={errors.cidade}
                      color="primary"
                      focused
                    />
                  </ItemForm>
                  <ItemForm>
                    <Input
                      label="Estado "
                      variant="outlined"
                      {...register('uf')}
                      error={errors.uf && true}
                      errorString={errors.uf}
                      color="primary"
                      focused
                    />
                  </ItemForm>
                  <ItemForm>
                    <Input
                      label="Logradouro"
                      variant="outlined"
                      {...register('logradouro')}
                      error={errors.logradouro && true}
                      errorString={errors.logradouro}
                      color="primary"
                      focused
                    />
                  </ItemForm>
                </Stack>
                <Stack
                  direction={['column', 'column', 'row']}
                  spacing={3}
                  justifyContent="left"
                >
                  <ItemForm>
                    <Input
                      label="Bairro "
                      variant="outlined"
                      {...register('bairro')}
                      error={errors.bairro && true}
                      errorString={errors.bairro}
                      color="primary"
                      focused
                    />
                  </ItemForm>
                  <ItemForm>
                    <Input
                      label="Complemento "
                      variant="outlined"
                      {...register('complemento')}
                      error={errors.complemento && true}
                      errorString={errors.complemento}
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
                  size="medium"
                  fullWidth
                >
                  FAZER CADASTRO
                </SendButton>
              </Box>
            </Item>
          </Content>
        </Grid>
      </Grid>
    </Box>
  );
}
