import React from 'react';
import { Navbar } from '../components/Navbar';

const Contact = () => {
    return (
        <div>
            <Navbar/>
            <div className="pt-40">
                <h1 className="flex justify-center text-4xl font-bold mb-8 pb-16">Contato</h1>
                <div className="flex justify-center space-x-32">
                    <div className="flex flex-col items-center">
                        <a href="https://www.linkedin.com/in/marcelofeitoza7/" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
                            <img src="https://avatars.githubusercontent.com/u/71825192?v=4" width="150px" alt="Marcelo Feitoza profile image" className="rounded-full mb-2 mb-16 transition duration-300 transform hover:scale-110"/>
                            <sub className="font-bold text-lg pt-12">Marcelo Gomes Feitoza</sub>
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <a href="https://www.linkedin.com/in/victor-severiano-de-carvalho-b57a05237" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
                            <img src="https://github.com/paulo-evangelista.png" width="150px" alt="Paulo Evangelista profile image" className="rounded-full mb-2 transition duration-300 transform hover:scale-110"/>
                            <sub className="font-bold text-lg pt-12">Paulo Presa Evangelista</sub>
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        <a href="https://www.linkedin.com/in/victor-severiano-de-carvalho-b57a05237" target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center">
                            <img src="https://github.com/vict0rcarvalh0.png" width="150px" alt="Victor Carvalho profile image" className="rounded-full mb-2 transition duration-300 transform hover:scale-110"/>
                            <sub className="font-bold text-lg pt-12">Victor Severiano de Carvalho</sub>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;