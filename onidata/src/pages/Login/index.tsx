import React, { useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Components
import { Input } from '../../components/form/input';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

// Estilos
import { BoxLogin, BoxText, Container } from './styles';

// form
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { useLogin } from '../../context/loginContext';

type LoginUserFormData = {
  email?: string;
  password?: string;
};

const createUserFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatório').email('E-mail Inválido'),
  password: yup.string().required('Senha Obrigatória'),
});

export function Login() {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { onSuccess } = useLogin();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const { errors } = formState;

  const handleSubmitForm: SubmitHandler<LoginUserFormData> = async (values) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      await api.get(`user?senha=${values.password}`);
      onSuccess(true);
      navigate('/dashboard');
    } catch (err) {
      setAlert(true);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="left">
        <BoxLogin>
          <Typography variant="h1" component="div" gutterBottom mt={2}>
            Faça seu Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
            <Box mt={3}>
              <Input
                label="Email "
                variant="outlined"
                {...register('email')}
                error={errors.email && true}
                errorString={errors.email}
                color="primary"
                focused
              />
            </Box>
            <Box mt={3}>
              <Input
                label="Senha"
                variant="outlined"
                {...register('password')}
                error={errors.password && true}
                errorString={errors.password}
                color="primary"
                type="password"
              />
            </Box>

            {!loading ? (
              <Button
                variant="contained"
                disableElevation
                type="submit"
                color="primary"
                size="medium"
              >
                LOGIN
              </Button>
            ) : (
              <LoadingButton
                loading
                variant="contained"
                color="primary"
                size="medium"
              >
                Submit
              </LoadingButton>
            )}

            {alert && (
              <Box mt={2}>
                <Alert variant="filled" severity="error">
                  Dados Incorretos
                </Alert>
              </Box>
            )}
          </Box>
        </BoxLogin>
      </div>
      <div className="right">
        <BoxText>
          <Typography variant="h2" mt={8} color="#ffffff" textAlign="center">
            Seja bem vindo
          </Typography>
          <Typography
            component="p"
            mt={2}
            color="#ffffff"
            variant="h6"
            textAlign="center"
          >
            Faça seu cadastro e começe a acessar <br />
            nossos produtos agora mesmo!
          </Typography>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            size="medium"
            component={RouterLink}
            color="secondary"
            to="/cadastro"
          >
            CRIAR UMA CONTA
          </Button>
        </BoxText>
      </div>
    </Container>
  );
}
