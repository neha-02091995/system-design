// This is a React Quiz from BFE.dev 

import * as React from 'react'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/App'


const root = createRoot(document.getElementById('root'));
root.render(<App/>)