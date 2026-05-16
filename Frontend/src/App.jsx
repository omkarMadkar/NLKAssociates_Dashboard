import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import BankCases from './pages/NonLitigation/BankCases';
import TSRGenerator from './pages/NonLitigation/TSRGenerator';
import CaseCreate from './pages/Cases/CaseCreate';
import CaseDetail from './pages/Cases/CaseDetail';
import CaseList from './pages/Cases/CaseList';
import Approvals from './pages/Approvals';
import SearchPage from './pages/SearchPage';
import Reports from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path="/cases/new" element={<CaseCreate />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
          <Route path="/non-litigation/:bank" element={<BankCases />} />
          <Route path="/tsr/:caseId" element={<TSRGenerator />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;