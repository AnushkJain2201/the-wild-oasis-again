import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Sttings from "../pages/Settings";
import Account from "../pages/Account";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import GlobalStyles from "../styles/GlobalStyles";
import AppLayout from "../ui/AppLayout";

const App = () => {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route
							index
							element={<Navigate replace to='dashboard' />}
						/>
						<Route path='dashboard' element={<Dashboard />} />
						<Route path='bookings' element={<Cabins />} />
						<Route path='users' element={<Users />} />
						<Route path='settings' element={<Sttings />} />
						<Route path='account' element={<Account />} />
					</Route>

					<Route path='login' element={<Login />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
