import { NavLink } from "react-router-dom";
import * as config from '../config';

export const Nav = () => {
	return <nav>
		<ul className="flex gap-4 bg-slate-500 px-4 py-2 content">
			{config.environment === 'development' && (
			<li><NavLink to="/simple-form">Simple Form</NavLink></li>
			)}
			<li><NavLink to="/employees">Employees</NavLink></li>
			<li><NavLink to="/about">About</NavLink></li>
		</ul>
	</nav>;
};
