import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    js.configs.recommended,
    eslintConfigPrettier,

    {
        languageOptions: {
            globals: {
                process: 'readonly',  
                __dirname: 'readonly',  
                module: 'readonly',
                require: 'readonly'
            },
            ecmaVersion: 2021  
        },
        rules: {
            'no-unused-vars': 'warn',
            eqeqeq: ['error', 'always'],
            'no-console': 'error',
            quotes: ['error', 'single', { allowTemplateLiterals: true }]
        }
    }
]
