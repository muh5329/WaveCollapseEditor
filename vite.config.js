import react from '@vitejs/plugin-react'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    plugins:
    [
        react()
    ],
    root: 'src/',
    publicDir: "../public/",
    base: './',
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    loaders: [
        { 
           json: /\.json$/, 
           loader: 'json-loader' 
        }
    ]
}