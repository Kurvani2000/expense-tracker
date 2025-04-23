import { ExpenseProvider } from '../context/expenseContext';
import Layout from '../components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ExpenseProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ExpenseProvider>
  );
}

export default MyApp;