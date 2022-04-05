import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        verbose: true,
        clearMocks: true,
        resetMocks: true,
        maxWorkers: 1,
        preset: 'ts-jest',
        testEnvironment: 'node',
        moduleDirectories: [
            'node_modules/',
        ],
        moduleFileExtensions: [
            'js',
            'ts',
            'json'
        ],
        testMatch: [
            '**/tests/**/*.+(ts)',
            '**/?(*.)+(test).+(ts)'
        ],
        transform: {
            '^.+\\.(ts)$': 'ts-jest',
        },
        globals: {
            'ts-jest': {
                diagnostics: true,
                tsconfig: './tsconfig.json',
            },
        },
    };
};