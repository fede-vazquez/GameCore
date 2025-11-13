import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { GlobalContextProvider } from './context/globalContext.tsx'
import { LibraryContextProvider, MenuContextProvider } from './context/index.ts'
import { CREATE_ZOD_CONFIG } from './errors/errors.ts'
import './index.css'
import { queryClient } from './services/apiCall'

CREATE_ZOD_CONFIG()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<GlobalContextProvider>
				<Theme>
					{/* <ThemePanel /> */}
					<MenuContextProvider>
						<LibraryContextProvider>
							<App />
						</LibraryContextProvider>
					</MenuContextProvider>
				</Theme>
			</GlobalContextProvider>
		</QueryClientProvider>
	</StrictMode>
)
