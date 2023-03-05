import '@/styles/bootstrap.min.css';
import {SWRConfig} from 'swr';
import Layout from '@/pages/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <SWRConfig value={{
        fetcher:
          async url => {
            const res = await fetch(url)
             
              // If the status code is not in the range 200-299,
             // we still try to parse and throw it.
            if (!res.ok) {
              // Attach extra info to the error object.
              const error = new Error('An error occurred while fetching the data.')
              error.info = await res.json()
              error.status = res.status
              throw error
            }
            return res.json()
          }
      }}>    
        <Component {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}