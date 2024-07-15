import { useState } from 'react';
import {
  IconMapPinQuestion,
  IconDeviceNintendo,
  IconSourceCode,
  IconSettings,
  IconUserStar,
  IconHeartRateMonitor,
  IconBuildingFactory,
  IconLogout,
  IconDashboard,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import { Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';

export function Navbar() {
  const [active, setActive] = useState('Dashboard');

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Link to="/" className={classes.link} style={{ textDecoration: 'none' }}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Dashboard"
            leftSection={<IconDashboard className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>

        <Link to="/" className={classes.link} style={{ textDecoration: 'none' }}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Inspection"
            leftSection={<IconMapPinQuestion className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>

        <Link to="/maintenance" className={classes.link} style={{ textDecoration: 'none' }}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Maintenance"
            leftSection={<IconDeviceNintendo className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>

        <Link to="/resources" className={classes.link} style={{ textDecoration: 'none' }}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Resource"
            leftSection={<IconSourceCode className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>

        <Link to="/powerplant" className={classes.link} style={{ textDecoration: 'none' }}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Power Plant"
            leftSection={<IconBuildingFactory className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>

        <Link to="/units" className={classes.link}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Units"
            leftSection={<IconHeartRateMonitor className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>

        <Link to="/" className={classes.link} style={{ textDecoration: 'none' }}> {/* Apply class for consistent styling */}
          <NavLink
            href="#required-for-focus"
            label="Staff"
            leftSection={<IconUserStar className={classes.linkIcon} size={18} />} // Adjust size as needed
          />
        </Link>
      </div>

      <div className={classes.footer}>
        <a href="src\pages\Settings.tsx" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSettings className={classes.linkIcon} stroke={1.5} size={18} /> {/* Adjust size as needed */}
          <span className={classes.linkText}>Settings</span> {/* Apply class for consistent styling */}
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} size={18} /> {/* Adjust size as needed */}
          <span className={classes.linkText}>Logout</span> {/* Apply class for consistent styling */}
        </a>
      </div>
    </nav>
  );
}
