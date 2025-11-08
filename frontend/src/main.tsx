import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { GlobalContextProvider } from './context/globalContext.tsx'
import './index.css'
import { queryClient } from './services/apiCall'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<GlobalContextProvider>
				<Theme>
					{/* <ThemePanel /> */}
					<App />
				</Theme>
			</GlobalContextProvider>
		</QueryClientProvider>
	</StrictMode>
)
