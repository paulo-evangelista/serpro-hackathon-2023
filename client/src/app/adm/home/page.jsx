"use client";
import React from 'react';
import { useForm } from 'react-hook-form';

const AdmHome = () => {
    const { register, handleSubmit } = useForm();

    const grantPermission = (data) => {
        // Lógica para conceder permissão à corretora
    }

    const issueTitle = (data) => {
        // Lógica para emitir um título
    }

    const settleInvestors = () => {
        // Lógica para liquidar no vencimento
    }

    const investorData = [
        {
            nome: 'Investidor 1',
            enderecoContrato: 'Endereço 1',
            rentabilidade: '10%',
            vencimento: '01/01/2023',
            dataEmissao: '01/12/2022',
            quantidade: 100
        },
        {
            nome: 'Investidor 2',
            enderecoContrato: 'Endereço 2',
            rentabilidade: '13%',
            vencimento: '01/01/2023',
            dataEmissao: '01/12/2022',
            quantidade: 230
        },
        {
            nome: 'Investidor 3',
            enderecoContrato: 'Endereço 3',
            rentabilidade: '11%',
            vencimento: '01/01/2023',
            dataEmissao: '01/12/2022',
            quantidade: 3500
        },
        {
            nome: 'Investidor 4',
            enderecoContrato: 'Endereço 4',
            rentabilidade: '9%',
            vencimento: '01/01/2023',
            dataEmissao: '01/12/2022',
            quantidade: 2000
        },
    ];

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Secretaria do Tesouro Nacional</h1>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Conceder Permissão à Corretora</h2>
                <form onSubmit={handleSubmit(grantPermission)}>
                    <input
                        type="text"
                        {...register("corretoraInput")}
                        placeholder="Insira o nome da corretora"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <input
                        type="text"
                        {...register("corretoraInput")}
                        placeholder="Insira a wallet da corretora"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Conceder Permissão
                    </button>
                </form>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Emitir um Título</h2>
                <form onSubmit={handleSubmit(issueTitle)}>
                    <input
                        type="text"
                        {...register("titleName")}
                        placeholder="Nome do Título"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <input
                        type="text"
                        {...register("titleName")}
                        placeholder="Símbolo"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <input
                        type="text"
                        {...register("titleName")}
                        placeholder="Rentabilidade"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <input
                        type="text"
                        {...register("titleName")}
                        placeholder="Vencimento"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Emitir Título
                    </button>
                </form>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Notificar Investidores</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Nome</th>
                            <th className="border border-gray-300 px-4 py-2">Endereço do contrato</th>
                            <th className="border border-gray-300 px-4 py-2">Rentabilidade</th>
                            <th className="border border-gray-300 px-4 py-2">Vencimento</th>
                            <th className="border border-gray-300 px-4 py-2">Data de Emissão</th>
                            <th className="border border-gray-300 px-4 py-2">Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {investorData.map((investor, index) => (
                            <tr key={index} className="bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{investor.nome}</td>
                                <td className="border border-gray-300 px-4 py-2">{investor.enderecoContrato}</td>
                                <td className="border border-gray-300 px-4 py-2">{investor.rentabilidade}</td>
                                <td className="border border-gray-300 px-4 py-2">{investor.vencimento}</td>
                                <td className="border border-gray-300 px-4 py-2">{investor.dataEmissao}</td>
                                <td className="border border-gray-300 px-4 py-2">{investor.quantidade}</td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
            </div>

            <div>
                <form onSubmit={handleSubmit(grantPermission)}>
                    <input
                        type="text"
                        {...register("corretoraInput")}
                        placeholder="Endereço do contrato"
                        className="border border-gray-300 rounded-md px-4 py-2 mb-2 mr-5"
                    />
                    <button onClick={settleInvestors} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Liquidar no Vencimento
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdmHome;