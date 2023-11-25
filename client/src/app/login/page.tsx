"use client";
import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1">
        <div className="container max-w-md mx-auto flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login no Tesouro Direto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input 
                type="text" 
                className={`block border border-grey-light w-full p-3 rounded mb-4 ${errors.cpf && 'border-red-500'}`}
                placeholder="Digite o seu CPF ou do menor" 
                {...register('cpf', { required: true })}
              />
              {errors.cpf && <p className="text-red-500 text-xs italic">Por favor, insira o CPF.</p>}
              
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
              >Continuar</button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              <a href="/" className="no-underline border-b border-blue text-blue">
                Retornar ao site
              </a>
            </div>
            <div className="mt-4">
              <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-dark focus:outline-none my-1"
                >Entrar com Gov</button>
            </div>
            <div className="text-center text-sm text-grey-dark mt-4">
              <a className="no-underline border-b border-blue text-blue" href="https://www.tesourodireto.com.br/conheca/termos-de-uso-e-protecao-de-dados.htm?_gl=1*si8do3*_ga*MjA4ODU0NTI2MC4xNzAwNDE1ODMy*_ga_95FH8RQ7M0*MTcwMDk0MjQyMS4xOC4xLjE3MDA5NDI0MjQuNTcuMC4w#termos-de-uso">
                Termos de Uso e Proteção de Dados
              </a>
            </div>
          </div>

          <div className="text-grey-dark mt-6">
            Ainda não tem uma conta? 
            <a className="no-underline border-b border-blue text-blue" href="/">
              Registre-se
            </a>.
          </div>
        </div>
        <div>
          <p className="text-center text-gray-500 text-xs">
            &copy;2021 Tesouro Direto. Todos os direitos reservados.
          </p>
        </div>
      </div>
      <div className="flex-1">
      <div className="container max-w-md mx-auto flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Quero abrir uma conta</h1>
            <div className="mt-4">
              <button
                  className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-dark focus:outline-none my-1"
                >Para  você</button>
            </div>
            <div className="mt-4">
              <button
                  className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-dark focus:outline-none my-1"
                >Para o menor de idade</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;