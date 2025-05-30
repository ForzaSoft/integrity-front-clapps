'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import AppleIcon from '@/icons/AppleIcon';
import BuscarIcon from '@/icons/BuscarIcon';
import FacebookIcon from '@/icons/FacebookIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import styles from './style.module.css';

interface Inputs {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.rightPanel}>
        <Image className={styles.logo} src="/logo.png" width={228} height={64} alt="logo" />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.login}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Usuario o mail</label>
            <Input
              variantSize="lg"
              {...register('username', {
                required: 'required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Debe ingresar un email válido.',
                },
              })}
            />
            {/* errors will return when field validation fails  */}
            {errors.username && <p>{errors.username.message?.toString()}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Contraseña</label>
            <Input variantSize="lg" type="password" {...register('password', { required: true })} />
            {errors.password && <p>Debe ingresar una contraseña.</p>}
          </div>
          <Button type="submit" icon={BuscarIcon} shape="round" size="lg" className={styles.fullWidth}>
            Iniciar Sesión
          </Button>
        </form>
        <div className={styles.separator}>
          <div className={styles.line} />
          <span>o iniciar sesión con</span>
          <div className={styles.line} />
        </div>
        <div className={styles.socialLogin}>
          <Button icon={GoogleIcon} variant="outline" shape="round" size="lg" className={styles.fullWidth}>
            Continuar con Google
          </Button>
          <Button icon={FacebookIcon} variant="outline" shape="round" size="lg" className={styles.fullWidth}>
            Continuar con Facebook
          </Button>
          <Button icon={AppleIcon} variant="outline" shape="round" size="lg" className={styles.fullWidth}>
            Continuar con Apple
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
