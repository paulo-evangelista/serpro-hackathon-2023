import { ChildProcess } from 'child_process';
import { spawn } from 'child_process';
export const calculateCompoundInterest = (beginTimestamp: number, endTimestamp: number, amount: number, monthRate: number) => {
    const data1: any = new Date(beginTimestamp * 1000);
    const data2: any = new Date(endTimestamp * 1000);

    const diferencaMs = data2 - data1;

    const diferencaDias = diferencaMs / (1000 * 60 * 60 * 24);

    const diferencaMeses = diferencaDias / 30.44;

    const interest = amount * Math.pow(1 + monthRate / 100, diferencaMeses);

    return {
        payable: Number(interest.toFixed(2)),
        span: Number(diferencaMeses.toFixed(2)),
        interest: Number((interest - amount).toFixed(2)),
    };
};

export const verifyContract = async (argArr: Array<any>) => {
    try {
        const process = spawn('npx', ['hardhat', 'verify', '--network', 'sepolia', ...argArr, '>', '~/output.txt']);

        process.stdout.on('data', (message) => {
            console.log(`stdout: ${message}`);
        });

        process.stderr.on('data', (error) => {
            console.error(`stderr: ${error}`);
        });

        process.on('close', (code) => {
            if (code !== 0) {
                console.log(`process exited with code ${code}`);
            }
        });

        process.on('error', (error) => {
            console.error(`spawn error: ${error}`);
        });
    } catch (error) {
        console.error(`Error verifying contract: ${error}`);
    }
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
