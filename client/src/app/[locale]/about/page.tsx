import React from 'react';
import { Navbar } from '../components/Navbar';

const About = () => {
    return (
        <div>
            <Navbar/>
            <div className="flex flex-1 flex-col px-4 md:px-0">
				<div className="relative mt-16">
					<div className="w-full h-80 overflow-hidden">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="https://www.tesourodireto.com.br/data/files/90/75/ED/FB/63D4D710C0F1C0D7894D49A8/banner-acessibilidade-conheca.png"
							alt="Imagem de fundo"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute inset-0 flex items-center justify-start px-32">
						<div className="flex flex-col">
							<h1 className="text-white text-6xl font-bold mb-2">
                                O seu dinheiro rendendo
							</h1>
                            <h1 className="text-white text-6xl font-bold mb-2">
                                com segurança!
							</h1>
						</div>
					</div>
				</div>
			</div>
            <div className="flex flex-1 flex-col md:flex-row px-4 md:px-0">
                <div className="md:w-1/3 flex items-center justify-center">
                    <h1 className="mr-8 text-gray-500 text-3xl">O QUE É?</h1>
                </div>
                <div className="md:w-2/3">
                    <div className="md:pl-8 pr-32 pt-16">
                        <h1 className="mb-4 text-xl text-gray-600">
                            O Tesouro Direto é um Programa do Tesouro Nacional desenvolvido em parceria com a B3 para venda de títulos públicos federais para pessoas físicas, de forma <b>100% online.</b>
                        </h1>
                        <h1 className="mb-4 text-xl text-gray-600">
                            Lançado em 2002, o Programa surgiu com o objetivo de democratizar o acesso aos títulos públicos, permitindo aplicações a partir de <b>R$ 30,00.</b>
                        </h1>
                        <h1 className="mb-4 text-xl text-gray-600">
                            O Tesouro Direto é uma excelente alternativa de investimento pois oferece títulos com diferentes tipos de rentabilidade (prefixada, ligada à variação da inflação ou à variação da taxa de juros básica da economia - Selic), diferentes prazos de vencimento e também diferentes fluxos de remuneração. Com tantas opções, fica fácil achar o título indicado para realizar seus objetivos!
                        </h1>
                        <h1 className="mb-4 text-xl text-gray-600">
                            Além de acessível e de apresentar muitas opções de investimento, o Tesouro Direto oferece boa <b>rentabilidade e liquidez diária</b>, mesmo sendo a aplicação de menor risco do mercado.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;